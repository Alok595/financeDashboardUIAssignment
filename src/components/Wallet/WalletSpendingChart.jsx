import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { toINR } from "../../../utils/Formatters";
import { barColors } from "../../Data/WalletData";

export default function SpendingChart({ chartData }) {
  const formatYAxis = (value) => `₹${(value / 1000).toFixed(0)}k`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
      <h2 className="font-semibold text-gray-800 mb-4">Spending by date</h2>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={16}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />

            <YAxis tick={{ fontSize: 10 }} tickFormatter={formatYAxis} />

            <Tooltip formatter={(value) => [toINR(value), "Spent"]} />

            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((item, index) => (
                <Cell key={index} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
