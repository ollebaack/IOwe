// Create a fetcher function for SWR
export async function fetcher(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
}
