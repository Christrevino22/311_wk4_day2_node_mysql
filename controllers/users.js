const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users INNER JOIN usersContact ON users.id = usersContact.user_id", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  // we are getting the id here below
  let id = req.params.id
  // the mySQL query will go here
  let sql = "SELECT * FROM users WHERE ID = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let body = req.body
  let sql = "INSERT INTO users SET ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)

    
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  //creating a first name 
  let first_name = req.params.first_name
  // create a last name
  let last_name = req.params.last_name
  // create a id
  let id = req.params.id
  // for some reason we weren't able to update the user by ID??
  // please let me know any comments or concerns
  let sql = "UPDATE user SET first_name = ? , last_name = ? , WHERE ID = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name, last_name, id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let first_name = req.params.first_name
  let sql = "DELETE FROM users WHERE first_name = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}