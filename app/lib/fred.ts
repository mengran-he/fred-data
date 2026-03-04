const FRED_BASE = "https://api.stlouisfed.org/fred/series/observations";

export interface FredObservation {
  date: string;
  value: string;
}

export interface ChartPoint {
  date: string;
  value: number;
}

interface FredResponse {
  observations: FredObservation[];
}

export async function fetchSeries(
  seriesId: string,
  params: { observationStart?: string; frequency?: string } = {}
): Promise<ChartPoint[]> {
  const apiKey = process.env.FRED_API_KEY;
  const url = new URL(FRED_BASE);
  url.searchParams.set("series_id", seriesId);
  url.searchParams.set("api_key", apiKey!);
  url.searchParams.set("file_type", "json");
  if (params.observationStart) url.searchParams.set("observation_start", params.observationStart);
  if (params.frequency) url.searchParams.set("frequency", params.frequency);

  const res = await fetch(url.toString(), { next: { revalidate: 86400 } }); // cache 24h
  if (!res.ok) throw new Error(`FRED API error ${res.status} for ${seriesId}`);

  const json: FredResponse = await res.json();
  return json.observations
    .filter((o) => o.value !== ".")
    .map((o) => ({
      date: formatDate(o.date),
      value: parseFloat(o.value),
    }));
}

function formatDate(isoDate: string): string {
  const [year, month] = isoDate.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(month) - 1]} '${year.slice(2)}`;
}
