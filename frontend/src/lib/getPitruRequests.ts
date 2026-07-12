export async function getPitruRequests() {
  const res = await fetch("http://localhost:5000/api/pitrumoksha", {
    cache: "no-store",
  });

  return res.json();
}