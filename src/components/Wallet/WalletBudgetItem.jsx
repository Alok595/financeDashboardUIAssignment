import { motion } from "framer-motion";
import { toINR } from "../../../utils/Formatters";

export default function BudgetItem({ category, spent, limit }) {
  const percentage = limit ? Math.round((spent / limit) * 100) : 0;
  const progress = Math.min(percentage, 100);
  const exceeded = spent > limit;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{category}</span>

        <span
          className={exceeded ? "text-red-500 font-medium" : "text-gray-500"}
        >
          {toINR(spent)} / {toINR(limit)}
        </span>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: exceeded ? "#ef4444" : "#1a56db",
          }}
        />
      </div>
    </div>
  );
}
