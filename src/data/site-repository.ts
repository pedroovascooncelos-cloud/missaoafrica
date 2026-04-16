import { unstable_cache, revalidateTag } from "next/cache";

import settingsJson from "@/content/settings.json";
import representantesJson from "@/content/representantes.json";
import transparenciaJson from "@/content/transparencia.json";
import { appEnv } from "@/lib/env";
import { getAdminDb } from "@/lib/firebase/admin";
import {
  siteContentSchema,
  siteSectionSchemas,
  type SiteContent,
  type SiteSection,
} from "@/types/site";

const SITE_CACHE_TAG = "site-content";

const localSiteContent = siteContentSchema.parse({
  settings: settingsJson,
  representantes: representantesJson,
  transparencia: transparenciaJson,
});

async function readFirestoreSiteContent() {
  const db = getAdminDb();
  const [settingsSnapshot, representantesSnapshot, transparenciaSnapshot] = await Promise.all([
    db.doc("site/settings").get(),
    db.doc("site/representantes").get(),
    db.doc("site/transparencia").get(),
  ]);

  return siteContentSchema.parse({
    settings: settingsSnapshot.exists ? settingsSnapshot.data() : localSiteContent.settings,
    representantes: representantesSnapshot.exists
      ? representantesSnapshot.data()
      : localSiteContent.representantes,
    transparencia: transparenciaSnapshot.exists
      ? transparenciaSnapshot.data()
      : localSiteContent.transparencia,
  });
}

async function loadSiteContent() {
  if (!appEnv.useFirestoreContent) {
    return localSiteContent;
  }

  try {
    return await readFirestoreSiteContent();
  } catch (error) {
    console.error("Falha ao ler conteúdo do Firestore. Usando fallback local.", error);
    return localSiteContent;
  }
}

const getCachedSiteContent = unstable_cache(loadSiteContent, [SITE_CACHE_TAG], {
  revalidate: appEnv.firestoreContentRevalidateSeconds,
  tags: [SITE_CACHE_TAG],
});

export async function getSiteContent(): Promise<SiteContent> {
  return getCachedSiteContent();
}

export async function saveSiteSection<TSection extends SiteSection>(
  section: TSection,
  payload: SiteContent[TSection],
) {
  const schema = siteSectionSchemas[section];
  const parsed = schema.parse(payload) as SiteContent[TSection];

  await getAdminDb().doc(`site/${section}`).set(parsed, { merge: false });
  revalidateTag(SITE_CACHE_TAG, "max");

  return parsed;
}

export function getLocalSiteContent() {
  return localSiteContent;
}
