export const generateDotenv = (answers) => {
  let mongoConfig = '';
  let pgConfig = '';
  let sqlite3Config = '';
  let mysqlConfig = '';

  // Mongo
  if (answers.database.toLowerCase() === 'mongodb') {
    mongoConfig = `
dbURL=mymongo
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB=mymongo`;
  }

  // PG
  if (answers.database.toLowerCase() === 'pg') {
    pgConfig = `
PG_HOST=localhost
PG_PORT=5432
PG_USER=pg-user
PG_PASSWORD=change-this-password
PG_DATABASE=pg-db`;
  }

  // Sqlite3
  if (answers.database.toLowerCase() === 'sqlite3') {
    sqlite3Config = `
SQLITE_DB_PATH=database.db`;
  }

  // Mysql
  if (answers.database.toLowerCase() === 'mysql') {
    mysqlConfig = `
MYSQL_HOST=<your_mysql_host>
MYSQL_PORT=<your_mysql_port>
MYSQL_USER=<your_mysql_username>
MYSQL_PASSWORD=<your_mysql_password>
MYSQL_DATABASE=<your_mysql_database>`;
  }

  return `PORT=3000${mongoConfig}${sqlite3Config}${pgConfig}${mysqlConfig}`;
};
