import { colorFor } from "../categoryColors";

export default function CategoryChart({ byCategory }) {
  if (byCategory.length === 0) {
    return (
      <div className="panel chart-panel">
        <h2 className="panel-title">Spending by category</h2>
        <p className="empty-state">
          Nothing logged this month yet. Add an expense to see the breakdown.
        </p>
      </div>
    );
  }

  const highest = Math.max(...byCategory.map((c) => c.total));

  return (
    <div className="panel chart-panel">
      <h2 className="panel-title">Spending by category</h2>
      <div className="bar-chart">
        {byCategory.map(({ category, total }) => (
          <div className="bar-row" key={category}>
            <span className="bar-label">{category}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(total / highest) * 100}%`,
                  backgroundColor: colorFor(category),
                }}
              />
            </div>
            <span className="bar-value">
              ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
