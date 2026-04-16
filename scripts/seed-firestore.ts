import { getLocalSiteContent } from "@/data/site-repository";
import { getAdminDb } from "@/lib/firebase/admin";
import type { SiteSection } from "@/types/site";

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");

async function main() {
  const content = getLocalSiteContent();
  const sections: SiteSection[] = ["settings", "representantes", "transparencia"];

  console.log(`Iniciando seed ${isDryRun ? "em modo dry-run" : "com escrita no Firestore"}...`);

  for (const section of sections) {
    const payload = content[section];
    const summary = JSON.stringify(payload, null, 2);

    console.log(`\n[${section}] tamanho aproximado: ${summary.length} caracteres`);

    if (isDryRun) {
      console.log(summary.slice(0, 1200));
      continue;
    }

    const db = getAdminDb();
    await db.doc(`site/${section}`).set(payload, { merge: false });
    console.log(`[${section}] gravado com sucesso.`);
  }

  console.log("\nSeed concluído.");
}

main().catch((error) => {
  console.error("Falha ao executar seed do Firestore.");
  console.error(error);
  process.exit(1);
});
