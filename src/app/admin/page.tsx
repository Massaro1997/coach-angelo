"use client";

import { useState, useEffect } from "react";
import AdminGate, { adminLogout } from "@/components/AdminGate";
import Conversioni from "@/components/admin/Conversioni";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  createdAt: string;
  read: boolean;
  referrer: string | null;
  landingPage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

// Etichetta sorgente leggibile da referrer/utm
function sourceLabel(c: Contact): { label: string; color: string } | null {
  if (c.utmSource) {
    return { label: `${c.utmSource}${c.utmMedium ? ` / ${c.utmMedium}` : ""}`, color: "bg-purple-500/20 text-purple-300" };
  }
  if (c.referrer) {
    try {
      const host = new URL(c.referrer).hostname.replace(/^www\./, "");
      if (host.includes("google")) return { label: "Google", color: "bg-blue-500/20 text-blue-300" };
      if (host.includes("instagram")) return { label: "Instagram", color: "bg-pink-500/20 text-pink-300" };
      if (host.includes("tiktok")) return { label: "TikTok", color: "bg-teal-500/20 text-teal-300" };
      if (host.includes("facebook")) return { label: "Facebook", color: "bg-blue-500/20 text-blue-300" };
      if (host.includes("bing")) return { label: "Bing", color: "bg-cyan-500/20 text-cyan-300" };
      return { label: host, color: "bg-neutral-600/40 text-white/70" };
    } catch {
      return { label: c.referrer, color: "bg-neutral-600/40 text-white/70" };
    }
  }
  if (c.landingPage) {
    return { label: "Diretto / sconosciuto", color: "bg-neutral-600/40 text-white/60" };
  }
  return null;
}

interface OrderItem {
  name: string;
  variant?: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string;
  items: OrderItem[];
  totalPrice: number;
  paypalOrderId: string | null;
  paypalStatus: string | null;
  createdAt: string;
  status: string;
}

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"conversioni" | "contacts" | "orders">("conversioni");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [contactsRes, ordersRes] = await Promise.all([
          fetch("/api/contact"),
          fetch("/api/orders"),
        ]);

        if (contactsRes.ok) {
          const contactsData = await contactsRes.json();
          setContacts(contactsData);
        }

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        }
      } catch (err) {
        console.error("Errore caricamento dati:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="text-gold">
              Admin Dashboard
            </span>
          </h1>
          <div className="flex items-center gap-4">
            <a href="/admin/gsc" className="text-white/60 hover:text-white text-sm">
              Search Console
            </a>
            <button
              onClick={() => adminLogout()}
              className="text-white/60 hover:text-white text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setActiveTab("conversioni")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "conversioni"
                ? "bg-gold text-white"
                : "bg-neutral-800 text-white/60 hover:text-white"
            }`}
          >
            Conversioni
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "contacts"
                ? "bg-gold text-white"
                : "bg-neutral-800 text-white/60 hover:text-white"
            }`}
          >
            Contatti ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "orders"
                ? "bg-gold text-white"
                : "bg-neutral-800 text-white/60 hover:text-white"
            }`}
          >
            Ordini ({orders.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === "conversioni" ? (
          <Conversioni />
        ) : loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60">Caricamento...</p>
          </div>
        ) : activeTab === "contacts" ? (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="bg-neutral-800 rounded-xl p-12 text-center">
                <p className="text-white/60">Nessun contatto ricevuto</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-neutral-800 rounded-xl p-6 hover:bg-neutral-750 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {contact.name}
                      </h3>
                      <p className="text-gold">{contact.email}</p>
                    </div>
                    <span className="text-white/40 text-sm">
                      {formatDate(contact.createdAt)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {contact.phone && (
                      <p className="text-white/70">
                        <span className="text-white/40">Tel:</span> {contact.phone}
                      </p>
                    )}
                    {contact.service && (
                      <p className="text-white/70">
                        <span className="text-white/40">Servizio:</span> {contact.service}
                      </p>
                    )}
                  </div>
                  {(() => {
                    const src = sourceLabel(contact);
                    if (!src && !contact.landingPage) return null;
                    return (
                      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                        {src && (
                          <span className={`px-2.5 py-1 rounded-full font-semibold ${src.color}`}>
                            {src.label}
                          </span>
                        )}
                        {contact.landingPage && (
                          <span className="text-white/40">
                            Landing: <span className="text-white/60">{contact.landingPage}</span>
                          </span>
                        )}
                        {contact.utmCampaign && (
                          <span className="text-white/40">
                            Campagna: <span className="text-white/60">{contact.utmCampaign}</span>
                          </span>
                        )}
                      </div>
                    );
                  })()}
                  <div className="bg-neutral-700/50 rounded-lg p-4">
                    <p className="text-white/80 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-gold hover:text-gold-soft"
                    >
                      Rispondi via Email
                    </a>
                    {contact.phone && (
                      <a
                        href={`https://wa.me/${contact.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-400 hover:text-green-300"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-neutral-800 rounded-xl p-12 text-center">
                <p className="text-white/60">Nessun ordine ricevuto</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-neutral-800 rounded-xl p-6 hover:bg-neutral-750 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {order.firstName} {order.lastName}
                      </h3>
                      <p className="text-gold">{order.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gold">
                        €{order.totalPrice}
                      </p>
                      <span className="text-white/40 text-sm">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {order.phone && (
                      <p className="text-white/70">
                        <span className="text-white/40">Tel:</span> {order.phone}
                      </p>
                    )}
                    {order.address && (
                      <p className="text-white/70">
                        <span className="text-white/40">Indirizzo:</span>{" "}
                        {order.address}, {order.postalCode} {order.city}, {order.country}
                      </p>
                    )}
                  </div>

                  <div className="bg-neutral-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white/60 text-sm mb-2">Prodotti:</h4>
                    <ul className="space-y-1">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-white/80">
                          {item.name}
                          {item.variant && ` (${item.variant})`} x{item.quantity} -{" "}
                          €{item.price * item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {order.status === "completed" ? "Completato" : "In attesa"}
                      </span>
                      {order.paypalOrderId && (
                        <span className="text-white/40 text-xs">
                          PayPal: {order.paypalOrderId}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${order.email}`}
                        className="text-sm text-gold hover:text-gold-soft"
                      >
                        Email
                      </a>
                      {order.phone && (
                        <a
                          href={`https://wa.me/${order.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-400 hover:text-green-300"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
