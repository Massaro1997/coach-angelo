import { NextRequest, NextResponse } from "next/server";

const PAYPAL_API = "https://api-m.paypal.com"; // Live mode

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { productName, monthlyPrice, totalCycles, clientName, clientEmail } =
      await request.json();

    const accessToken = await getAccessToken();

    // Step 1: Create a Product (catalog)
    const productRes = await fetch(`${PAYPAL_API}/v1/catalogs/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Request-Id": `product-${Date.now()}`,
      },
      body: JSON.stringify({
        name: productName,
        description: `Coaching-Vertrag: ${productName}`,
        type: "SERVICE",
        category: "EXERCISE_AND_FITNESS",
      }),
    });

    const product = await productRes.json();

    if (!product.id) {
      console.error("PayPal product creation failed:", product);
      return NextResponse.json(
        { error: "Failed to create product", details: product },
        { status: 500 }
      );
    }

    // Step 2: Create a Billing Plan
    const planRes = await fetch(`${PAYPAL_API}/v1/billing/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Request-Id": `plan-${Date.now()}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        name: `${productName} — €${monthlyPrice}/Monat`,
        description: `Monatliche Zahlung für ${productName}`,
        billing_cycles: [
          {
            frequency: { interval_unit: "MONTH", interval_count: 1 },
            tenure_type: "REGULAR",
            sequence: 1,
            total_cycles: totalCycles, // e.g. 12 for 12 months, 0 = infinite
            pricing_scheme: {
              fixed_price: {
                value: monthlyPrice.toString(),
                currency_code: "EUR",
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: true,
          payment_failure_threshold: 2,
          setup_fee: { value: "0", currency_code: "EUR" },
          setup_fee_failure_action: "CONTINUE",
        },
      }),
    });

    const plan = await planRes.json();

    if (!plan.id) {
      console.error("PayPal plan creation failed:", plan);
      return NextResponse.json(
        { error: "Failed to create plan", details: plan },
        { status: 500 }
      );
    }

    // Step 3: Create a Subscription
    const subRes = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Request-Id": `sub-${Date.now()}`,
      },
      body: JSON.stringify({
        plan_id: plan.id,
        subscriber: {
          name: { given_name: clientName.split(" ")[0] || clientName, surname: clientName.split(" ").slice(1).join(" ") || "" },
          email_address: clientEmail || undefined,
        },
        application_context: {
          brand_name: "Coach Angelo",
          locale: "de-DE",
          user_action: "SUBSCRIBE_NOW",
          payment_method: {
            payer_selected: "PAYPAL",
            payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
          },
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://coachangelo.com"}/checkout/success?type=subscription`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://coachangelo.com"}/servizi`,
        },
      }),
    });

    const subscription = await subRes.json();

    if (!subscription.id) {
      console.error("PayPal subscription creation failed:", subscription);
      return NextResponse.json(
        { error: "Failed to create subscription", details: subscription },
        { status: 500 }
      );
    }

    // Find the approval link
    const approvalLink = subscription.links?.find(
      (link: { rel: string; href: string }) => link.rel === "approve"
    )?.href;

    return NextResponse.json({
      subscriptionId: subscription.id,
      approvalUrl: approvalLink,
      planId: plan.id,
      productId: product.id,
    });
  } catch (error) {
    console.error("PayPal subscription error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
