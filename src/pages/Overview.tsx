import { useQuery } from "@tanstack/react-query";

import {
  Radio,
  Eye,
  Brain,
  Flag,
  Ship,
  AlertTriangle,
  Activity,
} from "lucide-react";

import { Link } from "react-router-dom";

import { adapter } from "@/api/adapter";

import KPICard from "@/components/kpi/KPICard";
import Panel from "@/components/primitives/Panel";

import PipelineFlow from "@/components/pipeline/PipelineFlow";

import EventsOverTime from "@/components/charts/EventsOverTime";
import ValidationDonut from "@/components/charts/ValidationDonut";
import BucketSyncDonut from "@/components/charts/BucketSyncDonut";

import TopVesselsTable from "@/components/tables/TopVesselsTable";
import RecentStateTable from "@/components/tables/RecentStateTable";

import AlertSummary from "@/components/alerts/AlertSummary";

/* =========================
   NEW SVACS CARDS
========================= */

import MaritimeIntelligenceCard from "@/components/MaritimeIntelligenceCard";
import SensorFusionCard from "@/components/SensorFusionCard";
import KnowledgeLineageCard from "@/components/KnowledgeLineageCard";
import TTGCard from "@/components/TTGCard";

export default function Overview() {
  /* =======================================================
     QUERIES
  ======================================================= */

  const stageQ = useQuery({
    queryKey: ["stages"],
    queryFn: () => adapter.fetchStageMetrics(),
    refetchInterval: 4000,
  });

  const eotQ = useQuery({
    queryKey: ["events-over-time"],
    queryFn: () => adapter.fetchEventsOverTime(),
    refetchInterval: 8000,
  });

  const valQ = useQuery({
    queryKey: ["validation"],
    queryFn: () => adapter.fetchValidationBreakdown(),
    refetchInterval: 6000,
  });

  const vesselsQ = useQuery({
    queryKey: ["vessels"],
    queryFn: () => adapter.fetchVessels(),
    refetchInterval: 6000,
  });

  const stateQ = useQuery({
    queryKey: ["state-events"],
    queryFn: () => adapter.fetchStateEvents(),
    refetchInterval: 4000,
  });

  const alertsQ = useQuery({
    queryKey: ["alerts"],
    queryFn: () => adapter.fetchAlerts(),
    refetchInterval: 4000,
  });

  const bucketQ = useQuery({
    queryKey: ["bucket-status"],
    queryFn: () => adapter.fetchBucketStatus(),
    refetchInterval: 6000,
  });

  /* =======================================================
     HELPERS
  ======================================================= */

  const metric = (stage: string) =>
    stageQ.data?.find((s: any) => s.stage === stage);

  const activeAlerts =
    alertsQ.data?.filter((a: any) => !a.acknowledged).length ?? 0;

  const activeVessels = vesselsQ.data?.length ?? 0;

  /* =======================================================
     EVENTS OVER TIME SAFE FORMAT
  ======================================================= */

  const chartData =
    eotQ.data?.map((x: any) => ({
      ts: x.ts ?? x.label,
      label: x.label ?? "",
      signal: Number(x.signal ?? 0),
      perception: Number(x.perception ?? 0),
      intelligence: Number(x.intelligence ?? 0),
      state: Number(x.state ?? 0),
    })) ?? [];

  /* =======================================================
     LOADING
  ======================================================= */

  if (stageQ.isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0f172a] px-5 py-4 shadow-xl">
          <Activity className="h-5 w-5 animate-pulse text-cyan-400" />

          <span className="text-sm text-slate-300">
            Initializing SVACS Runtime...
          </span>
        </div>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-5">

      {/* =======================================================
          KPI SECTION
      ======================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">

        <KPICard
          label="Total Signal Chunks"
          value={(metric("signal")?.total_events ?? 0).toLocaleString()}
          delta={{
            kind: "up",
            text: "8.7% vs yesterday",
          }}
          icon={<Radio size={16} />}
          accent="cyan"
        />

        <KPICard
          label="Perception Events"
          value={(metric("perception")?.total_events ?? 0).toLocaleString()}
          delta={{
            kind: "up",
            text: "8.3% vs yesterday",
          }}
          icon={<Eye size={16} />}
          accent="green"
        />

        <KPICard
          label="Intelligence Events"
          value={(metric("intelligence")?.total_events ?? 0).toLocaleString()}
          delta={{
            kind: "up",
            text: "7.9% vs yesterday",
          }}
          icon={<Brain size={16} />}
          accent="violet"
        />

        <KPICard
          label="State Events"
          value={(metric("state")?.total_events ?? 0).toLocaleString()}
          delta={{
            kind: "up",
            text: "7.4% vs yesterday",
          }}
          icon={<Flag size={16} />}
          accent="amber"
        />

        <KPICard
          label="Active Vessels"
          value={String(activeVessels)}
          delta={{
            kind: "flat",
            text: "No change",
          }}
          icon={<Ship size={16} />}
          accent="info"
        />

        <KPICard
          label="Alerts (Today)"
          value={String(activeAlerts)}
          delta={{
            kind: "up",
            text: "2 vs yesterday",
          }}
          icon={<AlertTriangle size={16} />}
          accent="rose"
        />
      </div>

      {/* =======================================================
          PIPELINE + CHARTS
      ======================================================= */}

      <div className="grid grid-cols-12 gap-4">

        {/* PIPELINE */}

        <Panel
          title="Pipeline Flow (Live)"
          className="col-span-12 xl:col-span-5"
          bodyClassName="p-4"
        >
          <PipelineFlow
            metrics={stageQ.data ?? []}
            bucketSyncPct={bucketQ.data?.sync_percent ?? 1}
          />
        </Panel>

        {/* EVENTS OVER TIME */}

        <Panel
          title="Events Over Time (All Stages)"
          className="col-span-12 xl:col-span-4"
        >
          {chartData.length > 0 ? (
            <EventsOverTime data={chartData} />
          ) : (
            <EmptyState text="No event timeline data available." />
          )}
        </Panel>

        {/* VALIDATION */}

        <Panel
          title="Validation Status (NICAI)"
          className="col-span-12 xl:col-span-3"
        >
          {valQ.data ? (
            <ValidationDonut
              total={Number(valQ.data.total ?? 0)}
              allow={Number(valQ.data.allow ?? 0)}
              flag={Number(valQ.data.flag ?? 0)}
              deny={Number(valQ.data.deny ?? 0)}
            />
          ) : (
            <EmptyState text="Validation metrics unavailable." />
          )}
        </Panel>
      </div>

      {/* =======================================================
          TABLES + ALERTS
      ======================================================= */}

      <div className="grid grid-cols-12 gap-4">

        {/* TOP VESSELS */}

        <Panel
          title="Top Vessels (By Events)"
          className="col-span-12 xl:col-span-4"
          noPad
          right={
            <Link
              to="/vessels"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              View all vessels →
            </Link>
          }
        >
          <TopVesselsTable rows={(vesselsQ.data ?? []).slice(0, 5)} />
        </Panel>

        {/* RECENT STATE */}

        <Panel
          title="Recent State Outputs"
          className="col-span-12 xl:col-span-3"
          noPad
          right={
            <Link
              to="/state"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              View all state events →
            </Link>
          }
        >
          <RecentStateTable rows={(stateQ.data ?? []).slice(0, 5)} />
        </Panel>

        {/* BUCKET */}

        <Panel
          title="Bucket Sync Status"
          className="col-span-12 xl:col-span-2"
        >
          {bucketQ.data ? (
            <BucketSyncDonut status={bucketQ.data} />
          ) : (
            <EmptyState text="Bucket status unavailable." />
          )}
        </Panel>

        {/* ALERTS */}

        <Panel
          title="Alert Summary"
          className="col-span-12 xl:col-span-3"
          noPad
          right={
            <Link
              to="/alerts"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              View all alerts →
            </Link>
          }
        >
          <AlertSummary alerts={(alertsQ.data ?? []).slice(0, 5)} />
        </Panel>
      </div>

      {/* =======================================================
          NEW SVACS CARDS
      ======================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <MaritimeIntelligenceCard />

        <SensorFusionCard />

        <KnowledgeLineageCard />

        <TTGCard />

      </div>
    </div>
  );
}

/* =======================================================
   EMPTY STATE
======================================================= */

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex h-[220px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0b1220]">
      <span className="text-sm text-slate-500">
        {text}
      </span>
    </div>
  );
}