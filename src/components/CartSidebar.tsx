"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();
  const { language } = useLanguage();

  const cartTitle = language === 'de' ? 'Warenkorb' : 'Carrello';
  const emptyCart = language === 'de' ? 'Dein Warenkorb ist leer' : 'Il tuo carrello è vuoto';
  const continueShopping = language === 'de' ? 'Weiter einkaufen' : 'Continua lo shopping';
  const totalText = language === 'de' ? 'Gesamt' : 'Totale';
  const checkoutText = language === 'de' ? 'Zur Kasse' : 'Procedi al Checkout';

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        className="fixed inset-0 bg-black/50 z-40 cursor-default"
        onClick={() => setIsOpen(false)}
        aria-label="Close cart"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-line z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-line">
          <h2 className="text-xl font-black text-ink uppercase">{cartTitle}</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-ink/60 hover:text-ink transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-ink/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-ink/60">{emptyCart}</p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-4 text-gold hover:text-gold-soft transition-colors"
              >
                {continueShopping}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-surface border border-line rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-ink">{item.name}</h3>
                      {item.variant && (
                        <p className="text-sm text-ink/60">{item.variant}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-ink/40 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-md bg-elevated text-ink flex items-center justify-center hover:bg-elevated/70 border border-line transition-colors"
                      >
                        -
                      </button>
                      <span className="text-ink font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-md bg-elevated text-ink flex items-center justify-center hover:bg-elevated/70 border border-line transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      {item.originalPrice && (
                        <p className="text-sm text-ink/40 line-through">{(item.originalPrice * item.quantity).toFixed(2)}</p>
                      )}
                      <p className="font-bold text-gold">{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-ink/70">{totalText}</span>
              <span className="text-2xl font-black text-gold">{totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-gold hover:bg-gold-soft text-white text-center py-4 rounded-md font-bold uppercase tracking-wider transition-colors"
            >
              {checkoutText}
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-ink/60 hover:text-ink transition-colors py-2"
            >
              {continueShopping}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
