import EconomicChart from "../../components/EconomicChart";
import PageHeader from "../../components/PageHeader";
import { fetchSeries } from "../../lib/fred";

export default async function EmploymentPage() {
  const fetchedAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const [unrate, u6, payems, icsa] = await Promise.all([
    fetchSeries("UNRATE",  { observationStart: "2010-01-01" }),
    fetchSeries("U6RATE",  { observationStart: "2010-01-01" }),
    fetchSeries("PAYEMS",  { observationStart: "2010-01-01" }),
    fetchSeries("ICSA",    { observationStart: "2018-01-01" }),
  ]);

  return (
    <>
      <PageHeader
        title="Employment"
        subtitle="Labor market indicators measuring the health of employment conditions across the United States"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EconomicChart
          title="Unemployment Rate (U-3)"
          subtitle="Unemployment Rate: Persons unemployed as a share of the civilian labor force"
          data={unrate} yFormat="percent1dp" color="#1d4ed8"
          seriesId="UNRATE" fetchedAt={fetchedAt}
          source="U.S. Bureau of Labor Statistics via FRED"
        />
        <EconomicChart
          title="U-6 Underemployment Rate"
          subtitle="Total unemployed, plus all persons marginally attached to the labor force, plus total employed part time for economic reasons"
          data={u6} yFormat="percent1dp" color="#dc2626"
          seriesId="U6RATE" fetchedAt={fetchedAt}
          source="U.S. Bureau of Labor Statistics via FRED"
        />
        <EconomicChart
          title="Total Nonfarm Payrolls"
          subtitle="All Employees, Total Nonfarm (Thousands of Persons, Seasonally Adjusted)"
          data={payems} yFormat="number" color="#16a34a"
          seriesId="PAYEMS" fetchedAt={fetchedAt}
          source="U.S. Bureau of Labor Statistics via FRED"
        />
        <EconomicChart
          title="Initial Jobless Claims"
          subtitle="Initial Claims (Seasonally Adjusted) — Weekly new unemployment insurance filings"
          data={icsa} yFormat="number" color="#9333ea"
          seriesId="ICSA" fetchedAt={fetchedAt}
          source="U.S. Employment and Training Administration via FRED"
        />
      </div>
    </>
  );
}
