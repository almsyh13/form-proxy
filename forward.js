export default async function handler(req, res) {
  // CORS setup
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyMTmTB5eUqHpt6-grP6DiNT7w3HPzkPkLGdtbB3mjiIsB3uMY8e3mdCQXpRjtL_zobtQ/exec"; // ganti

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(req.body).toString(),
      });

      const data = await response.text();
      return res.status(200).send(data);
    } catch (error) {
      return res.status(500).json({
        error: "Gagal mengirim ke Google Script",
        detail: error.message,
      });
    }
  } else {
    return res.status(405).send("Method Not Allowed");
  }
}
