import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { seedDatabaseIfNeeded } from "./services/erpRepository.js";
import { seedWorkspaceDataIfNeeded } from "./services/erpWorkspaceRepository.js";

dotenv.config();

const port = process.env.PORT || 5000;

async function startServer() {
  await connectDatabase();
  await seedDatabaseIfNeeded();
  await seedWorkspaceDataIfNeeded();

  app.listen(port, () => {
    console.log(`ERP backend listening on port ${port}.`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
