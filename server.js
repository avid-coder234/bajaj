const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const FULL_NAME = "aditya_dewangan"; 
const DOB_DDMMYYYY = "23042004"; 
const EMAIL = "imailaditya.dewangan@gmail.com";
const ROLL = "22BCE1500";

const isNumberStr = (s) => /^-?\d+$/.test(s);
const isAlphaStr  = (s) => /^[A-Za-z]+$/.test(s);

function alternatingCapsReversed(letters) {
  const rev = letters.slice().reverse();
  return rev.map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())).join("");
}

app.get("/bfhl", (req, res) => {
  res.json({
    operation_code: 1,
    message: "This is the BFHL API. Please send a POST request with JSON body to use it."
  });
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body?.data;
    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
        email: EMAIL,
        roll_number: ROLL,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    let letterChars = [];

    for (const token of data) {
      const s = String(token); 
      if (isNumberStr(s)) {
        const n = parseInt(s, 10);
        sum += n;
        if (Math.abs(n) % 2 === 0) even_numbers.push(String(n));
        else odd_numbers.push(String(n));
      } else if (isAlphaStr(s)) {
        alphabets.push(s.toUpperCase());
        for (const ch of s) if (/[A-Za-z]/.test(ch)) letterChars.push(ch);
      } else {
        special_characters.push(s);
      }
    }

    const concat_string = alternatingCapsReversed(letterChars);

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),          
      concat_string
    });
  } catch (e) {
    return res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
