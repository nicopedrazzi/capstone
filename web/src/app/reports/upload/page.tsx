"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  async function upload() {
    if (!file) return;
    setMsg("Uploading...");

    const fd = new FormData();
    fd.append("file", file);

    try {
      await apiFetch("/reports/upload", {
        method: "POST",
        body: fd,
      });
      setMsg("Uploaded. Open /reports to view it.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Upload failed";
      setMsg(message);
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Upload</h1>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={upload} disabled={!file}>Upload</button>
      <p>{msg}</p>
    </main>
  );
}
