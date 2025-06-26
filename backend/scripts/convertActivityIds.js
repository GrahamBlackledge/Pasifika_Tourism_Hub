// backend/scripts/convertActivityIds.js
const path      = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),   //  ← absolute path to root .env
});

const mongoose = require("mongoose");
const Country  = require("../models/Country");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected");

  const countries = await Country.find({});
  for (const c of countries) {
    let touched = false;

    c.exploration.activities.forEach(a => {
      if (typeof a._id !== "string") {
        a._id = a._id.toString();
        touched = true;
      }
    });

    if (touched) {
      await c.save();
      console.log(`✔ updated "${c.slug}"`);
    }
  }

  await mongoose.disconnect();
  console.log("Done");
  process.exit(0);
})();
