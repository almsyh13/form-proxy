export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const forwardURL =
    "https://script.google.com/macros/s/AKfycbyMTmTB5eUqHpt6-grP6DiNT7w3HPzkPkLGdtbB3mjiIsB3uMY8e3mdCQXpRjtL_zobtQ/exec";

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
