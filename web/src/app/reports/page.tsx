"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type ReportItem = {
  id: number;
  addedAt: string;
  pagesNum: number;
  isAnonymized: boolean;
};

type MineResponse = {
  reports: ReportItem[];
};

type ReportInfo = Record<string, unknown>;

export default function ReportPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [info, setInfo] = useState<ReportInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [infoErr, setInfoErr] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/reports/mine")
      .then((result) => {
        const payload = result as MineResponse;
        setReports(payload.reports ?? []);
      })
      .catch((error: unknown) =>
        setErr(error instanceof Error ? error.message : "Failed to load reports")
      )
      .finally(() => setLoading(false));
  }, []);

  async function onSelectReport(reportId: number) {
    setSelectedId(reportId);
    setLoadingInfo(true);
    setInfo(null);
    setInfoErr(null);

    try {
      const result = await apiFetch(`/reports/${reportId}/info`);
      setInfo(result as ReportInfo);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to load report info";
      setInfoErr(message);
    } finally {
      setLoadingInfo(false);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Reports</h1>
      {err && <p style={{ color: "red" }}>{err}</p>}
      {loading && <p>Loading reports...</p>}
      {!loading && reports.length === 0 && <p>No reports found.</p>}
      {reports.length > 0 && (
        <ul style={{ display: "grid", gap: 8, marginTop: 12 }}>
          {reports.map((report) => (
            <li key={report.id}>
              <button type="button" onClick={() => onSelectReport(report.id)}>
                Report #{report.id} | {report.pagesNum} page(s) | {report.isAnonymized ? "anonymized" : "raw"}
              </button>
            </li>
          ))}
        </ul>
      )}

      <section style={{ marginTop: 20 }}>
        {selectedId !== null && <h2>Report #{selectedId} info</h2>}
        {loadingInfo && <p>Loading report info...</p>}
        {infoErr && <p style={{ color: "red" }}>{infoErr}</p>}
        {info && <pre>{JSON.stringify(info, null, 2)}</pre>}
      </section>
    </main>
  );
}
