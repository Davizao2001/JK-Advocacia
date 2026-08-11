import { site } from '@/content/site';

type ChaveMensagem = keyof typeof site.whatsapp;

/** Link do WhatsApp com mensagem inicial neutra e sem dados sensíveis. */
export function whatsappUrl(chave: ChaveMensagem = 'padrao'): string {
  const texto = encodeURIComponent(site.whatsapp[chave]);
  return `https://wa.me/${site.contato.telefoneE164}?text=${texto}`;
}

/** Link do WhatsApp com um texto livre — usado quando a mensagem é montada dinamicamente (ex.: data escolhida no agendamento). */
export function whatsappUrlComTexto(texto: string): string {
  return `https://wa.me/${site.contato.telefoneE164}?text=${encodeURIComponent(texto)}`;
}

/** Link de telefone clicável. */
export const telUrl = `tel:+${site.contato.telefoneE164}`;

/** Endereço formatado em uma linha. */
export const enderecoLinha = `${site.endereco.logradouro} — ${site.endereco.bairro}, ${site.endereco.cidade} – ${site.endereco.uf}, CEP ${site.endereco.cep}`;

/** Rota no Google Maps. */
export const rotaUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  site.endereco.buscaMapa,
)}`;

/** Mapa incorporado (sem necessidade de chave de API). */
export const mapaEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  site.endereco.buscaMapa,
)}&output=embed`;
