const BASE = import.meta.env.VITE_API_URL || "/api";

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export function getCategories() {
  return fetch(`${BASE}/categories`).then(handle);
}

export function getExpenses() {
  return fetch(`${BASE}/expenses`).then(handle);
}

export function getSummary() {
  return fetch(`${BASE}/expenses/summary`).then(handle);
}

export function addExpense(expense) {
  return fetch(`${BASE}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  }).then(handle);
}

export function deleteExpense(id) {
  return fetch(`${BASE}/expenses/${id}`, { method: "DELETE" }).then(handle);
}

export function getBudget() {
  return fetch(`${BASE}/budget`).then(handle);
}

export function setBudget(amount) {
  return fetch(`${BASE}/budget`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  }).then(handle);
}
