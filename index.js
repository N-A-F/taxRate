const app = require("express")();
const PORT = 8080;
const fs = require("fs");
let taxes;
fs.readFile("taxes.json", (err, data) => {
  if (err) throw err;
  taxes = JSON.parse(data);
  console.log(taxes);
});

app.listen(PORT, () => console.log("working on port " + PORT));

app.get("/tax", (req, res) => {
  res.status(200).send({
    taxRate: 0.15,
  });
});

app.get("/tax/:country", (req, res) => {
  const x = req.params;
  const country = x.country;
  const list = taxes.country;
  let obj = list.find((c) => c.name === country);
  let rate = obj.taxRate;
  res.status(200).send({ taxRate: rate });
});
