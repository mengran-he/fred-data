import EconomicChart from "../../components/EconomicChart";
import PageHeader from "../../components/PageHeader";
import { fetchSeries } from "../../lib/fred";

export default async function InterestRatesPage() {
  const fetchedAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const [fedfunds, gs2, gs10, tb3ms] = await Promise.all([
    fetchSeries("FEDFUNDS", { observationStart: "2010-01-01" }),
    fetchSeries("GS2",      { observationStart: "2010-01-01" }),
    fetchSeries("GS10",     { observationStart: "2010-01-01" }),
    fetchSeries("TB3MS",    { observationStart: "2010-01-01" }),
  ]);

  return (
    <>
      <PageHeader
        title="Interest Rates"
        subtitle="Key interest rate benchmarks set by the Federal Reserve and U.S. Treasury markets"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EconomicChart
          title="Federal Funds Effective Rate"
          subtitle="Interest rate at which depository institutions lend reserve balances to other institutions overnight"
          data={fedfunds} yFormat="percent1dp" color="#1d4ed8"
          seriesId="FEDFUNDS" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
        <EconomicChart
          title="2-Year Treasury Constant Maturity Rate"
          subtitle="Market yield on U.S. Treasury securities at 2-year constant maturity"
          data={gs2} yFormat="percent1dp" color="#dc2626"
          seriesId="GS2" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
        <EconomicChart
          title="10-Year Treasury Constant Maturity Rate"
          subtitle="Market yield on U.S. Treasury securities at 10-year constant maturity (benchmark long-term rate)"
          data={gs10} yFormat="percent1dp" color="#16a34a"
          seriesId="GS10" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
        <EconomicChart
          title="3-Month Treasury Bill Rate"
          subtitle="3-Month Treasury Bill Secondary Market Rate, Discount Basis"
          data={tb3ms} yFormat="percent1dp" color="#9333ea"
          seriesId="TB3MS" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
      </div>
    </>
  );
}
