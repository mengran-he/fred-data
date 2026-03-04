import EconomicChart from "../components/EconomicChart";
import PageHeader from "../components/PageHeader";
import { fetchSeries } from "../lib/fred";

export default async function KeyIndicatorsPage() {
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const start5y = fiveYearsAgo.toISOString().slice(0, 10);
  const fetchedAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const [cpiData, unemploymentData, bondYield10YData, tbill3MonthData] = await Promise.all([
    fetchSeries("CPIAUCSL", { observationStart: start5y }),
    fetchSeries("UNRATE",   { observationStart: "2010-01-01" }),
    fetchSeries("GS10",     { observationStart: "2014-01-01" }),
    fetchSeries("TB3MS",    { observationStart: "2014-01-01" }),
  ]);

  return (
    <>
      <PageHeader
        title="Economic Indicators Dashboard"
        subtitle="Real-time economic data from the Federal Reserve Economic Data (FRED) system"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EconomicChart
          title="CPI - Last Five Years"
          subtitle="Consumer Price Index for All Urban Consumers: All Items in U.S. City Average"
          data={cpiData} yFormat="number" color="#1d4ed8"
          seriesId="CPIAUCSL" fetchedAt={fetchedAt}
          source="U.S. Bureau of Labor Statistics via FRED"
        />
        <EconomicChart
          title="Unemployment Rate"
          subtitle="Unemployment Rate: Aged 15-74: All Persons for the United States"
          data={unemploymentData} yFormat="percent1dp" color="#dc2626"
          seriesId="UNRATE" fetchedAt={fetchedAt}
          source="U.S. Bureau of Labor Statistics via FRED"
        />
        <EconomicChart
          title="10-Year Treasury Yield"
          subtitle="Long-Term Government Bond Yields: 10-Year: Main (Including Benchmark) for United States"
          data={bondYield10YData} yFormat="percent1dp" color="#16a34a"
          seriesId="GS10" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
        <EconomicChart
          title="3-Month Treasury Bill Rate"
          subtitle="3-Month Treasury Bill Secondary Market Rate, Discount Basis"
          data={tbill3MonthData} yFormat="percent1dp" color="#9333ea"
          seriesId="TB3MS" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
      </div>
    </>
  );
}
