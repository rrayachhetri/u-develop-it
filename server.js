const mysql = require("mysql2");
const express = require("express");
const { route } = require("express/lib/application");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is eWorld, your communication is being reserved!",
    planet: "Selixicaz",
  });
});

//Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "N3p@lGHR",
    database: "election",
  },
  console.log("Connected to the election database.")
);

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });

// Get all candidates
app.get('/api/candidates', (req, res) => {
  const sql = `SELECT * FROM candidates`;


  db.query(sql, (err, rows) => {
    if(err){
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});



// GET a single candidate
app.get('/api/candidates/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  
  db.query(sql, params, (err, row) => {
    if (err) {
     res.status(400).json({ error: err.message });
     return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
  
});


//Delete a condidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 4, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a candidate
// const sql = `INSERT INTO candidates(id, first_name, last_name, industry_connected) 
//              VALUES (?,?,?,?)`;
// const params = [12, 'Ronald', 'Firbank', 1];

// db.query(sql,params, (err, result) => {
//     if(err){
//         console.log(err);
//     };
//     console.log(result);
// });

  //catchall route
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
