import EconomicChart from "../../components/EconomicChart";
import PageHeader from "../../components/PageHeader";
import { fetchSeries } from "../../lib/fred";

export default async function HousingPage() {
  const fetchedAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const [houst, cshpsa, mortgage30, mspus] = await Promise.all([
    fetchSeries("HOUST",        { observationStart: "2010-01-01" }),
    fetchSeries("CSUSHPISA",    { observationStart: "2010-01-01" }),
    fetchSeries("MORTGAGE30US", { observationStart: "2010-01-01" }),
    fetchSeries("MSPUS",        { observationStart: "2010-01-01", frequency: "q" }),
  ]);

  return (
    <>
      <PageHeader
        title="Housing"
        subtitle="Real estate market indicators covering construction activity, home prices, and mortgage rates"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EconomicChart
          title="Housing Starts — Total"
          subtitle="New Privately-Owned Housing Units Started: Total Units (Thousands of Units, SAAR)"
          data={houst} yFormat="number" color="#1d4ed8"
          seriesId="HOUST" fetchedAt={fetchedAt}
          source="U.S. Census Bureau and HUD via FRED"
        />
        <EconomicChart
          title="S&P/Case-Shiller U.S. National Home Price Index"
          subtitle="S&P CoreLogic Case-Shiller U.S. National Home Price Index (Index Jan 2000=100)"
          data={cshpsa} yFormat="number" color="#dc2626"
          seriesId="CSUSHPISA" fetchedAt={fetchedAt}
          source="S&P Dow Jones Indices LLC via FRED"
        />
        <EconomicChart
          title="30-Year Fixed Rate Mortgage Average"
          subtitle="30-Year Fixed Rate Mortgage Average in the United States — weekly average rate"
          data={mortgage30} yFormat="percent1dp" color="#16a34a"
          seriesId="MORTGAGE30US" fetchedAt={fetchedAt}
          source="Freddie Mac via FRED"
        />
        <EconomicChart
          title="Median Sales Price of Houses Sold"
          subtitle="Median Sales Price of Houses Sold for the United States (Dollars, Not Seasonally Adjusted)"
          data={mspus} yFormat="number" color="#9333ea"
          seriesId="MSPUS" fetchedAt={fetchedAt}
          source="U.S. Census Bureau and HUD via FRED"
        />
      </div>
    </>
  );
}
