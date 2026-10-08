import { useState } from "react";

const todayISO = () => new Date().toISOString().slice(0, 10);

export default function ExpenseForm({ categories, onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0] || "");
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!amount || Number(amount) <= 0) {
      setError("Enter an amount greater than zero");
      return;
    }
    if (!category) {
      setError("Choose a category");
      return;
    }
    if (!date) {
      setError("Choose a date");
      return;
    }

    setSubmitting(true);
    try {
      await onAdd({ amount: Number(amount), category, date, note });
      setAmount("");
      setNote("");
      setDate(todayISO());
    } catch (err) {
      setError(err.message || "Could not add the expense");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="panel expense-form" onSubmit={handleSubmit}>
      <h2 className="panel-title">Log an expense</h2>

      <label className="field">
        <span>Amount</span>
        <div className="amount-input">
          <span className="currency">₹</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </label>

      <label className="field">
        <span>Category</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label className="field">
        <span>Note (optional)</span>
        <input
          type="text"
          placeholder="e.g. Groceries for the week"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="submit-button" disabled={submitting}>
        {submitting ? "Adding…" : "Add expense"}
      </button>
    </form>
  );
}
