import { useState } from "react";
import { motion } from "framer-motion";
import { toINR } from "../../../utils/Formatters";

export default function ReceiveModal({
  cards,
  activeCard,
  onClose,
  onReceive,
}) {
  const [screen, setScreen] = useState("qr");
  const [toCard, setToCard] = useState(activeCard.id);
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedCard =
    cards.find((card) => card.id === Number(toCard)) || activeCard;

  const upiId = selectedCard.name.toLowerCase().replace(/\s+/g, "") + "@okhdfc";

  const copyUpi = () => {
    navigator.clipboard?.writeText(upiId).catch(() => {});
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleRequest = () => {
    const amt = parseFloat(amount);

    if (!amt || amt <= 0) return;

    onReceive(selectedCard.id, amt, "Payment request");
    setScreen("done");
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
        exit={{ opacity: 0, y: 25 }}
        className="bg-white rounded-2xl p-6 w-80 shadow-lg"
      >
        {screen === "qr" && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Receive Money
            </p>

            <p className="text-xs text-gray-400 mb-4">
              Share UPI ID or let them scan
            </p>

            <label className="text-xs text-gray-500 block mb-1">
              Receive to
            </label>

            <select
              value={toCard}
              onChange={(e) => setToCard(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg mb-4 focus:outline-none"
            >
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.name}
                </option>
              ))}
            </select>

            {/* Fake QR */}
            <div className="w-36 h-36 mx-auto bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center mb-4">
              <svg viewBox="0 0 100 100" className="w-28 h-28">
                <rect
                  x="5"
                  y="5"
                  width="28"
                  height="28"
                  rx="3"
                  fill="none"
                  stroke="#1a56db"
                  strokeWidth="4"
                />
                <rect
                  x="12"
                  y="12"
                  width="14"
                  height="14"
                  rx="1"
                  fill="#1a56db"
                />

                <rect
                  x="67"
                  y="5"
                  width="28"
                  height="28"
                  rx="3"
                  fill="none"
                  stroke="#1a56db"
                  strokeWidth="4"
                />
                <rect
                  x="74"
                  y="12"
                  width="14"
                  height="14"
                  rx="1"
                  fill="#1a56db"
                />

                <rect
                  x="5"
                  y="67"
                  width="28"
                  height="28"
                  rx="3"
                  fill="none"
                  stroke="#1a56db"
                  strokeWidth="4"
                />
                <rect
                  x="12"
                  y="74"
                  width="14"
                  height="14"
                  rx="1"
                  fill="#1a56db"
                />

                <rect x="40" y="5" width="4" height="4" fill="#1a56db" />
                <rect x="45" y="10" width="4" height="4" fill="#1a56db" />
                <rect x="50" y="20" width="4" height="4" fill="#1a56db" />
                <rect x="40" y="60" width="4" height="4" fill="#1a56db" />
                <rect x="50" y="70" width="4" height="4" fill="#1a56db" />
              </svg>
            </div>

            <div className="text-center mb-4">
              <p className="text-xs text-gray-400">UPI ID</p>
              <p className="text-sm font-medium text-gray-700">{upiId}</p>
            </div>

            <button
              onClick={copyUpi}
              className="w-full text-sm py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              {copied ? "Copied!" : "Copy UPI ID"}
            </button>

            <button
              onClick={() => setScreen("request")}
              className="w-full mt-2 text-sm py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Request Money
            </button>
          </div>
        )}

        {screen === "request" && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-4">
              Request Payment
            </p>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg mb-4 focus:outline-none"
            />

            <button
              onClick={handleRequest}
              className="w-full text-sm py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Send Request
            </button>
          </div>
        )}

        {screen === "done" && (
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Request Sent
            </p>

            <p className="text-xs text-gray-400 mb-4">
              {toINR(amount)} requested successfully
            </p>

            <button
              onClick={onClose}
              className="w-full text-sm py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
