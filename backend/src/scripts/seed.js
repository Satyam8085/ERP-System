import dotenv from "dotenv";
import { connectDatabase } from "../config/db.js";
import { seedDatabaseIfNeeded } from "../services/erpRepository.js";
import { seedWorkspaceDataIfNeeded } from "../services/erpWorkspaceRepository.js";

dotenv.config();

async function run() {
  const connection = await connectDatabase();

  if (!connection.connected) {
    console.log("Seed skipped because MongoDB is not connected.");
    return;
  }

  await seedDatabaseIfNeeded();
  await seedWorkspaceDataIfNeeded();
  console.log("Seed completed.");
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
