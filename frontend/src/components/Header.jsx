export default function Header({ monthLabel, monthlyTotal, streak = 0 }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="wordmark">
          <span className="wordmark-mark">Ledger</span>
          <span className="wordmark-sub">A running record of where money goes</span>
        </div>
        <div className="header-right">
          {streak > 0 && (
            <div className="streak-badge">
              <span className="streak-count">{streak}</span>
              <span className="streak-label">
                no-spend day{streak === 1 ? "" : "s"} in a row
              </span>
            </div>
          )}
          <div className="total-block">
            <span className="total-amount">
              ₹{monthlyTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
            <span className="total-label">
              spent in {monthLabel || "this month"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
