import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Clock3,
  Home,
  ArrowLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const NAB_RED = "#C40000";

function Pill({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function IPhoneMockup({ children }) {
  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[42px] bg-black p-[10px] shadow-2xl">
      <div className="relative min-h-[760px] overflow-hidden rounded-[34px] bg-white">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-3 z-20 h-7 w-36 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

function MobileTopBar({ title }) {
  return (
    <div className="border-b border-slate-100 bg-white px-5 pb-3 pt-14">
      <div className="grid grid-cols-3 items-center">
        <ArrowLeft className="h-5 w-5" style={{ color: NAB_RED }} />
        <h1 className="text-center text-[17px] font-bold text-slate-950">
          {title}
        </h1>
        <div />
      </div>
    </div>
  );
}

function PrimaryButton({ children }) {
  return (
    <button
      className="w-full rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-sm"
      style={{ backgroundColor: NAB_RED }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children }) {
  return (
    <button className="w-full rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-bold text-slate-900">
      {children}
    </button>
  );
}

function NationalIdScreen() {
  return (
    <IPhoneMockup>
      <MobileTopBar title="Home loan eligibility" />

      <div className="px-6 pt-8">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <Home className="h-10 w-10" style={{ color: NAB_RED }} />
          </div>

          <p className="mt-6 text-sm text-slate-500">Check your eligibility</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-950">
            In a few seconds
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Enter your National ID to run a conditional home loan eligibility
            pre-check.
          </p>
        </div>

        <div className="mt-8">
          <label className="block text-sm font-bold text-slate-900">
            National ID
          </label>
          <input
            value="079******789"
            readOnly
            className="mt-2 w-full border-b border-slate-300 bg-white px-0 py-3 text-lg font-semibold text-slate-950 outline-none focus:border-red-700"
            placeholder="Enter your National ID"
          />
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Your ID is used for verification with authorised data sources. Raw
            ID is not persisted.
          </p>
        </div>

        <div className="mt-8">
          <PrimaryButton>Check eligibility</PrimaryButton>
        </div>

        <div className="mt-8 divide-y divide-slate-100 border-t border-b border-slate-100">
          {[
            ["What we check", "Age, address, criminal record and credit score"],
            ["Expected time", "Usually under 3 seconds"],
            ["Need help?", "Contact a banker"],
          ].map(([title, sub]) => (
            <div key={title} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-bold text-slate-950">{title}</p>
                <p className="mt-1 text-xs text-slate-500">{sub}</p>
              </div>
              <ChevronRight className="h-5 w-5" style={{ color: NAB_RED }} />
            </div>
          ))}
        </div>
      </div>
    </IPhoneMockup>
  );
}

function LoadingScreen() {
  return (
    <IPhoneMockup>
      <MobileTopBar title="Checking eligibility" />

      <div className="flex min-h-[620px] flex-col items-center justify-center px-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin" style={{ color: NAB_RED }} />
        <h2 className="mt-8 text-2xl font-bold text-slate-950">
          Checking your details
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          We are verifying your eligibility. This should only take a few
          seconds.
        </p>
      </div>
    </IPhoneMockup>
  );
}

function ResultScreen({ status }) {
  const content = {
    eligible: {
      icon: <CheckCircle2 className="h-12 w-12 text-emerald-600" />,
      label: "Conditional eligibility",
      amount: "Eligible",
      title: "You can continue your application",
      body: "Based on the information checked, you may continue with your home loan journey.",
      primary: "Continue application",
      secondary: "Contact banker",
    },
    notEligible: {
      icon: <XCircle className="h-12 w-12 text-red-700" />,
      label: "Eligibility result",
      amount: "Not eligible",
      title: "You are not eligible at this time",
      body: "Based on the information checked, you do not currently meet the eligibility criteria for this pre-check.",
      primary: "Contact banker",
      secondary: "Back to home",
    },
    unable: {
      icon: <AlertTriangle className="h-12 w-12 text-amber-600" />,
      label: "Eligibility result",
      amount: "Unable to verify",
      title: "We cannot verify your eligibility now",
      body: "We are unable to complete your eligibility check at the moment. Please try again later or contact a banker.",
      primary: "Try again",
      secondary: "Contact banker",
    },
  }[status];

  return (
    <IPhoneMockup>
      <MobileTopBar title="Eligibility result" />

      <div className="px-6 pt-8 text-center">
        <div className="mx-auto flex justify-center">{content.icon}</div>
        <p className="mt-6 text-sm text-slate-500">{content.label}</p>
        <h2 className="mt-1 text-3xl font-bold text-slate-950">
          {content.amount}
        </h2>
        <p className="mt-3 text-sm font-bold leading-6 text-slate-900">
          {content.title}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{content.body}</p>

        <div className="mt-8 border-t border-b border-slate-100 py-4 text-left">
          <div className="flex justify-between py-2 text-sm">
            <span className="text-slate-500">Eligibility check ID</span>
            <span className="font-bold text-slate-950">EC-2026-000123</span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span className="text-slate-500">National ID</span>
            <span className="font-bold text-slate-950">********6789</span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <PrimaryButton>{content.primary}</PrimaryButton>
          <SecondaryButton>{content.secondary}</SecondaryButton>
        </div>
      </div>
    </IPhoneMockup>
  );
}

const rules = [
  ["Age", "PASS", "-", "NDC"],
  ["Residential Address", "PASS", "-", "NDC"],
  ["Criminal Record", "PASS", "-", "CMS"],
  ["Credit Score", "FAIL", "CREDIT_SCORE_BELOW_500", "CIC"],
];

const systems = [
  ["NDC", "SUCCESS", "850ms", "-"],
  ["CMS", "SUCCESS", "700ms", "-"],
  ["CIC", "SUCCESS", "920ms", "-"],
];

function StatusBadge({ value }) {
  if (value === "PASS" || value === "SUCCESS") {
    return <Pill tone="success">{value}</Pill>;
  }
  if (value === "FAIL") {
    return <Pill tone="danger">{value}</Pill>;
  }
  return <Pill>{value}</Pill>;
}

function BankerPortal() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-100 bg-white px-7 py-5">
        <div>
          <p
            className="text-sm font-bold uppercase tracking-wide"
            style={{ color: NAB_RED }}
          >
            Banker Portal
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            Eligibility Assessment
          </h2>
        </div>
        <div
          className="rounded-lg px-4 py-2 text-lg font-black text-white"
          style={{ backgroundColor: NAB_RED }}
        >
          NAB
        </div>
      </div>

      <div className="p-7">
        <div className="flex gap-3 border-b border-slate-100 pb-6">
          <div className="flex flex-1 items-center gap-3 border-b border-slate-300 px-1 py-3">
            <Search className="h-5 w-5" style={{ color: NAB_RED }} />
            <span className="text-sm text-slate-500">
              Search by Eligibility Check ID / masked ID reference
            </span>
          </div>
          <button
            className="rounded-xl px-6 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: NAB_RED }}
          >
            Search
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Check Summary
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Check ID</p>
                <p className="font-bold text-slate-950">EC-2026-000123</p>
              </div>
              <div>
                <p className="text-slate-500">National ID</p>
                <p className="font-bold text-slate-950">********6789</p>
              </div>
              <div>
                <p className="text-slate-500">Status</p>
                <div className="mt-1">
                  <Pill tone="danger">NOT ELIGIBLE</Pill>
                </div>
              </div>
              <div>
                <p className="text-slate-500">Response Time</p>
                <p className="font-bold text-slate-950">2.4s</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 p-4 text-white md:col-span-2">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-white/70" />
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">
                  Checked At
                </p>
                <p className="font-bold">2026-05-17 10:30</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Detailed reason codes are visible to banker/compliance users.
              Customer-facing messages remain simplified.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-950">Rule Assessment</h3>
            <div className="mt-4 overflow-hidden border-t border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-3">Rule</th>
                    <th className="py-3">Result</th>
                    <th className="py-3">Reason Code</th>
                    <th className="py-3">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((r) => (
                    <tr key={r[0]} className="border-t border-slate-100">
                      <td className="py-3 font-medium">{r[0]}</td>
                      <td className="py-3">
                        <StatusBadge value={r[1]} />
                      </td>
                      <td className="py-3 text-slate-600">{r[2]}</td>
                      <td className="py-3 text-slate-600">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-950">External System Status</h3>
            <div className="mt-4 overflow-hidden border-t border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-3">System</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Latency</th>
                    <th className="py-3">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {systems.map((s) => (
                    <tr key={s[0]} className="border-t border-slate-100">
                      <td className="py-3 font-medium">{s[0]}</td>
                      <td className="py-3">
                        <StatusBadge value={s[1]} />
                      </td>
                      <td className="py-3 text-slate-600">{s[2]}</td>
                      <td className="py-3 text-slate-600">{s[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NABHomeLendingMockup() {
  const [screen, setScreen] = useState("input");

  const screens = [
    ["input", "Input"],
    ["loading", "Loading"],
    ["eligible", "Eligible"],
    ["notEligible", "Not Eligible"],
    ["unable", "Unable to Verify"],
    ["banker", "Banker Portal"],
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: NAB_RED }}
            >
              NAB-inspired UI mock-up
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Home Loan Eligibility Check
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              Updated version with iPhone mockup, no bottom nav, and less-rounded
              controls while keeping a clean NAB-inspired banking style.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 rounded-2xl bg-white p-2 shadow-sm">
            {screens.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setScreen(key)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                  screen === key ? "text-white" : "text-slate-600 hover:bg-slate-50"
                }`}
                style={screen === key ? { backgroundColor: NAB_RED } : {}}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {screen === "input" && <NationalIdScreen />}
        {screen === "loading" && <LoadingScreen />}
        {screen === "eligible" && <ResultScreen status="eligible" />}
        {screen === "notEligible" && <ResultScreen status="notEligible" />}
        {screen === "unable" && <ResultScreen status="unable" />}
        {screen === "banker" && <BankerPortal />}
      </div>
    </div>
  );
}
