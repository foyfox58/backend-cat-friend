// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres:Tyuwer58@localhost:5432/cat-friend",
});

export default connectionPool;