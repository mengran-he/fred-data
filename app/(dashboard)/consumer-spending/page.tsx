import EconomicChart from "../../components/EconomicChart";
import PageHeader from "../../components/PageHeader";
import { fetchSeries } from "../../lib/fred";

export default async function ConsumerSpendingPage() {
  const fetchedAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const [pce, rsafs, psavert, umcsent] = await Promise.all([
    fetchSeries("PCE",      { observationStart: "2010-01-01" }),
    fetchSeries("RSAFS",    { observationStart: "2010-01-01" }),
    fetchSeries("PSAVERT",  { observationStart: "2010-01-01" }),
    fetchSeries("UMCSENT",  { observationStart: "2010-01-01" }),
  ]);

  return (
    <>
      <PageHeader
        title="Consumer Spending"
        subtitle="Household spending, retail activity, and saving behavior — the largest component of U.S. GDP"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EconomicChart
          title="Personal Consumption Expenditures"
          subtitle="PCE: Total household spending on goods and services (Billions of Dollars, SAAR)"
          data={pce} yFormat="number" color="#1d4ed8"
          seriesId="PCE" fetchedAt={fetchedAt}
          source="U.S. Bureau of Economic Analysis via FRED"
        />
        <EconomicChart
          title="Advance Retail Sales"
          subtitle="Advance Retail Sales: Retail and Food Services, Total (Millions of Dollars, Seasonally Adjusted)"
          data={rsafs} yFormat="number" color="#dc2626"
          seriesId="RSAFS" fetchedAt={fetchedAt}
          source="U.S. Census Bureau via FRED"
        />
        <EconomicChart
          title="Personal Saving Rate"
          subtitle="Personal Saving as a Percentage of Disposable Personal Income"
          data={psavert} yFormat="percent1dp" color="#16a34a"
          seriesId="PSAVERT" fetchedAt={fetchedAt}
          source="U.S. Bureau of Economic Analysis via FRED"
        />
        <EconomicChart
          title="University of Michigan: Consumer Sentiment"
          subtitle="Index of Consumer Sentiment — leading indicator of household spending intentions"
          data={umcsent} yFormat="number" color="#ea580c"
          seriesId="UMCSENT" fetchedAt={fetchedAt}
          source="University of Michigan via FRED"
        />
      </div>
    </>
  );
}
