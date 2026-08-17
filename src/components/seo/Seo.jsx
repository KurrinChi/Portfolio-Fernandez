import { useEffect } from "react";
import { siteConfig } from "../../content/siteConfig";
import { applySeo } from "../../lib/seo";

export function Seo({ title, description, keywords, ogImage }) {
  useEffect(() => {
    const pageTitle = title || siteConfig.seo.defaultTitle;
    const pageDescription = description || siteConfig.seo.defaultDescription;
    const pageKeywords = keywords || siteConfig.seo.defaultKeywords;
    const pageOgImage = ogImage || siteConfig.seo.globalOgImage;

    applySeo({
      title: pageTitle,
      description: pageDescription,
      keywords: pageKeywords,
      ogImage: pageOgImage,
      canonicalUrl: window.location.href,
    });
  }, [title, description, keywords, ogImage]);

  return null;
}
