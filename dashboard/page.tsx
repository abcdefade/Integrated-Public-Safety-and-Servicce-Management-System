"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus | "ALL">("ALL");
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-neutral-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-white bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-6">
              <span className="text-neutral-400">
                {session?.user?.name || "Admin"}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-900 rounded-lg hover:bg-neutral-800 border border-neutral-800 transition-all hover:border-neutral-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as ReportStatus | "ALL")}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500/20 focus:border-green-600/30 transition-all"
            >
              <option value="ALL">All Statuses</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ReportType | "ALL")}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500/20 focus:border-green-500/20 transition-all"
            >
              <option value="ALL">All Types</option>
              {Object.values(ReportType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="text-neutral-400">
            {filteredReports.length} Reports
          </div>
        </div>

        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-neutral-700 transition-all group"
            >
                  <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                      </div>
                      {report.type}
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                      </div>
                      {report.location || "N/A"}
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                      </div>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {report.image && (
                    <div className="mt-4 relative w-full h-48 rounded-lg border border-neutral-800 overflow-hidden">
                      <Image
                        src={report.image}
                        alt="Report evidence"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>

                <select
                  value={report.status}
                  onChange={(e) => updateReportStatus(report.id, e.target.value as ReportStatus)}
                  className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:border-green-600 hover:border-neutral-700 transition-colors"
                >
                  {Object.values(ReportStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-neutral-500 bg-neutral-900/50 rounded-xl border border-neutral-800">
              No reports found matching the selected filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}