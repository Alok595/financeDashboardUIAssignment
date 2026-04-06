import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────
import { transactions as initialTransactions } from "../Data/FinanceData"; // your existing file
import { myCards, budgets } from "../Data/WalletData";
import CardItem from "../components/Wallet/WalletCardItem";
import CardDetail from "../components/Wallet/WalletCardDetail";
import BudgetItem from "../components/Wallet/WalletBudgetItem";
import SpendingChart from "../components/Wallet/WalletSpendingChart";
import RecentTransactions from "../components/Wallet/WalletRecentTransactions";
import AllCardsSummary from "../components/Wallet/AllCardSummary";
import SendModal from "../components/Wallet/Sendmodal";
import ReceiveModal from "../components/Wallet/ReceiveModal";
import TransferModal from "../components/Wallet/TransferModal";
import AddCardModal from "../components/Wallet/AddCardmodal";
import { toINR } from "../../utils/Formatters";

// ─────────────────────────────────────────────────
export default function Wallet() {
  const [cards, setCards] = useState(myCards);
  const [activeCardId, setActive] = useState(myCards[0].id);
  const [txns, setTxns] = useState(initialTransactions);
  const [openModal, setModal] = useState(null); // "send"|"receive"|"transfer"|"addCard"

  const activeCard = cards.find((c) => c.id === activeCardId) || cards[0];
  const totalBalance = cards.reduce((sum, c) => sum + c.balance, 0);

  // ── Derived data ──────────────────────────────
  const spentMap = useMemo(() => {
    const map = {};
    txns
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return map;
  }, [txns]);

  const chartData = useMemo(() => {
    const map = {};
    txns.forEach((t) => {
      const key = t.date.slice(5); // MM-DD
      map[key] = (map[key] || 0) + (t.type === "expense" ? t.amount : 0);
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [txns]);

  const recentTxns = useMemo(
    () =>
      [...txns].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6),
    [txns],
  );

  // ── Handlers ──────────────────────────────────
  function addTransaction(type, cardId, amount, category) {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== cardId) return c;
        const newBalance =
          type === "income"
            ? c.balance + amount
            : Math.max(0, c.balance - amount);
        return { ...c, balance: newBalance };
      }),
    );
    setTxns((prev) => [
      {
        id: Math.max(...prev.map((t) => t.id)) + 1,
        date: new Date().toISOString().slice(0, 10),
        amount,
        category,
        type,
      },
      ...prev,
    ]);
  }

  function handleTransfer(fromId, toId, amount) {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === fromId)
          return { ...c, balance: Math.max(0, c.balance - amount) };
        if (c.id === toId) return { ...c, balance: c.balance + amount };
        return c;
      }),
    );
  }

  function handleAddCard(data) {
    const newId = Math.max(0, ...cards.map((c) => c.id)) + 1;
    setCards((prev) => [...prev, { id: newId, ...data }]);
  }

  function handleRemoveCard(id) {
    const remaining = cards.filter((c) => c.id !== id);
    setCards(remaining);
    if (activeCardId === id && remaining.length > 0) setActive(remaining[0].id);
  }

  // ── Render ────────────────────────────────────
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Wallet</h1>

      {/* ── Total balance + action buttons ── */}
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6
                      flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <p className="text-sm text-gray-500">
            Total balance across all accounts
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {toINR(totalBalance)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {cards.length} card{cards.length !== 1 ? "s" : ""} linked
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            {
              label: "Send",
              icon: "↑",
              modal: "send",
              cls: "bg-blue-600 hover:bg-blue-700 text-white",
            },
            {
              label: "Receive",
              icon: "↓",
              modal: "receive",
              cls: "bg-green-600 hover:bg-green-700 text-white",
            },
            {
              label: "Transfer",
              icon: "⇄",
              modal: "transfer",
              cls: "bg-amber-500 hover:bg-amber-600 text-white",
            },
            {
              label: "Add Card",
              icon: "+",
              modal: "addCard",
              cls: "bg-gray-100 hover:bg-gray-200 text-gray-600",
            },
          ].map(({ label, icon, modal, cls }) => (
            <button
              key={modal}
              onClick={() => setModal(modal)}
              className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl text-xs font-medium ${cls}`}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Cards list ── */}
      <div className="mb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          Your Cards
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              isSelected={card.id === activeCardId}
              onClick={() => setActive(card.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Card detail + Spending chart ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <CardDetail
          activeCard={activeCard}
          onSend={() => setModal("send")}
          onReceive={() => setModal("receive")}
          onRemove={handleRemoveCard}
        />
        <SpendingChart chartData={chartData} />
      </div>

      {/* ── Budget Tracker + Recent Transactions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Budget Tracker</h2>
          {budgets.map((b) => (
            <BudgetItem
              key={b.category}
              category={b.category}
              spent={spentMap[b.category] || 0}
              limit={b.limit}
            />
          ))}
        </div>
        <RecentTransactions transactions={recentTxns} />
      </div>

      {/* ── All cards summary table ── */}
      <AllCardsSummary
        cards={cards}
        activeCardId={activeCardId}
        totalBalance={totalBalance}
        onSelect={setActive}
      />

      {/* ── Modals ── */}
      <AnimatePresence>
        {openModal === "send" && (
          <SendModal
            cards={cards}
            activeCard={activeCard}
            onClose={() => setModal(null)}
            onSend={(cardId, amt, to) =>
              addTransaction("expense", cardId, amt, `Sent to ${to}`)
            }
          />
        )}
        {openModal === "receive" && (
          <ReceiveModal
            cards={cards}
            activeCard={activeCard}
            onClose={() => setModal(null)}
            onReceive={(cardId, amt) =>
              addTransaction("income", cardId, amt, "Received")
            }
          />
        )}
        {openModal === "transfer" && (
          <TransferModal
            cards={cards}
            onClose={() => setModal(null)}
            onTransfer={handleTransfer}
          />
        )}
        {openModal === "addCard" && (
          <AddCardModal onClose={() => setModal(null)} onAdd={handleAddCard} />
        )}
      </AnimatePresence>
    </div>
  );
}
