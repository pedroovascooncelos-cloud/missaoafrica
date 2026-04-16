import { getSiteContent as getRepositorySiteContent } from "@/data/site-repository";
import type { Representative as RepresentativeData } from "@/types/site";

export type {
  AnalyticsSettings,
  ContactData,
  FinancialCategory,
  ImpactByDonationItem,
  InstitutionalData,
  InstagramVideo,
  MonthlyReport,
  ReceiptLink,
  Representative,
  SiteContent,
  SiteSettings,
  SocialLinks,
  StatItem,
  TimelineItem,
  TransparencyDocument,
} from "@/types/site";

export const missionStatement =
  "Somos uma missão humanitária da igreja que sustenta missionários em campo para levar alimento, água, cuidado espiritual e dignidade a famílias vulneráveis na África.";

export const heroMessage = "Transformando vidas na África com fé e ação";

export async function getSiteContent() {
  return getRepositorySiteContent();
}

export async function getSiteSettings() {
  const { settings } = await getSiteContent();
  return settings;
}

export async function getRepresentatives() {
  const { representantes } = await getSiteContent();
  return representantes.missionarios;
}

export async function getRepresentativeById(id: string) {
  const representatives = await getRepresentatives();
  return representatives.find((representative) => representative.id === id) ?? null;
}

export async function getRepresentativeIds() {
  const representatives = await getRepresentatives();
  return representatives.map((representative) => representative.id);
}

export async function getMissionImages() {
  const representatives = await getRepresentatives();
  return representatives.flatMap((representative) => [representative.foto, ...representative.galeria]);
}

export async function getTransparencyContent() {
  const { transparencia } = await getSiteContent();
  return transparencia;
}

export function getMapsLinkForRepresentative(representative: RepresentativeData) {
  const hasCoordinates =
    typeof representative.latitude === "number" && typeof representative.longitude === "number";

  if (hasCoordinates) {
    return `https://www.google.com/maps?q=${representative.latitude},${representative.longitude}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${representative.regiao}, ${representative.pais}`,
  )}`;
}
