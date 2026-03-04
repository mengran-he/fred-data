export default function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
        {title}
      </h1>
      <p style={{ fontSize: 14, color: "#6b7280", marginTop: 6 }}>{subtitle}</p>
    </div>
  );
}
