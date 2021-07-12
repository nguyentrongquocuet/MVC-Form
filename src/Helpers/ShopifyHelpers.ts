import { LocaleText } from "../Types/data.type";
const Shopify = {
  locale: "en"
};

export function parseLocaleText(text?: LocaleText): string {
  if (!text) return "";
  return text[Shopify.locale] || "";
}
