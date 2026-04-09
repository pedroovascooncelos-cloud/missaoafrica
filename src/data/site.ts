import settings from "@/content/settings.json";
import representativesContent from "@/content/representantes.json";
import transparencyContent from "@/content/transparencia.json";

export type StatItem = {
  label: string;
  value: string;
  description: string;
};

export type Representative = {
  id: string;
  nome: string;
  pais: string;
  regiao: string;
  funcao: string;
  descricao: string;
  foto: string;
  videoUrl: string;
  latitude?: number;
  longitude?: number;
  galeria: string[];
};

export type FinancialCategory = {
  categoria: string;
  valor: number;
  porcentagem: number;
};

export type MonthlyReport = {
  mes: string;
  totalDoacoes: number;
  despesas: FinancialCategory[];
};

export type ReceiptLink = {
  label: string;
  url: string;
};

export const missionStatement =
  "Somos uma missão humanitária da igreja que sustenta missionários em campo para levar alimento, água, cuidado espiritual e dignidade a famílias vulneráveis na África.";

export const heroMessage = "Transformando vidas na África com fé e ação";

export const quickStats: StatItem[] = settings.quickStats as StatItem[];

export const representatives: Representative[] = representativesContent.missionarios as Representative[];
export const missionImages = representatives.flatMap((rep) => [rep.foto, ...rep.galeria]);

export const monthlyReports: MonthlyReport[] = transparencyContent.monthlyReports as MonthlyReport[];
export const timeline = transparencyContent.timeline as { mes: string; destaque: string }[];

export const pixData = settings.pixData;
export const impactByDonation = settings.impactByDonation;

export const instagramProfileUrl = settings.instagramProfileUrl;
export const instagramVideos = settings.instagramVideos;
export const transparencyGoogleSheetUrl = settings.transparencyGoogleSheetUrl;
export const receiptLinks = settings.receiptLinks as ReceiptLink[];
export const contact = settings.contact;
export const socialLinks = settings.socialLinks;
export const institutionalData = settings.institutionalData;
export const analytics = settings.analytics;
