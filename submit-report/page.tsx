'use client';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Client-side only components
const ClientOnlyGradient = dynamic(
  () => import("@/components/ClientOnlyGradient").then(mod => mod.default),
  { ssr: false }
);

      <main className="relative px-6 pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <SecureBadge />
            
            <h1 className="mt-8 bg-white bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Submit Anonymous Report
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Your safety is our priority. All submissions are encrypted and
              anonymized.
            </p>
          </div>

          <div className="mt-16 bg-zinc-900/50 rounded-2xl border border-white/5 p-6">
            <ReportWizard />
          </div>
        </div>
      </main>
    </div>
  );
}