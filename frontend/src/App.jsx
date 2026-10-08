import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header.jsx";
import BudgetBar from "./components/BudgetBar.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import CategoryChart from "./components/CategoryChart.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import {
  getCategories,
  getExpenses,
  getSummary,
  addExpense,
  deleteExpense,
  getBudget,
  setBudget,
} from "./api.js";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    monthlyTotal: 0,
    month: "",
    byCategory: [],
    noSpendStreak: 0,
  });
  const [budget, setBudgetState] = useState({ amount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAll = useCallback(async () => {
    const [cats, list, sum, bud] = await Promise.all([
      getCategories(),
      getExpenses(),
      getSummary(),
      getBudget(),
    ]);
    setCategories(cats);
    setExpenses(list);
    setSummary(sum);
    setBudgetState(bud);
  }, []);

  useEffect(() => {
    loadAll()
      .catch((err) => setError(err.message || "Could not reach the server"))
      .finally(() => setLoading(false));
  }, [loadAll]);

  async function handleAdd(expense) {
    await addExpense(expense);
    await loadAll();
  }

  async function handleDelete(id) {
    await deleteExpense(id);
    await loadAll();
  }

  async function handleSetBudget(amount) {
    const updated = await setBudget(amount);
    setBudgetState(updated);
  }

  if (loading) {
    return <div className="status-screen">Loading your ledger…</div>;
  }

  if (error) {
    return (
      <div className="status-screen error">
        Couldn't connect to the backend. Make sure the API server is running
        on port 5000. <br />
        <span className="status-detail">{error}</span>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        monthLabel={summary.month}
        monthlyTotal={summary.monthlyTotal}
        streak={summary.noSpendStreak}
      />
      <div className="budget-wrap">
        <BudgetBar
          budget={budget}
          monthlyTotal={summary.monthlyTotal}
          onSave={handleSetBudget}
        />
      </div>
      <main className="layout">
        <ExpenseForm categories={categories} onAdd={handleAdd} />
        <div className="layout-main">
          <CategoryChart byCategory={summary.byCategory} />
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  );
}
