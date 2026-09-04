import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "[]", "utf-8");
  }
}

export async function readLeads() {
  await ensureStore();
  const raw = await fs.readFile(LEADS_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function appendLead(lead) {
  const leads = await readLeads();
  leads.push(lead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  return lead;
}
