const { open } = require('sqlite')
const sqlite3 = require('sqlite3')

const initDatabase = async () => {
    return await open({
        filename: './mainDB.db',
        driver: sqlite3.cached.Database
    })
}

module.exports = initDatabase;