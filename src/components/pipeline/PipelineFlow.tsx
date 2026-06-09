import { Radio, Eye, Brain, Flag, Database, Activity } from "lucide-react";
import StatusDot from "@/components/shell/StatusDot";
import type { StageMetric } from "@/domain/types";
import { fmtNum } from "@/lib/format";
import clsx from "clsx";

const stageStyle: Record<
  string,
  {
    icon: typeof Radio;
    ring: string;
    text: string;
    glow: string;
    label: string;
    sub: string;
  }
> = {
  signal: {
    icon: Radio,
    ring: "border-cyan-500/60",
    text: "text-cyan-400",
    glow: "shadow-[0_0_30px_-8px_rgba(34,211,238,0.6)]",
    label: "Signal Ingestion",
    sub: "RAW INPUT",
  },

  perception: {
    icon: Eye,
    ring: "border-blue-500/60",
    text: "text-blue-400",
    glow: "shadow-[0_0_30px_-8px_rgba(96,165,250,0.6)]",
    label: "Perception",
    sub: "LAYER 2",
  },

  intelligence: {
    icon: Brain,
    ring: "border-violet-500/60",
    text: "text-violet-400",
    glow: "shadow-[0_0_30px_-8px_rgba(167,139,250,0.6)]",
    label: "Intelligence",
    sub: "NICAI",
  },

  state: {
    icon: Flag,
    ring: "border-amber-500/60",
    text: "text-amber-400",
    glow: "shadow-[0_0_30px_-8px_rgba(251,191,36,0.6)]",
    label: "State Engine",
    sub: "EXECUTION",
  },

  bucket: {
    icon: Database,
    ring: "border-emerald-500/60",
    text: "text-emerald-400",
    glow: "shadow-[0_0_30px_-8px_rgba(16,185,129,0.6)]",
    label: "Bucket",
    sub: "TRUTH STORE",
  },
};

interface Props {
  metrics: StageMetric[];
  bucketSyncPct?: number;
}

export default function PipelineFlow({
  metrics,
  bucketSyncPct = 1,
}: Props) {
  const order: StageMetric["stage"][] = [
    "signal",
    "perception",
    "intelligence",
    "state",
    "bucket",
  ];

  const map = new Map(metrics.map((m) => [m.stage, m]));

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-5 shadow-xl">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Pipeline Flow (Live)
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Signal → Perception → Intelligence → State → Bucket
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
          <Activity className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">
            LIVE PIPELINE
          </span>
        </div>
      </div>

      {/* PIPELINE */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {order.map((stageId, idx) => {
          const m = map.get(stageId);

          const def = stageStyle[stageId];
          const Icon = def.icon;

          const value =
            stageId === "bucket"
              ? `${(bucketSyncPct * 100).toFixed(0)}% Sync`
              : fmtNum(m?.total_events ?? 0);

          return (
            <div
              key={stageId}
              className="flex flex-1 items-center"
            >
              {/* STAGE CARD */}
              <div className="relative flex w-full flex-col items-center rounded-2xl border border-white/10 bg-[#111827] p-5 transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
                {/* STEP NUMBER */}
                <div
                  className={clsx(
                    "absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-black/30 bg-[#0f172a] text-xs font-bold",
                    def.text
                  )}
                >
                  {idx + 1}
                </div>

                {/* ICON */}
                <div
                  className={clsx(
                    "mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 bg-[#0b1220]",
                    def.ring,
                    def.glow
                  )}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className={def.text}
                  />
                </div>

                {/* LABEL */}
                <div className="text-center">
                  <div className="text-sm font-semibold text-white">
                    {def.label}
                  </div>

                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    {def.sub}
                  </div>

                  {/* VALUE */}
                  <div className="mt-3 font-mono text-xl font-bold text-slate-100">
                    {value}
                  </div>
                </div>
              </div>

              {/* ARROW */}
              {idx < order.length - 1 && (
                <PipeArrow color={def.text} />
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER STATUS */}
      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
        <StatusDot status="live" />

        <span className="text-sm text-slate-400">
          Pipeline Status:
        </span>

        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
          Healthy
        </span>

        <span className="ml-auto text-xs text-slate-500">
          Deterministic Runtime Active
        </span>
      </div>
    </div>
  );
}

function PipeArrow({ color }: { color: string }) {
  return (
    <div className="hidden lg:flex flex-1 items-center px-2">
      <div
        className={clsx(
          "h-[2px] flex-1 bg-gradient-to-r from-transparent via-current to-current opacity-70",
          color
        )}
      />

      <svg
        className={clsx("h-4 w-4 -ml-[2px]", color)}
        viewBox="0 0 12 12"
        fill="currentColor"
      >
        <path d="M0 1 L10 6 L0 11 Z" opacity="0.9" />
      </svg>
    </div>
  );
}