import EconomicChart from "../../components/EconomicChart";
import PageHeader from "../../components/PageHeader";
import { fetchSeries } from "../../lib/fred";

export default async function InflationPage() {
  const fetchedAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const [cpiAll, cpiCore, pce, breakeven5y] = await Promise.all([
    fetchSeries("CPIAUCSL",  { observationStart: "2015-01-01" }),
    fetchSeries("CPILFESL",  { observationStart: "2015-01-01" }),
    fetchSeries("PCEPI",     { observationStart: "2015-01-01" }),
    fetchSeries("T5YIE",     { observationStart: "2015-01-01" }),
  ]);

  return (
    <>
      <PageHeader
        title="Inflation"
        subtitle="Price level indicators tracking the rate at which the general level of prices for goods and services is rising"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EconomicChart
          title="Consumer Price Index (CPI) — All Items"
          subtitle="CPI for All Urban Consumers: All Items in U.S. City Average (Index 1982-84=100)"
          data={cpiAll} yFormat="number" color="#1d4ed8"
          seriesId="CPIAUCSL" fetchedAt={fetchedAt}
          source="U.S. Bureau of Labor Statistics via FRED"
        />
        <EconomicChart
          title="Core CPI (Less Food & Energy)"
          subtitle="CPI for All Urban Consumers: All Items Less Food and Energy"
          data={cpiCore} yFormat="number" color="#dc2626"
          seriesId="CPILFESL" fetchedAt={fetchedAt}
          source="U.S. Bureau of Labor Statistics via FRED"
        />
        <EconomicChart
          title="PCE Price Index"
          subtitle="Personal Consumption Expenditures: Chain-type Price Index (Fed's preferred inflation gauge)"
          data={pce} yFormat="number" color="#16a34a"
          seriesId="PCEPI" fetchedAt={fetchedAt}
          source="U.S. Bureau of Economic Analysis via FRED"
        />
        <EconomicChart
          title="5-Year Breakeven Inflation Rate"
          subtitle="5-Year Breakeven Inflation Rate: Market-implied average inflation over the next 5 years"
          data={breakeven5y} yFormat="percent1dp" color="#ea580c"
          seriesId="T5YIE" fetchedAt={fetchedAt}
          source="Federal Reserve Bank of St. Louis via FRED"
        />
      </div>
    </>
  );
}
