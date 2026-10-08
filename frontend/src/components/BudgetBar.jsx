import { useState } from "react";

function statusFor(ratio) {
  if (ratio >= 1) return { label: "over budget", key: "danger" };
  if (ratio >= 0.8) return { label: "nearing budget", key: "warning" };
  return { label: "on track", key: "ok" };
}

export default function BudgetBar({ budget, monthlyTotal, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(budget.amount || "");
  const [saving, setSaving] = useState(false);

  const hasBudget = budget.amount > 0;

  async function handleSave(e) {
    e.preventDefault();
    const amount = Number(draft);
    if (!amount || amount <= 0) return;
    setSaving(true);
    try {
      await onSave(amount);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  function startEditing() {
    setDraft(budget.amount || "");
    setEditing(true);
  }

  if (editing) {
    return (
      <form className="panel budget-panel budget-edit-row" onSubmit={handleSave}>
        <label className="field budget-field">
          <span>Monthly budget</span>
          <div className="amount-input">
            <span className="currency">₹</span>
            <input
              type="number"
              min="0"
              step="1"
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          </div>
        </label>
        <div className="budget-edit-actions">
          <button type="submit" className="submit-button" disabled={saving}>
            {saving ? "Saving…" : "Save budget"}
          </button>
          {hasBudget && (
            <button
              type="button"
              className="link-button"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  }

  if (!hasBudget) {
    return (
      <div className="panel budget-panel">
        <p className="empty-state">
          No monthly budget set.{" "}
          <button className="link-button" onClick={startEditing}>
            Set one
          </button>{" "}
          to get a warning when you're close to the limit.
        </p>
      </div>
    );
  }

  const ratio = monthlyTotal / budget.amount;
  const status = statusFor(ratio);
  const pct = Math.min(ratio, 1) * 100;

  return (
    <div className="panel budget-panel">
      <div className="budget-top">
        <span className="panel-title budget-title">Monthly budget</span>
        <button className="link-button" onClick={startEditing}>
          Edit
        </button>
      </div>
      <div className="budget-track">
        <div
          className={`budget-fill status-${status.key}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="budget-footer">
        <span>
          ₹{monthlyTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}{" "}
          of ₹{budget.amount.toLocaleString("en-IN")}
        </span>
        <span className={`budget-status status-text-${status.key}`}>
          {status.label}
        </span>
      </div>
    </div>
  );
}
