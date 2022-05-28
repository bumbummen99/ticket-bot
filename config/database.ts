import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  // Default connection
  connection: Env.get('DB_CONNECTION'),

  // List of available connections
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: Env.get('MySQL_HOST'),
        port: Env.get('MySQL_PORT'),
        user: Env.get('MySQL_USER'),
        password: Env.get('MySQL_PASSWORD', ''),
        database: Env.get('MySQL_DB_NAME'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  }
}

export default databaseConfig
