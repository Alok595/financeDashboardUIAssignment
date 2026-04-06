import { motion } from "framer-motion";
import { toINR } from "../../../utils/Formatters";

export default function CardItem({ card, isSelected, onClick }) {
  const { name, type, number, balance, color } = card;

  const cardStyle = {
    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
    outline: isSelected ? "2px solid #93c5fd" : "none",
    outlineOffset: "3px",
    opacity: isSelected ? 1 : 0.75,
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex-shrink-0 w-60 rounded-2xl p-5 text-white cursor-pointer select-none"
      style={cardStyle}
    >
      <div className="flex justify-between mb-6">
        <span className="text-xs opacity-80">{name}</span>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
          {type}
        </span>
      </div>

      <p className="text-xs tracking-widest opacity-70 mb-3">{number}</p>

      <p className="text-2xl font-bold">{toINR(balance)}</p>
    </motion.div>
  );
}
