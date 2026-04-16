import { FooterClient } from "@/components/FooterClient";
import { getSiteSettings } from "@/data/site";

export async function Footer() {
  const { contact, socialLinks } = await getSiteSettings();

  return <FooterClient contact={contact} socialLinks={socialLinks} />;
}
