import { useState } from "react";
import { motion } from "framer-motion";
import { cardColors } from "../../Data/WalletData";

export default function AddCardModal({ onClose, onAdd }) {
  const [cardName, setCardName] = useState("");
  const [digits, setDigits] = useState("");
  const [network, setNetwork] = useState("Visa");
  const [selectedColor, setSelectedColor] = useState(cardColors[0]);

  const addCard = () => {
    if (!cardName.trim() || !digits.trim()) return;

    const last4 = digits.slice(-4).padStart(4, "0");

    onAdd({
      name: cardName,
      type: network,
      color: selectedColor,
      balance: 0,
      number: `•••• •••• •••• ${last4}`,
    });

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
        <p className="text-sm font-medium text-gray-700 mb-4">Add a new card</p>

        <label className="text-xs text-gray-500 block mb-1">Card name</label>

        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="e.g. HDFC Savings"
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 mb-3"
        />

        <label className="text-xs text-gray-500 block mb-1">
          Last 4 digits
        </label>

        <input
          type="text"
          value={digits}
          maxLength={4}
          placeholder="7821"
          onChange={(e) => setDigits(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 mb-3"
        />

        <label className="text-xs text-gray-500 block mb-1">Network</label>

        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg mb-3 focus:outline-none"
        >
          {["Visa", "Mastercard", "RuPay", "Amex"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <label className="text-xs text-gray-500 block mb-2">Card color</label>

        <div className="flex gap-2 mb-5">
          {cardColors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              style={{ background: c }}
              className={`w-7 h-7 rounded-full ${
                selectedColor === c ? "ring-2 ring-offset-1 ring-blue-500" : ""
              }`}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={addCard}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Card
          </button>
        </div>
      </motion.div>
    </div>
  );
}
