"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Key Indicators",    href: "/" },
  { label: "Inflation",         href: "/inflation" },
  { label: "Employment",        href: "/employment" },
  { label: "Interest Rates",    href: "/interest-rates" },
  { label: "Economic Growth",   href: "/economic-growth" },
  { label: "Exchange Rates",    href: "/exchange-rates" },
  { label: "Housing",           href: "/housing" },
  { label: "Consumer Spending", href: "/consumer-spending" },
];

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const navIcons: Record<string, React.ReactNode> = {
  "Key Indicators": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polyline points="1,12 5,7 8,9 13,4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="10,4 13,4 13,7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Inflation": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polyline points="1,11 5,6 9,8 15,3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Employment": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="7" width="3" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="6.5" y="4" width="3" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="11" y="2" width="3" height="12" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  "Interest Rates": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polyline points="1,11 4,8 8,10 12,5 15,3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Economic Growth": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polyline points="1,13 5,9 9,7 15,3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="12,3 15,3 15,6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Exchange Rates": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 8h12M8 2c-2 2-3 4-3 6s1 4 3 6M8 2c2 2 3 4 3 6s-1 4-3 6" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  "Housing": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8L8 2l6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 6v7h3v-3h2v3h3V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Consumer Spending": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1 2h2l2 8h7l2-5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="13" r="1" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="12" cy="13" r="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: 220, minWidth: 220, borderRight: "1px solid #e5e7eb", backgroundColor: "#fff", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>FRED Indicators</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Economic Data Dashboard</div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                backgroundColor: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#fff" : "#374151",
                borderRadius: 6,
                margin: "1px 8px",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ opacity: isActive ? 1 : 0.7 }}>{navIcons[item.label]}</span>
                <span style={{ fontWeight: isActive ? 500 : 400 }}>{item.label}</span>
              </span>
              <span style={{ opacity: 0.7 }}>
                {isActive ? <ChevronDown /> : <ChevronRight />}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", fontSize: 11, color: "#9ca3af", lineHeight: 1.4 }}>
        Data provided by Federal Reserve Economic Data (FRED)
      </div>
    </aside>
  );
}
