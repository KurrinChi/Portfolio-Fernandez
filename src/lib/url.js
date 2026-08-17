export function isValidExternalUrl(url) {
  if (!url || typeof url !== "string") {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function visibleSocialEntries(socials = {}) {
  return Object.entries(socials)
    .filter(([, url]) => isValidExternalUrl(url))
    .map(([platform, url]) => ({ platform, url }));
}
