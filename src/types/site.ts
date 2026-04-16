import { z } from "zod";

export const statItemSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  description: z.string().min(1),
});

export const representativeSchema = z.object({
  id: z.string().min(1),
  nome: z.string().min(1),
  pais: z.string().min(1),
  regiao: z.string().min(1),
  funcao: z.string().min(1),
  descricao: z.string().min(1),
  foto: z.string().min(1),
  videoUrl: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  galeria: z.array(z.string()),
});

export const financialCategorySchema = z.object({
  categoria: z.string().min(1),
  valor: z.number(),
  porcentagem: z.number(),
});

export const monthlyReportSchema = z.object({
  mes: z.string().min(1),
  totalDoacoes: z.number(),
  despesas: z.array(financialCategorySchema),
});

export const receiptLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
});

export const instagramVideoSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
});

export const pixDataSchema = z.object({
  chave: z.string().min(1),
  titular: z.string().min(1),
  banco: z.string().min(1),
  cnpj: z.string(),
});

export const impactByDonationSchema = z.object({
  valor: z.number(),
  impacto: z.string().min(1),
});

export const contactSchema = z.object({
  email: z.string().min(1),
  whatsapp: z.string().min(1),
  city: z.string().min(1),
});

export const socialLinksSchema = z.object({
  instagram: z.string().min(1),
  youtube: z.string().min(1),
});

export const institutionalDataSchema = z.object({
  organizacao: z.string().min(1),
  responsavelLegal: z.string().min(1),
  cnpj: z.string(),
  endereco: z.string().min(1),
  emailLgpd: z.string().min(1),
});

export const analyticsSchema = z.object({
  gaMeasurementId: z.string(),
});

export const netlifyLinksSchema = z.object({
  dashboard: z.string(),
  forms: z.string(),
  deploys: z.string(),
  identity: z.string(),
});

export const settingsSchema = z.object({
  instagramProfileUrl: z.string().min(1),
  instagramVideos: z.array(instagramVideoSchema),
  quickStats: z.array(statItemSchema),
  transparencyGoogleSheetUrl: z.string(),
  receiptLinks: z.array(receiptLinkSchema),
  contact: contactSchema,
  pixData: pixDataSchema,
  impactByDonation: z.array(impactByDonationSchema),
  socialLinks: socialLinksSchema,
  institutionalData: institutionalDataSchema,
  analytics: analyticsSchema,
  netlifyLinks: netlifyLinksSchema,
});

export const representativesDocumentSchema = z.object({
  missionarios: z.array(representativeSchema),
});

export const timelineItemSchema = z.object({
  mes: z.string().min(1),
  destaque: z.string().min(1),
});

export const transparencySchema = z.object({
  monthlyReports: z.array(monthlyReportSchema),
  timeline: z.array(timelineItemSchema),
});

export const siteContentSchema = z.object({
  settings: settingsSchema,
  representantes: representativesDocumentSchema,
  transparencia: transparencySchema,
});

export const donationConfirmationSchema = z.object({
  nome: z.string().min(1),
  email: z.email(),
  whatsapp: z.string().min(1),
  valor: z.number().positive(),
  txid: z.string().optional(),
  comprovante: z.string().optional(),
  consentimento: z.literal(true),
});

export type StatItem = z.infer<typeof statItemSchema>;
export type Representative = z.infer<typeof representativeSchema>;
export type FinancialCategory = z.infer<typeof financialCategorySchema>;
export type MonthlyReport = z.infer<typeof monthlyReportSchema>;
export type ReceiptLink = z.infer<typeof receiptLinkSchema>;
export type InstagramVideo = z.infer<typeof instagramVideoSchema>;
export type PixData = z.infer<typeof pixDataSchema>;
export type ImpactByDonationItem = z.infer<typeof impactByDonationSchema>;
export type ContactData = z.infer<typeof contactSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
export type InstitutionalData = z.infer<typeof institutionalDataSchema>;
export type AnalyticsSettings = z.infer<typeof analyticsSchema>;
export type NetlifyLinks = z.infer<typeof netlifyLinksSchema>;
export type SiteSettings = z.infer<typeof settingsSchema>;
export type RepresentativesDocument = z.infer<typeof representativesDocumentSchema>;
export type TimelineItem = z.infer<typeof timelineItemSchema>;
export type TransparencyDocument = z.infer<typeof transparencySchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;
export type DonationConfirmationInput = z.infer<typeof donationConfirmationSchema>;

export type SiteSection = keyof SiteContent;

export const siteSectionSchemas: Record<SiteSection, z.ZodType> = {
  settings: settingsSchema,
  representantes: representativesDocumentSchema,
  transparencia: transparencySchema,
};
