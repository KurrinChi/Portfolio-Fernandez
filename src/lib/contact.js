import emailjs from "@emailjs/browser";

function hasEmailJsConfig() {
  return Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );
}

export function getContactMode() {
  return hasEmailJsConfig() ? "emailjs" : "mailto";
}

export async function sendContactWithEmailJs(payload) {
  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    payload,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );
}

export function buildMailtoLink({ to, name, email, message }) {
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  );

  return `mailto:${to}?subject=${subject}&body=${body}`;
}
