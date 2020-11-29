const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: 'host',
        user: 'root',
        password: 'password',
        database: 'admin'
        //came back and took off my Database info let me know if nay issues
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;