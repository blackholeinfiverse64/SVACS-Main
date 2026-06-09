import { AlertTriangle } from "lucide-react";
import type { Alert } from "@/domain/types";
import { fmtUtc } from "@/lib/time";
import SeverityChip from "@/components/primitives/SeverityChip";
import clsx from "clsx";

const sevColor = (s?: string) => {
  if (!s) return "text-info";

  if (s === "CRITICAL" || s === "HIGH") {
    return "text-err";
  }

  if (s === "MEDIUM") {
    return "text-warn";
  }

  return "text-info";
};

export default function AlertSummary({
  alerts,
}: {
  alerts: Alert[];
}) {
  return (
    <ul className="divide-y divide-line/60">
      {alerts.length === 0 ? (
        <li className="px-4 py-6 text-center text-sm text-fg-2">
          No active alerts
        </li>
      ) : (
        alerts.map((a, idx) => (
          <li
            key={a.id || idx}
            className="grid grid-cols-[1rem_4.5rem_4.5rem_minmax(0,1fr)_auto] items-center gap-x-3 px-4 py-2.5 transition-colors hover:bg-bg-2/40"
          >
            <AlertTriangle
              size={14}
              className={clsx("shrink-0", sevColor(a.severity))}
            />

            <span className="font-mono text-xs tabular-nums text-fg-1">
              {a.ts_utc
                ? fmtUtc(a.ts_utc)
                : a.timestamp
                  ? fmtUtc(a.timestamp)
                  : "N/A"}
            </span>

            <span className="truncate font-mono text-xs text-fg-0">
              {a.vessel_id || "UNKNOWN"}
            </span>

            <span className="truncate text-xs text-fg-1">
              {a.kind || a.title || "Alert Triggered"}
            </span>

            <SeverityChip severity={a.severity || "LOW"} />
          </li>
        ))
      )}
    </ul>
  );
}