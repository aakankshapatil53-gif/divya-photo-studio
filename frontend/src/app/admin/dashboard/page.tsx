"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Trash2, Plus, Check, X, Download } from "lucide-react";
import {
  fetchBookings, updateBookingStatus, fetchAllBookedDates,
  addBookedDate, removeBookedDate,
} from "@/lib/api";

type Booking = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  location: string;
  packageId: string;
  specialRequirements?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bookings" | "dates">("bookings");

  const load = useCallback(async (t: string) => {
    setLoading(true);
    try {
      const [b, d] = await Promise.all([fetchBookings(t), fetchAllBookedDates(t)]);
      setBookings(b);
      setBookedDates(d.map((x: any) => x.date));
    } catch {
      // token invalid/expired
      localStorage.removeItem("dps-admin-token");
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const t = localStorage.getItem("dps-admin-token");
    if (!t) {
      router.push("/admin");
      return;
    }
    setToken(t);
    load(t);
  }, [load, router]);

  const handleStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    if (!token) return;
    await updateBookingStatus(token, id, status);
    load(token);
  };

  const handleAddDate = async () => {
    if (!token || !newDate) return;
    await addBookedDate(token, newDate);
    setNewDate("");
    load(token);
  };

  const handleRemoveDate = async (date: string) => {
    if (!token) return;
    await removeBookedDate(token, date);
    load(token);
  };

  const logout = () => {
    localStorage.removeItem("dps-admin-token");
    router.push("/admin");
  };

  const exportCSV = () => {
    const header = ["Name", "Phone", "Email", "Event Type", "Date", "Time", "Location", "Package", "Status"];
    const rows = bookings.map((b) => [b.customerName, b.phone, b.email, b.eventType, b.eventDate, b.eventTime, b.location, b.packageId, b.status]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "divya-photo-studio-bookings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-warmwhite text-charcoal">Loading dashboard…</div>;
  }

  return (
    <main className="min-h-screen bg-warmwhite px-5 py-10 dark:bg-charcoal md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl text-charcoal dark:text-warmwhite">
            Divya <span className="text-gold">Admin Dashboard</span>
          </h1>
          <button onClick={logout} className="flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-charcoal dark:text-warmwhite">
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div className="mt-6 flex gap-2">
          <button onClick={() => setTab("bookings")} className={`rounded-full px-4 py-2 text-sm ${tab === "bookings" ? "bg-gold-gradient text-charcoal" : "border border-gold/30 text-charcoal dark:text-warmwhite"}`}>
            Bookings ({bookings.length})
          </button>
          <button onClick={() => setTab("dates")} className={`rounded-full px-4 py-2 text-sm ${tab === "dates" ? "bg-gold-gradient text-charcoal" : "border border-gold/30 text-charcoal dark:text-warmwhite"}`}>
            Booked Dates ({bookedDates.length})
          </button>
          <button onClick={exportCSV} className="ml-auto flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-sm text-charcoal dark:text-warmwhite">
            <Download size={14} /> Export CSV
          </button>
        </div>

        {tab === "bookings" && (
          <div className="mt-6 overflow-x-auto rounded-2xl glass shadow-soft">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-gold/20 text-xs uppercase tracking-wide text-charcoal/60 dark:text-warmwhite/60">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">Date / Time</th>
                  <th className="p-4">Package</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-gold/10 text-charcoal dark:text-warmwhite">
                    <td className="p-4">
                      <p className="font-medium">{b.customerName}</p>
                      <p className="text-xs text-charcoal/60 dark:text-warmwhite/60">{b.phone} · {b.email}</p>
                    </td>
                    <td className="p-4">{b.eventType}</td>
                    <td className="p-4">{b.eventDate} <br /> {b.eventTime}</td>
                    <td className="p-4">{b.packageId}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        b.status === "APPROVED" ? "bg-green-100 text-green-700" :
                        b.status === "REJECTED" ? "bg-red-100 text-red-700" :
                        "bg-gold/20 text-gold-dark"
                      }`}>{b.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleStatus(b.id, "APPROVED")} className="grid h-8 w-8 place-items-center rounded-full bg-green-100 text-green-700"><Check size={14} /></button>
                        <button onClick={() => handleStatus(b.id, "REJECTED")} className="grid h-8 w-8 place-items-center rounded-full bg-red-100 text-red-700"><X size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-charcoal/50 dark:text-warmwhite/50">No booking inquiries yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === "dates" && (
          <div className="mt-6 rounded-2xl glass p-6 shadow-soft">
            <div className="flex flex-wrap gap-3">
              <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="rounded-xl border border-gold/30 bg-transparent px-3 py-2 text-sm text-charcoal outline-none dark:text-warmwhite" />
              <button onClick={handleAddDate} className="flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2 text-sm font-semibold text-charcoal">
                <Plus size={14} /> Mark as Booked
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {bookedDates.map((d) => (
                <span key={d} className="flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-sm text-charcoal dark:text-warmwhite">
                  {new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                  <button onClick={() => handleRemoveDate(d)} aria-label="Remove date"><Trash2 size={14} className="text-red-500" /></button>
                </span>
              ))}
              {bookedDates.length === 0 && <p className="text-sm text-charcoal/50 dark:text-warmwhite/50">No dates marked as booked.</p>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
