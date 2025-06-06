export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // <- penting
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight check
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const forwardURL =
    "https://script.google.com/macros/s/AKfycbyX1ykfZN1A4NzAZGRFyIWhgi2ScQheRvsq-wOUl9z5tfUnwPE0BVs732l2AxL9LOf8KA/exec";

  try {
    const response = await fetch(forwardURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(req.body).toString(),
    });

    const result = await response.text();
    return res.status(200).send(result);
  } catch (err) {
    console.error("Proxy Error:", err);
    return res.status(500).send("Internal Server Error");
  }
}
