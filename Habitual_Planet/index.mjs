// const csvparse = require("csv-parse");
import { parse } from "csv-parse";

// Now you can use the `parse` function in your code

import fs from "fs";
//const fs = require("fs");

const result = [];
const habitutalPlanet = [];
function isavailableplanet(planet) {
  return (
    planet["koi_disposition"] == "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
fs.createReadStream("./cumulative_2023.09.08_10.33.31.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isavailableplanet(data)) {
      habitutalPlanet.push(data);
    }
    result.push(data);
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(
      habitutalPlanet.map((data) => {
        return data["kepler_name"];
      })
    );
    console.log(`${habitutalPlanet.length} is found for habitat`);
  });
//parse();
