"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { getFirebaseClientAuth } from "@/lib/firebase/client";
import type {
  FinancialCategory,
  MonthlyReport,
  Representative,
  SiteContent,
  SiteSection,
  SiteSettings,
  TimelineItem,
  TransparencyDocument,
} from "@/types/site";

type AdminDashboardProps = {
  initialContent: SiteContent;
  userEmail: string;
  useFirestoreContent: boolean;
};

type SaveState = "idle" | "saving" | "saved" | "error";

const tabs: { id: SiteSection; label: string }[] = [
  { id: "settings", label: "Configurações" },
  { id: "representantes", label: "Representantes" },
  { id: "transparencia", label: "Transparência" },
];

const sectionDescriptions: Record<SiteSection, string> = {
  settings: "Instagram, contatos, PIX, dados institucionais e blocos da home.",
  representantes: "Missionários, fotos, galerias, coordenadas e links de vídeo.",
  transparencia: "Relatórios mensais, despesas e linha do tempo de publicações.",
};

function createRepresentative(): Representative {
  return {
    id: "",
    nome: "",
    pais: "",
    regiao: "",
    funcao: "",
    descricao: "",
    foto: "",
    videoUrl: "",
    latitude: undefined,
    longitude: undefined,
    galeria: [],
  };
}

function createMonthlyReport(): MonthlyReport {
  return {
    mes: "",
    totalDoacoes: 0,
    despesas: [],
  };
}

function createFinancialCategory(): FinancialCategory {
  return {
    categoria: "",
    valor: 0,
    porcentagem: 0,
  };
}

function createTimelineItem(): TimelineItem {
  return {
    mes: "",
    destaque: "",
  };
}

async function uploadImage(file: File) {
  const signatureResponse = await fetch("/api/admin/cloudinary/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const signatureBody = (await signatureResponse.json()) as {
    error?: string;
    cloudName?: string;
    apiKey?: string;
    folder?: string;
    timestamp?: number;
    signature?: string;
  };

  if (!signatureResponse.ok) {
    throw new Error(signatureBody.error || "Falha ao preparar upload.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", String(signatureBody.apiKey));
  formData.append("folder", String(signatureBody.folder));
  formData.append("timestamp", String(signatureBody.timestamp));
  formData.append("signature", String(signatureBody.signature));

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureBody.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const uploadBody = (await uploadResponse.json()) as { secure_url?: string; error?: { message?: string } };

  if (!uploadResponse.ok || !uploadBody.secure_url) {
    throw new Error(uploadBody.error?.message || "Falha no upload da imagem.");
  }

  return uploadBody.secure_url;
}

export function AdminDashboard({
  initialContent,
  userEmail,
  useFirestoreContent,
}: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SiteSection>("settings");
  const [settings, setSettings] = useState<SiteSettings>(initialContent.settings);
  const [representantes, setRepresentantes] = useState(initialContent.representantes);
  const [transparencia, setTransparencia] = useState<TransparencyDocument>(initialContent.transparencia);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [uploadingKey, setUploadingKey] = useState("");

  const currentPayload = useMemo(
    () => ({
      settings,
      representantes,
      transparencia,
    }),
    [representantes, settings, transparencia],
  );

  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(currentPayload) !== JSON.stringify(initialContent),
    [currentPayload, initialContent],
  );

  const activeSectionTitle = tabs.find((tab) => tab.id === activeTab)?.label ?? "Seção";
  const overviewItems = [
    {
      label: "Cards rápidos",
      value: String(settings.quickStats.length),
    },
    {
      label: "Representantes",
      value: String(representantes.missionarios.length),
    },
    {
      label: "Relatórios",
      value: String(transparencia.monthlyReports.length),
    },
  ];

  async function saveSection(section: SiteSection) {
    setSaveState("saving");
    setSaveMessage("");

    const response = await fetch(`/api/admin/content/${section}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentPayload[section]),
    });

    const body = (await response.json()) as { error?: string };

    if (!response.ok) {
      setSaveState("error");
      setSaveMessage(body.error || "Falha ao salvar a seção.");
      return;
    }

    setSaveState("saved");
    setSaveMessage("Alterações salvas com sucesso.");
    router.refresh();
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/session", { method: "DELETE" });
      await signOut(getFirebaseClientAuth());
    } catch {
      // ignora erro local para garantir refresh
    } finally {
      router.refresh();
    }
  }

  async function handleRepresentativePhotoUpload(index: number, file: File) {
    const key = `rep-foto-${index}`;
    setUploadingKey(key);

    try {
      const secureUrl = await uploadImage(file);
      setRepresentantes((current) => ({
        missionarios: current.missionarios.map((representante, currentIndex) =>
          currentIndex === index ? { ...representante, foto: secureUrl } : representante,
        ),
      }));
    } finally {
      setUploadingKey("");
    }
  }

  async function handleRepresentativeGalleryUpload(index: number, file: File) {
    const key = `rep-galeria-${index}`;
    setUploadingKey(key);

    try {
      const secureUrl = await uploadImage(file);
      setRepresentantes((current) => ({
        missionarios: current.missionarios.map((representante, currentIndex) =>
          currentIndex === index
            ? { ...representante, galeria: [...representante.galeria, secureUrl] }
            : representante,
        ),
      }));
    } finally {
      setUploadingKey("");
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 p-8 text-white shadow-2xl shadow-emerald-950/15">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Admin Firebase</p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Painel de gestão do conteúdo</h1>
            <p className="mt-4 text-sm leading-7 text-emerald-50/85 sm:text-base">
              Agora o admin tem navegação por seções, salvamento por bloco e edição direta do conteúdo
              público sem depender do CMS legado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
              {userEmail}
            </span>
            <Link
              href="/"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Abrir site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-50"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {overviewItems.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
              <p className="text-sm text-emerald-100/80">{item.label}</p>
              <p className="mt-2 text-3xl font-black text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      {!useFirestoreContent ? (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900">
          <p className="text-sm font-semibold">Modo de transição ativo</p>
          <p className="mt-1 text-sm leading-6">
            O admin está salvando no Firestore, mas o site público ainda está lendo o fallback local
            porque `USE_FIRESTORE_CONTENT=false`. Para refletir as alterações no site, troque essa
            variável para `true` e reinicie o servidor.
          </p>
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="premium-surface rounded-3xl p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Seções</p>
            <div className="mt-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                    activeTab === tab.id
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/40"
                  }`}
                >
                  <p className="text-sm font-semibold">{tab.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{sectionDescriptions[tab.id]}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="premium-surface rounded-3xl p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Status</p>
            <div className="mt-4 space-y-3">
              <StatusPill
                label="Seção atual"
                value={activeSectionTitle}
                tone="default"
              />
              <StatusPill
                label="Alterações pendentes"
                value={hasUnsavedChanges ? "Sim" : "Não"}
                tone={hasUnsavedChanges ? "warning" : "success"}
              />
              <StatusPill
                label="Upload Cloudinary"
                value={uploadingKey ? "Em andamento" : "Livre"}
                tone={uploadingKey ? "warning" : "success"}
              />
            </div>
          </section>
        </aside>

        <div className="space-y-6">
          <section className="premium-surface rounded-3xl p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                  Editando agora
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">{activeSectionTitle}</h2>
                <p className="mt-2 max-w-3xl text-sm text-slate-600">{sectionDescriptions[activeTab]}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void saveSection(activeTab)}
                  className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  {saveState === "saving" ? "Salvando..." : `Salvar ${activeSectionTitle.toLowerCase()}`}
                </button>
              </div>
            </div>

            {saveMessage ? (
              <p
                className={`mt-4 text-sm ${saveState === "error" ? "text-rose-600" : "text-emerald-700"}`}
              >
                {saveMessage}
              </p>
            ) : null}
          </section>

          {activeTab === "settings" ? (
            <SettingsEditor value={settings} onChange={setSettings} />
          ) : null}

          {activeTab === "representantes" ? (
            <RepresentativesEditor
              value={representantes.missionarios}
              uploadingKey={uploadingKey}
              onChange={(missionarios) => setRepresentantes({ missionarios })}
              onPhotoUpload={handleRepresentativePhotoUpload}
              onGalleryUpload={handleRepresentativeGalleryUpload}
            />
          ) : null}

          {activeTab === "transparencia" ? (
            <TransparencyEditor value={transparencia} onChange={setTransparencia} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SettingsEditor({
  value,
  onChange,
}: {
  value: SiteSettings;
  onChange: (next: SiteSettings) => void;
}) {
  return (
    <section className="space-y-6">
      <Card title="Mídia e atalhos">
        <TwoColumns>
          <TextField
            label="Instagram principal"
            value={value.instagramProfileUrl}
            onChange={(instagramProfileUrl) => onChange({ ...value, instagramProfileUrl })}
          />
          <TextField
            label="Google Sheets"
            value={value.transparencyGoogleSheetUrl}
            onChange={(transparencyGoogleSheetUrl) => onChange({ ...value, transparencyGoogleSheetUrl })}
          />
        </TwoColumns>
        <ListEditor
          title="Vídeos do Instagram"
          items={value.instagramVideos}
          onAdd={() =>
            onChange({
              ...value,
              instagramVideos: [...value.instagramVideos, { title: "", url: "" }],
            })
          }
          onRemove={(index) =>
            onChange({
              ...value,
              instagramVideos: value.instagramVideos.filter((_, currentIndex) => currentIndex !== index),
            })
          }
          renderItem={(item, index) => (
            <TwoColumns key={`instagram-video-${index}`}>
              <TextField
                label="Título"
                value={item.title}
                onChange={(title) =>
                  onChange({
                    ...value,
                    instagramVideos: value.instagramVideos.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, title } : current,
                    ),
                  })
                }
              />
              <TextField
                label="URL"
                value={item.url}
                onChange={(url) =>
                  onChange({
                    ...value,
                    instagramVideos: value.instagramVideos.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, url } : current,
                    ),
                  })
                }
              />
            </TwoColumns>
          )}
        />
      </Card>

      <Card title="Números rápidos e comprovantes">
        <ListEditor
          title="Quick stats"
          items={value.quickStats}
          onAdd={() =>
            onChange({
              ...value,
              quickStats: [...value.quickStats, { label: "", value: "", description: "" }],
            })
          }
          onRemove={(index) =>
            onChange({
              ...value,
              quickStats: value.quickStats.filter((_, currentIndex) => currentIndex !== index),
            })
          }
          renderItem={(item, index) => (
            <div key={`quick-stat-${index}`} className="grid gap-4 lg:grid-cols-3">
              <TextField
                label="Título"
                value={item.label}
                onChange={(label) =>
                  onChange({
                    ...value,
                    quickStats: value.quickStats.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, label } : current,
                    ),
                  })
                }
              />
              <TextField
                label="Valor"
                value={item.value}
                onChange={(itemValue) =>
                  onChange({
                    ...value,
                    quickStats: value.quickStats.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, value: itemValue } : current,
                    ),
                  })
                }
              />
              <TextField
                label="Descrição"
                value={item.description}
                onChange={(description) =>
                  onChange({
                    ...value,
                    quickStats: value.quickStats.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, description } : current,
                    ),
                  })
                }
              />
            </div>
          )}
        />

        <ListEditor
          title="Links de comprovantes"
          items={value.receiptLinks}
          onAdd={() =>
            onChange({
              ...value,
              receiptLinks: [...value.receiptLinks, { label: "", url: "" }],
            })
          }
          onRemove={(index) =>
            onChange({
              ...value,
              receiptLinks: value.receiptLinks.filter((_, currentIndex) => currentIndex !== index),
            })
          }
          renderItem={(item, index) => (
            <TwoColumns key={`receipt-link-${index}`}>
              <TextField
                label="Texto"
                value={item.label}
                onChange={(label) =>
                  onChange({
                    ...value,
                    receiptLinks: value.receiptLinks.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, label } : current,
                    ),
                  })
                }
              />
              <TextField
                label="URL"
                value={item.url}
                onChange={(url) =>
                  onChange({
                    ...value,
                    receiptLinks: value.receiptLinks.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, url } : current,
                    ),
                  })
                }
              />
            </TwoColumns>
          )}
        />
      </Card>

      <Card title="Doação, contato e institucional">
        <TwoColumns>
          <TextField
            label="Contato e-mail"
            value={value.contact.email}
            onChange={(email) => onChange({ ...value, contact: { ...value.contact, email } })}
          />
          <TextField
            label="WhatsApp"
            value={value.contact.whatsapp}
            onChange={(whatsapp) => onChange({ ...value, contact: { ...value.contact, whatsapp } })}
          />
          <TextField
            label="Cidade"
            value={value.contact.city}
            onChange={(city) => onChange({ ...value, contact: { ...value.contact, city } })}
          />
          <TextField
            label="Chave PIX"
            value={value.pixData.chave}
            onChange={(chave) => onChange({ ...value, pixData: { ...value.pixData, chave } })}
          />
          <TextField
            label="Titular PIX"
            value={value.pixData.titular}
            onChange={(titular) => onChange({ ...value, pixData: { ...value.pixData, titular } })}
          />
          <TextField
            label="Banco"
            value={value.pixData.banco}
            onChange={(banco) => onChange({ ...value, pixData: { ...value.pixData, banco } })}
          />
          <TextField
            label="CNPJ PIX"
            value={value.pixData.cnpj}
            onChange={(cnpj) => onChange({ ...value, pixData: { ...value.pixData, cnpj } })}
          />
          <TextField
            label="Instagram"
            value={value.socialLinks.instagram}
            onChange={(instagram) =>
              onChange({ ...value, socialLinks: { ...value.socialLinks, instagram } })
            }
          />
          <TextField
            label="YouTube"
            value={value.socialLinks.youtube}
            onChange={(youtube) => onChange({ ...value, socialLinks: { ...value.socialLinks, youtube } })}
          />
          <TextField
            label="Organização"
            value={value.institutionalData.organizacao}
            onChange={(organizacao) =>
              onChange({
                ...value,
                institutionalData: { ...value.institutionalData, organizacao },
              })
            }
          />
          <TextField
            label="Responsável legal"
            value={value.institutionalData.responsavelLegal}
            onChange={(responsavelLegal) =>
              onChange({
                ...value,
                institutionalData: { ...value.institutionalData, responsavelLegal },
              })
            }
          />
          <TextField
            label="Endereço"
            value={value.institutionalData.endereco}
            onChange={(endereco) =>
              onChange({
                ...value,
                institutionalData: { ...value.institutionalData, endereco },
              })
            }
          />
          <TextField
            label="CNPJ institucional"
            value={value.institutionalData.cnpj}
            onChange={(cnpj) =>
              onChange({
                ...value,
                institutionalData: { ...value.institutionalData, cnpj },
              })
            }
          />
          <TextField
            label="Email LGPD"
            value={value.institutionalData.emailLgpd}
            onChange={(emailLgpd) =>
              onChange({
                ...value,
                institutionalData: { ...value.institutionalData, emailLgpd },
              })
            }
          />
          <TextField
            label="GA4 Measurement ID"
            value={value.analytics.gaMeasurementId}
            onChange={(gaMeasurementId) =>
              onChange({ ...value, analytics: { ...value.analytics, gaMeasurementId } })
            }
          />
        </TwoColumns>

        <ListEditor
          title="Impacto por valor"
          items={value.impactByDonation}
          onAdd={() =>
            onChange({
              ...value,
              impactByDonation: [...value.impactByDonation, { valor: 0, impacto: "" }],
            })
          }
          onRemove={(index) =>
            onChange({
              ...value,
              impactByDonation: value.impactByDonation.filter((_, currentIndex) => currentIndex !== index),
            })
          }
          renderItem={(item, index) => (
            <TwoColumns key={`impact-item-${index}`}>
              <NumberField
                label="Valor"
                value={item.valor}
                onChange={(valor) =>
                  onChange({
                    ...value,
                    impactByDonation: value.impactByDonation.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, valor } : current,
                    ),
                  })
                }
              />
              <TextField
                label="Impacto"
                value={item.impacto}
                onChange={(impacto) =>
                  onChange({
                    ...value,
                    impactByDonation: value.impactByDonation.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, impacto } : current,
                    ),
                  })
                }
              />
            </TwoColumns>
          )}
        />
      </Card>
    </section>
  );
}

function RepresentativesEditor({
  value,
  onChange,
  onPhotoUpload,
  onGalleryUpload,
  uploadingKey,
}: {
  value: Representative[];
  onChange: (next: Representative[]) => void;
  onPhotoUpload: (index: number, file: File) => Promise<void>;
  onGalleryUpload: (index: number, file: File) => Promise<void>;
  uploadingKey: string;
}) {
  return (
    <Card title="Representantes">
      <div className="space-y-6">
        {value.map((representante, index) => (
          <article key={`representante-${index}`} className="rounded-2xl border border-slate-200 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {representante.nome || `Representante ${index + 1}`}
                </h3>
                <p className="text-sm text-slate-500">Foto principal, galeria e dados públicos.</p>
              </div>
              <button
                type="button"
                onClick={() => onChange(value.filter((_, currentIndex) => currentIndex !== index))}
                className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700"
              >
                Remover
              </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <TextField
                label="ID"
                value={representante.id}
                onChange={(id) =>
                  onChange(value.map((current, currentIndex) => (currentIndex === index ? { ...current, id } : current)))
                }
              />
              <TextField
                label="Nome"
                value={representante.nome}
                onChange={(nome) =>
                  onChange(
                    value.map((current, currentIndex) => (currentIndex === index ? { ...current, nome } : current)),
                  )
                }
              />
              <TextField
                label="País"
                value={representante.pais}
                onChange={(pais) =>
                  onChange(
                    value.map((current, currentIndex) => (currentIndex === index ? { ...current, pais } : current)),
                  )
                }
              />
              <TextField
                label="Região"
                value={representante.regiao}
                onChange={(regiao) =>
                  onChange(
                    value.map((current, currentIndex) => (currentIndex === index ? { ...current, regiao } : current)),
                  )
                }
              />
              <TextField
                label="Função"
                value={representante.funcao}
                onChange={(funcao) =>
                  onChange(
                    value.map((current, currentIndex) => (currentIndex === index ? { ...current, funcao } : current)),
                  )
                }
              />
              <TextField
                label="Vídeo / Instagram"
                value={representante.videoUrl}
                onChange={(videoUrl) =>
                  onChange(
                    value.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, videoUrl } : current,
                    ),
                  )
                }
              />
              <OptionalNumberField
                label="Latitude"
                value={representante.latitude}
                onChange={(latitude) =>
                  onChange(
                    value.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, latitude } : current,
                    ),
                  )
                }
              />
              <OptionalNumberField
                label="Longitude"
                value={representante.longitude}
                onChange={(longitude) =>
                  onChange(
                    value.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, longitude } : current,
                    ),
                  )
                }
              />
            </div>

            <div className="mt-4">
              <TextAreaField
                label="Descrição"
                value={representante.descricao}
                onChange={(descricao) =>
                  onChange(
                    value.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, descricao } : current,
                    ),
                  )
                }
              />
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">Foto principal</p>
                <TextField
                  label="URL da foto"
                  value={representante.foto}
                  onChange={(foto) =>
                    onChange(
                      value.map((current, currentIndex) =>
                        currentIndex === index ? { ...current, foto } : current,
                      ),
                    )
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-3 block w-full text-sm"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void onPhotoUpload(index, file);
                    }
                  }}
                />
                {uploadingKey === `rep-foto-${index}` ? (
                  <p className="mt-2 text-xs text-emerald-700">Enviando imagem...</p>
                ) : null}
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">Galeria</p>
                  <button
                    type="button"
                    onClick={() =>
                      onChange(
                        value.map((current, currentIndex) =>
                          currentIndex === index ? { ...current, galeria: [...current.galeria, ""] } : current,
                        ),
                      )
                    }
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    Adicionar URL
                  </button>
                </div>

                <div className="mt-3 space-y-3">
                  {representante.galeria.map((image, imageIndex) => (
                    <div key={`gallery-image-${index}-${imageIndex}`} className="rounded-xl border border-slate-200 p-3">
                      <TextField
                        label={`Imagem ${imageIndex + 1}`}
                        value={image}
                        onChange={(imageUrl) =>
                          onChange(
                            value.map((current, currentIndex) =>
                              currentIndex === index
                                ? {
                                    ...current,
                                    galeria: current.galeria.map((galleryImage, galleryIndex) =>
                                      galleryIndex === imageIndex ? imageUrl : galleryImage,
                                    ),
                                  }
                                : current,
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          onChange(
                            value.map((current, currentIndex) =>
                              currentIndex === index
                                ? {
                                    ...current,
                                    galeria: current.galeria.filter(
                                      (_, galleryIndex) => galleryIndex !== imageIndex,
                                    ),
                                  }
                                : current,
                            ),
                          )
                        }
                        className="mt-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700"
                      >
                        Remover imagem
                      </button>
                    </div>
                  ))}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="mt-4 block w-full text-sm"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void onGalleryUpload(index, file);
                    }
                  }}
                />
                {uploadingKey === `rep-galeria-${index}` ? (
                  <p className="mt-2 text-xs text-emerald-700">Enviando imagem...</p>
                ) : null}
              </div>
            </div>
          </article>
        ))}

        <button
          type="button"
          onClick={() => onChange([...value, createRepresentative()])}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Adicionar representante
        </button>
      </div>
    </Card>
  );
}

function TransparencyEditor({
  value,
  onChange,
}: {
  value: TransparencyDocument;
  onChange: (next: TransparencyDocument) => void;
}) {
  return (
    <section className="space-y-6">
      <Card title="Relatórios mensais">
        <div className="space-y-5">
          {value.monthlyReports.map((report, reportIndex) => (
            <article key={`monthly-report-${reportIndex}`} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900">{report.mes || `Relatório ${reportIndex + 1}`}</h3>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      monthlyReports: value.monthlyReports.filter((_, currentIndex) => currentIndex !== reportIndex),
                    })
                  }
                  className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700"
                >
                  Remover
                </button>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <TextField
                  label="Mês"
                  value={report.mes}
                  onChange={(mes) =>
                    onChange({
                      ...value,
                      monthlyReports: value.monthlyReports.map((current, currentIndex) =>
                        currentIndex === reportIndex ? { ...current, mes } : current,
                      ),
                    })
                  }
                />
                <NumberField
                  label="Total de doações"
                  value={report.totalDoacoes}
                  onChange={(totalDoacoes) =>
                    onChange({
                      ...value,
                      monthlyReports: value.monthlyReports.map((current, currentIndex) =>
                        currentIndex === reportIndex ? { ...current, totalDoacoes } : current,
                      ),
                    })
                  }
                />
              </div>

              <div className="mt-4 space-y-3">
                {report.despesas.map((despesa, despesaIndex) => (
                  <div key={`expense-${reportIndex}-${despesaIndex}`} className="rounded-xl border border-slate-200 p-4">
                    <div className="grid gap-4 lg:grid-cols-3">
                      <TextField
                        label="Categoria"
                        value={despesa.categoria}
                        onChange={(categoria) =>
                          onChange({
                            ...value,
                            monthlyReports: value.monthlyReports.map((current, currentIndex) =>
                              currentIndex === reportIndex
                                ? {
                                    ...current,
                                    despesas: current.despesas.map((currentDespesa, currentDespesaIndex) =>
                                      currentDespesaIndex === despesaIndex
                                        ? { ...currentDespesa, categoria }
                                        : currentDespesa,
                                    ),
                                  }
                                : current,
                            ),
                          })
                        }
                      />
                      <NumberField
                        label="Valor"
                        value={despesa.valor}
                        onChange={(valor) =>
                          onChange({
                            ...value,
                            monthlyReports: value.monthlyReports.map((current, currentIndex) =>
                              currentIndex === reportIndex
                                ? {
                                    ...current,
                                    despesas: current.despesas.map((currentDespesa, currentDespesaIndex) =>
                                      currentDespesaIndex === despesaIndex
                                        ? { ...currentDespesa, valor }
                                        : currentDespesa,
                                    ),
                                  }
                                : current,
                            ),
                          })
                        }
                      />
                      <NumberField
                        label="%"
                        value={despesa.porcentagem}
                        onChange={(porcentagem) =>
                          onChange({
                            ...value,
                            monthlyReports: value.monthlyReports.map((current, currentIndex) =>
                              currentIndex === reportIndex
                                ? {
                                    ...current,
                                    despesas: current.despesas.map((currentDespesa, currentDespesaIndex) =>
                                      currentDespesaIndex === despesaIndex
                                        ? { ...currentDespesa, porcentagem }
                                        : currentDespesa,
                                    ),
                                  }
                                : current,
                            ),
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...value,
                          monthlyReports: value.monthlyReports.map((current, currentIndex) =>
                            currentIndex === reportIndex
                              ? {
                                  ...current,
                                  despesas: current.despesas.filter(
                                    (_, currentDespesaIndex) => currentDespesaIndex !== despesaIndex,
                                  ),
                                }
                              : current,
                          ),
                        })
                      }
                      className="mt-3 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700"
                    >
                      Remover despesa
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      monthlyReports: value.monthlyReports.map((current, currentIndex) =>
                        currentIndex === reportIndex
                          ? { ...current, despesas: [...current.despesas, createFinancialCategory()] }
                          : current,
                      ),
                    })
                  }
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Adicionar despesa
                </button>
              </div>
            </article>
          ))}

          <button
            type="button"
            onClick={() =>
              onChange({
                ...value,
                monthlyReports: [...value.monthlyReports, createMonthlyReport()],
              })
            }
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Adicionar relatório
          </button>
        </div>
      </Card>

      <Card title="Linha do tempo">
        <ListEditor
          title="Eventos"
          items={value.timeline}
          onAdd={() =>
            onChange({
              ...value,
              timeline: [...value.timeline, createTimelineItem()],
            })
          }
          onRemove={(index) =>
            onChange({
              ...value,
              timeline: value.timeline.filter((_, currentIndex) => currentIndex !== index),
            })
          }
          renderItem={(item, index) => (
            <TwoColumns key={`timeline-item-${index}`}>
              <TextField
                label="Mês"
                value={item.mes}
                onChange={(mes) =>
                  onChange({
                    ...value,
                    timeline: value.timeline.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, mes } : current,
                    ),
                  })
                }
              />
              <TextField
                label="Destaque"
                value={item.destaque}
                onChange={(destaque) =>
                  onChange({
                    ...value,
                    timeline: value.timeline.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, destaque } : current,
                    ),
                  })
                }
              />
            </TwoColumns>
          )}
        />
      </Card>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="premium-surface rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

function StatusPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "default" | "warning" | "success";
}) {
  const toneClasses = {
    default: "bg-slate-100 text-slate-700",
    warning: "bg-amber-100 text-amber-800",
    success: "bg-emerald-100 text-emerald-800",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
        {value}
      </span>
    </div>
  );
}

function ListEditor<T>({
  title,
  items,
  onAdd,
  onRemove,
  renderItem,
}: {
  title: string;
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
        >
          Adicionar
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-xl border border-slate-200 p-4">
            {renderItem(item, index)}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="mt-3 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TwoColumns({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 lg:grid-cols-2">{children}</div>;
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
    </label>
  );
}

function OptionalNumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        type="number"
        value={value ?? ""}
        onChange={(event) => {
          const rawValue = event.target.value.trim();
          onChange(rawValue ? Number(rawValue) : undefined);
        }}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
    </label>
  );
}
