function upsertMeta(attr, key, content) {
  if (!content) return;

  const selector = `meta[${attr}='${key}']`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

export function applySeo({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
}) {
  if (title) {
    document.title = title;
  }

  upsertMeta("name", "description", description);
  upsertMeta("name", "keywords", keywords?.join(", "));
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:image", ogImage);

  if (canonicalUrl) {
    let link = document.head.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
  }
}
