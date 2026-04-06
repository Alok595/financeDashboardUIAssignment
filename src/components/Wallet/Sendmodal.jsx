import { useState } from "react";
import { motion } from "framer-motion";
import { contacts } from "../../Data/WalletData";
import { toINR } from "../../../utils/Formatters";

export default function SendModal({ cards, activeCard, onClose, onSend }) {
  const [step, setStep] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [fromCardId, setFromCardId] = useState(activeCard.id);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const currentCard =
    cards.find((card) => card.id === Number(fromCardId)) || activeCard;

  const amountValue = parseFloat(amount);
  const amountOk = amountValue > 0 && amountValue <= currentCard.balance;

  const handleContactClick = (c) => {
    setSelectedContact(c);
    setUpiId(c.upi);
    setStep(2);
  };

  const handleSend = () => {
    const receiver = selectedContact?.name || upiId;

    onSend(currentCard.id, amountValue, receiver);
    setStep(4);
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
        className="bg-white rounded-2xl p-6 w-96 shadow-lg"
      >
        {/* Step indicator */}
        {step < 4 && (
          <div className="flex items-center gap-2 mb-5">
            {["Recipient", "Amount", "Confirm"].map((label, i) => {
              const current = i + 1;
              const done = step > current;
              const active = step === current;

              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                    ${
                      done
                        ? "bg-green-100 text-green-700"
                        : active
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {done ? "✓" : current}
                  </div>

                  <span
                    className={`text-xs ${
                      active ? "font-medium text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>

                  {i < 2 && <div className="w-5 h-px bg-gray-200" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Who do you want to send to?
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="UPI ID or phone"
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setSelectedContact(null);
                }}
                className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
              />

              <button
                onClick={() => {
                  if (upiId.trim()) setStep(2);
                }}
                className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                →
              </button>
            </div>

            <p className="text-xs text-gray-400 mb-2">Recent contacts</p>

            <div className="flex flex-col gap-2">
              {contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleContactClick(c)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-50 text-sm"
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-gray-400">{c.upi}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
