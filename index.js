const app = require("express")();
const PORT = 8080;
const fs = require("fs");
let taxes;
fs.readFile("taxes.json", (err, data) => {
  if (err) throw err;
  taxes = JSON.parse(data);
  console.log(taxes);
});

app.listen(PORT, () => {
  console.log("working on http://localhost:" + PORT);
});
app.get("/", (req, res) => {
  res.status(200).send({ message: "API server working" });
});

app.get("/tax/:country", (req, res) => {
  const country = req.params.country;
  const countryList = taxes.country;
  let cName = countryList.find((c) => c.name === country);
  let rate = cName.taxRate;
  res.status(200).send({ taxRate: rate });
});

app.get("/tax", (req, res) => {
  res.status(200).send(taxes.country);
});
