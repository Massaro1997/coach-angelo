"use client";

import { useState, useEffect } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  createdAt: string;
  read: boolean;
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
  const [activeTab, setActiveTab] = useState<"contacts" | "orders">("contacts");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Password semplice per protezione base
  const ADMIN_PASSWORD = "angelo2024";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      localStorage.setItem("admin_auth", "true");
    } else {
      setError("Password errata");
    }
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

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
  }, [isAuthenticated]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 pt-32 pb-20 flex items-center justify-center">
        <div className="bg-neutral-800 rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
                placeholder="Inserisci password"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white px-6 py-3 rounded-full font-semibold"
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <button
            onClick={handleLogout}
            className="text-white/60 hover:text-white text-sm"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-800 rounded-xl p-6">
            <h3 className="text-white/60 text-sm mb-2">Contatti Totali</h3>
            <p className="text-3xl font-bold text-white">{contacts.length}</p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-6">
            <h3 className="text-white/60 text-sm mb-2">Ordini Totali</h3>
            <p className="text-3xl font-bold text-white">{orders.length}</p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-6">
            <h3 className="text-white/60 text-sm mb-2">Fatturato Totale</h3>
            <p className="text-3xl font-bold text-fuchsia-400">
              €{orders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "contacts"
                ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white"
                : "bg-neutral-800 text-white/60 hover:text-white"
            }`}
          >
            Contatti ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "orders"
                ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white"
                : "bg-neutral-800 text-white/60 hover:text-white"
            }`}
          >
            Ordini ({orders.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                      <p className="text-fuchsia-400">{contact.email}</p>
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
                  <div className="bg-neutral-700/50 rounded-lg p-4">
                    <p className="text-white/80 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-fuchsia-400 hover:text-fuchsia-300"
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
                      <p className="text-fuchsia-400">{order.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-fuchsia-400">
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
                        className="text-sm text-fuchsia-400 hover:text-fuchsia-300"
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
