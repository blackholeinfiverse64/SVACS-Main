export default function SensorFusionCard() {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-700">
      <h2 className="text-lg font-bold mb-2">
        Sensor Fusion
      </h2>

      <div className="space-y-2 text-sm">
        <p>AIS: ACTIVE</p>
        <p>Radar: ACTIVE</p>
        <p>Metadata Fusion: VERIFIED</p>
        <p>Classification Confidence: 88%</p>
      </div>
    </div>
  );
}