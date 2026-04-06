import { toINR } from "../../../utils/Formatters";

export default function RecentTransactions({ transactions }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="font-semibold text-gray-800 mb-4">Recent Transactions</h2>

      <div className="space-y-3">
        {transactions.map((txn) => {
          const isIncome = txn.type === "income";

          return (
            <div key={txn.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{
                    background: isIncome ? "#dcfce7" : "#fee2e2",
                    color: isIncome ? "#16a34a" : "#dc2626",
                  }}
                >
                  {isIncome ? "↑" : "↓"}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {txn.category}
                  </p>

                  <p className="text-xs text-gray-400">{txn.date}</p>
                </div>
              </div>

              <span
                className="text-sm font-semibold"
                style={{ color: isIncome ? "#16a34a" : "#dc2626" }}
              >
                {isIncome ? "+" : "-"}
                {toINR(txn.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
