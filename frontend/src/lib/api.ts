// Small fetch helper for talking to the Express/Prisma backend.
// Configure the backend URL in .env.local as NEXT_PUBLIC_API_URL.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export type BookingPayload = {
  customerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  eventType: string;
  eventDate: string; // ISO date
  eventTime: string;
  location: string;
  packageId: string;
  specialRequirements?: string;
};

export async function checkDateAvailability(date: string): Promise<{ available: boolean; nextAvailableDates: string[] }> {
  const res = await fetch(`${API_URL}/booked-dates/check?date=${encodeURIComponent(date)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to check date availability");
  return res.json();
}

export async function submitBooking(payload: BookingPayload) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to submit booking");
  }
  return res.json();
}

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export async function fetchBookings(token: string) {
  const res = await fetch(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load bookings");
  return res.json();
}

export async function updateBookingStatus(token: string, id: string, status: "APPROVED" | "REJECTED") {
  const res = await fetch(`${API_URL}/bookings/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update booking");
  return res.json();
}

export async function addBookedDate(token: string, date: string) {
  const res = await fetch(`${API_URL}/booked-dates`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ date }),
  });
  if (!res.ok) throw new Error("Failed to add booked date");
  return res.json();
}

export async function removeBookedDate(token: string, date: string) {
  const res = await fetch(`${API_URL}/booked-dates/${encodeURIComponent(date)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to remove booked date");
  return res.json();
}

export async function fetchAllBookedDates(token: string) {
  const res = await fetch(`${API_URL}/booked-dates`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load booked dates");
  return res.json();
}
