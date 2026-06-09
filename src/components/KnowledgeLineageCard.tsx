export default function KnowledgeLineageCard() {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
      <h2 className="text-lg font-bold mb-2">
        Knowledge Lineage
      </h2>

      <div className="space-y-2 text-sm">
        <p>Jane's Registry: CONNECTED</p>
        <p>AIS Runtime: VERIFIED</p>
        <p>Replay Continuity: VERIFIED</p>
        <p>Lineage Hash: ACTIVE</p>
      </div>
    </div>
  );
}