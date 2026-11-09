import { useEffect } from "react";

type Meta = {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: object;
};

function setMeta(selector: string, attr: "content" | "href", value: string, create: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const metaTag = (key: "name" | "property", id: string) => () => {
  const el = document.createElement("meta");
  el.setAttribute(key, id);
  return el;
};

/** SEO por rota (SPA): ajusta title, description, canonical, OG/Twitter e JSON-LD. */
export function useDocumentMeta({ title, description, canonical, jsonLd }: Meta) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description, metaTag("name", "description"));
    setMeta('meta[property="og:title"]', "content", title, metaTag("property", "og:title"));
    setMeta('meta[property="og:description"]', "content", description, metaTag("property", "og:description"));
    setMeta('meta[property="og:url"]', "content", canonical, metaTag("property", "og:url"));
    setMeta('meta[name="twitter:title"]', "content", title, metaTag("name", "twitter:title"));
    setMeta('meta[name="twitter:description"]', "content", description, metaTag("name", "twitter:description"));
    setMeta('link[rel="canonical"]', "href", canonical, () => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    });

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.route = "true";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      script?.remove();
    };
  }, [title, description, canonical, jsonLd]);
}
