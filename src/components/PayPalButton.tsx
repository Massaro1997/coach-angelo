"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";

interface PayPalButtonProps {
  productId: string;
  productName: string;
  price: number;
  onSuccess?: (details: Record<string, unknown>) => void;
  onError?: (error: unknown) => void;
}

export default function PayPalButton({
  productId,
  productName,
  price,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = async () => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productName,
          price,
        }),
      });

      const order = await response.json();

      if (order.error) {
        throw new Error(order.error);
      }

      return order.id;
    } catch (error) {
      console.error("Error creating order:", error);
      if (onError) onError(error);
      throw error;
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      });

      const captureData = await response.json();

      if (captureData.error) {
        throw new Error(captureData.error);
      }

      if (onSuccess) onSuccess(captureData);
    } catch (error) {
      console.error("Error capturing order:", error);
      if (onError) onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isProcessing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "black",
          shape: "pill",
          label: "pay",
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {
          console.error("PayPal error:", err);
          if (onError) onError(err);
        }}
      />
    </div>
  );
}
