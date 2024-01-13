import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const apiKey = "jOnabsbG4FzDV5jNz4NqsKadvjbMQxooFtaMUiy5";

app.get("/:date?", async (req, res) => {
  try {
    let date = req.params.date || '';
    const apiUrl = date
      ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
      : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const result = await axios.get(apiUrl);

    const newdata = {
      title: result.data.title,
      date: result.data.date,
      url: result.data.url,
      explanation: result.data.explanation,
    };

    res.render("index.ejs", {
      title: newdata.title,
      url: newdata.url,
      date: newdata.date,
      explanation:newdata.explanation,
    });
  } catch (error) {
    console.error("Error fetching data from NASA API:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
