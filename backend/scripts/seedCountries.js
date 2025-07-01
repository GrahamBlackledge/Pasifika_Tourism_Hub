require("dotenv").config();

console.log("Loaded MONGO_URI:", process.env.MONGO_URI); // ← debug

const mongoose = require("mongoose");
const Country  = require("../models/Country");
const data     = require("../seed/countries.json");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Country.deleteMany();      // wipe old rows if any
  await Country.insertMany(data);  // bulk insert
  console.log("Seeded", data.length, "countries");
  process.exit();
})();
