import { toINR } from "../../../utils/Formatters";

export default function CardDetail({
  activeCard,
  onSend,
  onReceive,
  onRemove,
}) {
  const { id, name, number, type, balance } = activeCard;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-semibold text-gray-800">{name}</h2>

        <button
          onClick={() => onRemove(id)}
          className="text-xs text-red-400 hover:text-red-600 border border-red-100 px-2 py-1 rounded-lg"
        >
          Remove
        </button>
      </div>

      <div className="space-y-3 text-sm mb-5">
        <div className="flex justify-between">
          <span className="text-gray-500">Number</span>
          <span className="font-medium text-gray-800">{number}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Network</span>
          <span className="font-medium text-gray-800">{type}</span>
        </div>

        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-500">Balance</span>
          <span className="font-bold text-blue-600">{toINR(balance)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSend}
          className="flex-1 text-xs py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>

        <button
          onClick={onReceive}
          className="flex-1 text-xs py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Receive
        </button>
      </div>
    </div>
  );
}
