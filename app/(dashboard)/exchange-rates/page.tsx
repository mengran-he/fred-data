import EconomicChart from "../../components/EconomicChart";
import PageHeader from "../../components/PageHeader";
import { fetchSeries } from "../../lib/fred";

export default async function ExchangeRatesPage() {
  const fetchedAt = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const [usdeur, usdjpy, usdgbp, usdcny] = await Promise.all([
    fetchSeries("DEXUSEU", { observationStart: "2015-01-01" }),
    fetchSeries("DEXJPUS", { observationStart: "2015-01-01" }),
    fetchSeries("DEXUSUK", { observationStart: "2015-01-01" }),
    fetchSeries("DEXCHUS", { observationStart: "2015-01-01" }),
  ]);

  return (
    <>
      <PageHeader
        title="Exchange Rates"
        subtitle="U.S. Dollar exchange rates against major world currencies — daily rates from the Federal Reserve"
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <EconomicChart
          title="USD / Euro (EUR)"
          subtitle="U.S. Dollars to One Euro — spot exchange rate"
          data={usdeur} yFormat="number2dp" color="#1d4ed8"
          seriesId="DEXUSEU" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
        <EconomicChart
          title="Japanese Yen (JPY) / USD"
          subtitle="Japanese Yen to One U.S. Dollar — spot exchange rate"
          data={usdjpy} yFormat="number" color="#dc2626"
          seriesId="DEXJPUS" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
        <EconomicChart
          title="USD / British Pound (GBP)"
          subtitle="U.S. Dollars to One British Pound — spot exchange rate"
          data={usdgbp} yFormat="number2dp" color="#16a34a"
          seriesId="DEXUSUK" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
        <EconomicChart
          title="Chinese Yuan (CNY) / USD"
          subtitle="Chinese Yuan Renminbi to One U.S. Dollar — spot exchange rate"
          data={usdcny} yFormat="number2dp" color="#9333ea"
          seriesId="DEXCHUS" fetchedAt={fetchedAt}
          source="Board of Governors of the Federal Reserve System via FRED"
        />
      </div>
    </>
  );
}
