const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const mysql = require("mysql2");
const express = require("express");
const { route } = require("express/lib/application");
const inputCheck = require("./utils/inputCheck");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('./api', apiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "This is eWorld, your communication is being reserved!",
    planet: "Selixicaz",
  });
});



// GET all parties
app.get('/api/parties', (req, res) => {
  const sql = `SELECT * FROM parties`;
  db.query(sql, (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});


// get a single party
app.get('/api/party/:id', (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if(err){
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Delete a party
app.delete('/api/party/:id', (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if(err){
      res.status(400).json({ error: err.message });
      // Checks if anything was deleted.
    } else if(!result.affectedRows) {
      res.json({
        message: 'Party not found'
      });
    } else {
      res.json({
        message: 'deleted successfully!',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});


//catchall route
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

db.connect(err => {
  if(err) throw err;
  console.log('Database connected.')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

