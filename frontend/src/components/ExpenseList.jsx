import { colorFor } from "../categoryColors";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="panel">
      <h2 className="panel-title">All expenses</h2>

      {expenses.length === 0 ? (
        <p className="empty-state">
          No expenses logged yet. Use the form to add your first one.
        </p>
      ) : (
        <ul className="ledger">
          {expenses.map((e) => (
            <li className="ledger-row" key={e.id}>
              <span
                className="category-dot"
                style={{ backgroundColor: colorFor(e.category) }}
              />
              <div className="ledger-main">
                <span className="ledger-category">{e.category}</span>
                {e.note && <span className="ledger-note">{e.note}</span>}
              </div>
              <span className="ledger-date">{formatDate(e.date)}</span>
              <span className="ledger-amount">
                ₹{e.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
              <button
                className="delete-button"
                onClick={() => onDelete(e.id)}
                aria-label={`Delete ${e.category} expense of ₹${e.amount}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
