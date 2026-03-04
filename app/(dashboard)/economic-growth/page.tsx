import EconomicChart from "../../components/EconomicChart";
import PageHeader from "../../components/PageHeader";
import { fetchSeries } from "../../lib/fred";

export default async function EconomicGrowthPage() {
  const fetchedAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const [gdpc1, indpro, umcsent, pce] = await Promise.all([
    fetchSeries("GDPC1",    { observationStart: "2010-01-01", frequency: "q" }),
    fetchSeries("INDPRO",   { observationStart: "2010-01-01" }),
    fetchSeries("UMCSENT",  { observationStart: "2010-01-01" }),
    fetchSeries("PCE",      { observationStart: "2010-01-01" }),
  ]);

  return (
    <>
      <PageHeader
        title="Economic Growth"
        subtitle="Output, production, and sentiment indicators measuring the pace and breadth of U.S. economic expansion"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EconomicChart
          title="Real GDP"
          subtitle="Real Gross Domestic Product (Billions of Chained 2017 Dollars, Seasonally Adjusted Annual Rate)"
          data={gdpc1} yFormat="number" color="#1d4ed8"
          seriesId="GDPC1" fetchedAt={fetchedAt}
          source="U.S. Bureau of Economic Analysis via FRED"
        />
        <EconomicChart
          title="Industrial Production Index"
          subtitle="Industrial Production: Total Index (Index 2017=100, Seasonally Adjusted)"
          data={indpro} yFormat="number" color="#dc2626"
          seriesId="INDPRO" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
        <EconomicChart
          title="University of Michigan: Consumer Sentiment"
          subtitle="Index of Consumer Sentiment — measures consumer confidence in the economy"
          data={umcsent} yFormat="number" color="#16a34a"
          seriesId="UMCSENT" fetchedAt={fetchedAt}
          source="University of Michigan via FRED"
        />
        <EconomicChart
          title="Personal Consumption Expenditures"
          subtitle="Personal Consumption Expenditures (Billions of Dollars, Seasonally Adjusted Annual Rate)"
          data={pce} yFormat="number" color="#ea580c"
          seriesId="PCE" fetchedAt={fetchedAt}
          source="U.S. Bureau of Economic Analysis via FRED"
        />
      </div>
    </>
  );
}
