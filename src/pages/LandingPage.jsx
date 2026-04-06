import { ChartNoAxesCombined } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path) => {
    setLoading(true);
    setTimeout(() => navigate(path), 1800);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              style={{
                animation: "bounce 0.9s ease-in-out infinite",
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm tracking-widest uppercase">
          Loading dashboard
        </p>
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); opacity: 0.3; }
            50% { transform: translateY(-8px); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.34s; }
        .delay-4 { animation-delay: 0.46s; }
        .delay-5 { animation-delay: 0.58s; }
      `}</style>

      {/* Nav */}
      <nav className="fade-up flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="text-base items-center gap-1 flex font-semibold tracking-tight">
          <ChartNoAxesCombined size={20} /> CapitalView
        </span>
        <button
          onClick={() => handleNavigate("/wallet")}
          className="text-sm border border-white/20 text-white/80 px-4 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          Open App
        </button>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24">
        <span className="fade-up delay-1 text-xs font-medium tracking-widest text-gray-500 uppercase mb-5">
          Finance Dashboard
        </span>

        <h1 className="fade-up delay-2 text-4xl sm:text-5xl font-bold leading-tight max-w-xl mb-5 text-white">
          Track your money,
          <br />
          <span className="text-gray-400">understand your spending.</span>
        </h1>

        <p className="fade-up delay-3 text-gray-500 text-base max-w-sm mb-10 leading-relaxed">
          View your balance, explore transactions, and get insights into where
          your money goes.
        </p>

        <div className="fade-up delay-4 flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => handleNavigate("/wallet")}
            className="bg-white text-gray-950 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Go to Dashboard →
          </button>
          <button
            onClick={() => handleNavigate("/wallet")}
            className="border border-white/15 text-gray-400 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            View Wallet
          </button>
        </div>
      </main>

      {/* Features */}
      <section className="fade-up delay-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {[
          {
            title: "Overview",
            desc: "Balance, income and expense summary at a glance.",
          },
          {
            title: "Transactions",
            desc: "Filter, search and sort all your transactions.",
          },
          {
            title: "Insights",
            desc: "Spot trends and understand spending patterns.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="px-8 py-8 hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-sm font-semibold text-white mb-1">{f.title}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="px-8 py-4 border-t border-white/10 text-center text-xs text-gray-700">
        CapitalView · Finance Dashboard · 2024
      </footer>
    </div>
  );
}
