import { toINR } from "../../../utils/Formatters";

export default function AllCardsSummary({
  cards,
  activeCardId,
  totalBalance,
  onSelect,
}) {
  const getShare = (balance) => {
    if (!totalBalance) return 0;
    return Math.round((balance / totalBalance) * 100);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <h2 className="font-semibold text-gray-800 mb-4">All Cards Summary</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-400 text-xs uppercase tracking-wide">
            <th className="text-left py-2 font-medium">Card</th>
            <th className="text-left py-2 font-medium">Network</th>
            <th className="text-right py-2 font-medium">Balance</th>
            <th className="text-right py-2 font-medium">Share</th>
          </tr>
        </thead>

        <tbody>
          {cards.map((card) => {
            const share = getShare(card.balance);

            return (
              <tr
                key={card.id}
                onClick={() => onSelect(card.id)}
                className={`border-b cursor-pointer hover:bg-gray-50 ${
                  activeCardId === card.id ? "bg-blue-50" : ""
                }`}
              >
                <td className="py-3 font-medium text-gray-800">{card.name}</td>

                <td className="text-gray-500">{card.type}</td>

                <td className="text-right font-semibold text-gray-800">
                  {toINR(card.balance)}
                </td>

                <td className="text-right text-gray-500">{share}%</td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={2} className="pt-3 text-xs text-gray-400">
              Total
            </td>

            <td className="pt-3 text-right font-bold text-blue-600">
              {toINR(totalBalance)}
            </td>

            <td className="pt-3 text-right text-gray-400">100%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
