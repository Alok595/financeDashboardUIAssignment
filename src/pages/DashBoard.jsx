import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { transactions } from "../Data/FinanceData";

const PIE_COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#c084fc"];

// simple rupee formatter
function toINR(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function Dashboard() {
  const [search, setSearch] = useState("");

  // calculate total income, expense and balance
  const { income, expense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    return { income, expense, balance: income - expense };
  }, []);

  // running balance for the line chart
  const lineData = useMemo(() => {
    let running = 0;
    return transactions.map((t) => {
      running += t.type === "income" ? t.amount : -t.amount;
      return { date: t.date.slice(5), balance: running };
    });
  }, []);

  // group expenses by category for pie chart
  const pieData = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, []);

  // top 3 spending categories
  const topCategories = pieData.slice(0, 3);

  // savings rate as a percentage
  const savingsRate = income ? ((balance / income) * 100).toFixed(1) : 0;

  // most recent 5 transactions
  const recentTxns = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, []);

  // filter transactions based on search input
  const filtered = useMemo(() => {
    if (!search.trim()) return transactions;
    return transactions.filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  // summary cards data
  const summaryCards = [
    { title: "Balance", value: balance, color: "#1a56db" },
    { title: "Income", value: income, color: "#16a34a" },
    { title: "Expenses", value: expense, color: "#dc2626" },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold mb-6 text-gray-800"
      >
        Finance Dashboard
      </motion.h1>

      {/* summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-7">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <p
              className="text-2xl font-bold mt-1"
              style={{ color: card.color }}
            >
              {toINR(card.value)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
        {/* line chart - balance over time */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="font-semibold text-gray-800 mb-4">
            Balance Over Time
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => "₹" + (v / 1000).toFixed(0) + "k"}
                />
                <Tooltip formatter={(v) => [toINR(v), "Balance"]} />
                <Line
                  dataKey="balance"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* pie chart - spending by category */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="font-semibold text-gray-800 mb-4">
            Spending Breakdown
          </h2>
          <div className="h-72 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => toINR(v)} />
              </PieChart>
            </ResponsiveContainer>

            {/* center label inside the donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-gray-400">Total Spent</p>
              <p className="text-lg font-bold text-gray-800">
                {toINR(expense)}
              </p>
            </div>
          </div>

          {/* simple legend */}
          <div className="flex flex-wrap gap-3 mt-2">
            {pieData.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* insights section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
        {/* top spending categories */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="font-semibold text-gray-800 mb-4">Top Spending</h2>
          <div className="space-y-3">
            {topCategories.map((c, i) => (
              <div
                key={c.name}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: PIE_COLORS[i] }}
                  />
                  <span className="text-gray-700">{c.name}</span>
                </div>
                <span className="font-medium text-gray-800">
                  {toINR(c.value)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* savings rate */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between"
        >
          <h2 className="font-semibold text-gray-800 mb-4">Savings Rate</h2>
          <div>
            <p className="text-4xl font-bold text-green-500">{savingsRate}%</p>
            <p className="text-xs text-gray-400 mt-2">
              of your income is being saved
            </p>
          </div>

          {/* simple visual bar for savings rate */}
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-green-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(savingsRate, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* recent activity */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {recentTxns.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center text-sm"
              >
                <div>
                  <p className="text-gray-700 font-medium">{t.category}</p>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>
                <span
                  className="font-semibold"
                  style={{ color: t.type === "income" ? "#16a34a" : "#dc2626" }}
                >
                  {t.type === "income" ? "+" : "−"}
                  {toINR(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* transactions table */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="font-semibold text-gray-800">All Transactions</h2>
          <input
            type="text"
            placeholder="Search by category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 w-full sm:w-56"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-400 text-xs uppercase tracking-wide">
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-left py-2 font-medium">Category</th>
                <th className="text-right py-2 font-medium">Amount</th>
                <th className="text-right py-2 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2.5 text-gray-500">{t.date}</td>
                  <td className="text-gray-800 font-medium">{t.category}</td>
                  <td className="text-right text-gray-800">
                    {toINR(t.amount)}
                  </td>
                  <td className="text-right">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: t.type === "income" ? "#dcfce7" : "#fee2e2",
                        color: t.type === "income" ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {t.type}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-400 text-sm"
                  >
                    No transactions found for "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
