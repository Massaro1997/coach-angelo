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
    const { productId, productName, price } = await request.json();

    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: productId,
            description: productName,
            amount: {
              currency_code: "EUR",
              value: price.toString(),
            },
          },
        ],
        application_context: {
          brand_name: "Coach Angelo",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://coach-angelo.vercel.app"}/checkout/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://coach-angelo.vercel.app"}/servizi`,
        },
      }),
    });

    const order = await response.json();

    if (order.error) {
      return NextResponse.json({ error: order.error }, { status: 500 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("PayPal create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
