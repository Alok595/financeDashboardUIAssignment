import { useState } from "react";
import { motion } from "framer-motion";
import { toINR } from "../../../utils/Formatters";

export default function TransferModal({ cards, onClose, onTransfer }) {
  const [fromId, setFromId] = useState(cards[0]?.id || "");
  const [toId, setToId] = useState(cards[1]?.id || "");
  const [amount, setAmount] = useState("");

  const fromCard = cards.find((card) => card.id === Number(fromId));

  const amountValue = parseFloat(amount) || 0;
  const balance = fromCard?.balance || 0;

  const differentCards = Number(fromId) !== Number(toId);
  const enoughBalance = amountValue <= balance;

  const canTransfer = amountValue > 0 && differentCards && enoughBalance;

  const handleTransfer = () => {
    if (!canTransfer) return;

    onTransfer(Number(fromId), Number(toId), amountValue);

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 w-80 shadow-lg"
      >
        <p className="text-sm font-medium text-gray-700 mb-4">
          Transfer between my cards
        </p>

        {/* From card */}
        <label className="text-xs text-gray-500 block mb-1">From</label>

        <select
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg mb-3 focus:outline-none"
        >
          {cards.map((card) => (
            <option key={card.id} value={card.id}>
              {card.name} — {toINR(card.balance)}
            </option>
          ))}
        </select>

        {/* To card */}
        <label className="text-xs text-gray-500 block mb-1">To</label>

        <select
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg mb-3 focus:outline-none"
        >
          {cards.map((card) => (
            <option key={card.id} value={card.id}>
              {card.name} — {toINR(card.balance)}
            </option>
          ))}
        </select>

        {/* Amount */}
        <label className="text-xs text-gray-500 block mb-1">Amount (₹)</label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 2000"
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 mb-1"
        />

        {!enoughBalance && (
          <p className="text-xs text-red-500 mb-2">Not enough balance</p>
        )}

        {/* Buttons */}
        <div className="flex gap-2 justify-end mt-4">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleTransfer}
            disabled={!canTransfer}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Transfer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
