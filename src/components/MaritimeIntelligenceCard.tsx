export default function MaritimeIntelligenceCard() {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
      <h2 className="text-lg font-bold mb-2">
        Maritime Intelligence
      </h2>

      <div className="space-y-2 text-sm">
        <p><strong>Vessel:</strong> Vessel_004</p>
        <p><strong>Class:</strong> Destroyer</p>
        <p><strong>Threat:</strong> Medium</p>
        <p><strong>Confidence:</strong> 92%</p>
        <p><strong>Source:</strong> Jane's Fighting Ships</p>
      </div>
    </div>
  );
}