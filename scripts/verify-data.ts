/**
 * Data integrity checks for providers.json vs editorial rules.
 * Run: npm run verify-data
 */
import fs from "node:fs";
import path from "node:path";
import type { Provider } from "../src/lib/types";

const root = process.cwd();
const providersPath = path.join(root, "src/data/providers.json");
const auditsPath = path.join(root, "src/data/audits.json");

function hasContactPath(p: Provider): boolean {
  const phone = p.phone?.trim();
  const wa = p.whatsapp?.trim();
  const web = p.website?.trim();
  const maps = p.googleMapsUrl?.trim();
  return !!(phone || wa || web || maps);
}

function findAudit(name: string, audits: { businessName: string }[]): boolean {
  const n = name.toLowerCase().trim();
  const exact = audits.some((a) => a.businessName.toLowerCase().trim() === n);
  if (exact) return true;
  const core = (s: string) => s.toLowerCase().replace(/\(.*?\)/g, "").trim();
  const pc = core(name);
  if (audits.some((a) => core(a.businessName) === pc)) return true;
  return audits.some((a) => {
    const an = a.businessName.toLowerCase().trim();
    return (n.length >= 8 && an.startsWith(n)) || (an.length >= 8 && n.startsWith(an));
  });
}

function main() {
  const providers = JSON.parse(fs.readFileSync(providersPath, "utf8")) as Provider[];
  const audits = JSON.parse(fs.readFileSync(auditsPath, "utf8")) as { businessName: string }[];

  const emptyPhone = providers.filter((p) => !p.phone?.trim());
  const weak = providers.filter((p) => p.trustVerdict === "weak");
  const onboardedNoContact = providers.filter((p) => p.isOnboarded && !hasContactPath(p));
  const missingAudit = providers.filter((p) => !findAudit(p.name, audits));

  console.log("=== Happy Tails verify-data ===\n");
  console.log(`Providers total:     ${providers.length}`);
  console.log(`audits.json rows:      ${audits.length}`);
  console.log(`Empty phone field:     ${emptyPhone.length} (use Maps/Practo — see FAQ)`);
  console.log(`trustVerdict weak:     ${weak.length}`);
  console.log(`No audits.json match:  ${missingAudit.length} (deep-dive writeups; trust text lives on listing)`);
  console.log(`Onboarded, no contact: ${onboardedNoContact.length}`);

  let exit = 0;
  if (onboardedNoContact.length > 0) {
    console.error("\nFAIL: isOnboarded=true requires phone, whatsapp, website, or googleMapsUrl:");
    for (const p of onboardedNoContact) console.error(`  - ${p.slug}`);
    exit = 1;
  } else {
    console.log("\nOK: onboarded rows have at least one contact path.");
  }

  process.exit(exit);
}

main();
