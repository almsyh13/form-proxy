export default async function handler(req, res) {
  if (req.method === "POST") {
    const scriptURL = "https://script.google.com/macros/s/PASTE_URL_KAMU/exec"; // ganti

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(req.body).toString(),
      });

      const data = await response.text();
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    } catch (err) {
      res
        .status(500)
        .json({
          error: "Gagal mengirim ke Google Script",
          detail: err.message,
        });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
