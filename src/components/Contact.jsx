import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Download, Instagram, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT, EVENT_TYPES } from "../data/site.js";

const REQUEST_TIMEOUT_MS = 60_000;
const EMPTY_FORM = { company: "", name: "", designation: "", email: "", contact: "", eventType: "" };

const FIELDS = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
  { name: "designation", label: "Designation", type: "text", autoComplete: "organization-title" },
  { name: "email", label: "Work email", type: "email", autoComplete: "email" },
  { name: "contact", label: "Phone number", type: "tel", autoComplete: "tel" },
];

const CHANNELS = [
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Phone, label: "Call", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Message us", href: CONTACT.whatsapp, external: true },
  { icon: Instagram, label: "Instagram", value: "@precision.planners", href: CONTACT.instagram, external: true },
];

function downloadBrochure() {
  const a = document.createElement("a");
  a.href = CONTACT.brochure;
  a.download = "PrecisionPlanners-CompanyProfile.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const inputClass =
  "peer w-full border-0 border-b border-ivory/20 bg-transparent px-0 pb-3 pt-6 text-base text-ivory placeholder-transparent transition-colors focus:border-gold focus:outline-none focus:ring-0";
const labelClass =
  "pointer-events-none absolute left-0 top-6 origin-left text-base text-ivory/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email.includes("@") || form.contact.replace(/\D/g, "").length < 7) {
      setStatus("error");
      setError("Please provide a valid email and phone number.");
      return;
    }
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch(CONTACT.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Failed to send message (HTTP ${res.status})`);
      setStatus("sent");
      setForm(EMPTY_FORM);
      downloadBrochure();
    } catch (err) {
      setStatus("error");
      setError(err.name === "AbortError" ? "Request timed out. Please try again." : err.message);
    } finally {
      clearTimeout(timeout);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-28 grain sm:py-36">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-navy-2/50 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container-x relative grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6 text-gold" data-reveal>
            Contact
          </p>
          <h2 className="h-section" data-split>
            Let's make it <em className="italic text-gold-2">unforgettable.</em>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory/65" data-reveal>
            Tell us about your event and we'll get back within 24 hours with ideas and a plan. Our company profile downloads automatically
            once you submit.
          </p>

          <ul
            className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/10 sm:grid-cols-2"
            data-reveal
          >
            {CHANNELS.map((c) => (
              <li key={c.label} className="bg-ink">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full items-start gap-4 p-5 transition-colors hover:bg-ink-2"
                >
                  <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.2em] text-ivory/45">{c.label}</span>
                    <span className="mt-1 block break-words text-sm font-semibold text-ivory group-hover:text-gold-2">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={CONTACT.brochure}
            download
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ivory/80 hover:text-gold-2"
            data-reveal
          >
            <Download className="h-4 w-4" /> Download company profile (PDF)
          </a>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal>
          <form onSubmit={onSubmit} className="rounded-[28px] border border-ivory/10 bg-ink-2/80 p-7 backdrop-blur sm:p-10">
            <h3 className="font-display text-3xl">Start a conversation</h3>
            <p className="mt-2 text-sm text-ivory/55">All fields are required.</p>

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.name} className="relative">
                  <input
                    id={`f-${f.name}`}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    required
                    placeholder={f.label}
                    value={form[f.name]}
                    onChange={onChange}
                    className={inputClass}
                  />
                  <label htmlFor={`f-${f.name}`} className={labelClass}>
                    {f.label}
                  </label>
                </div>
              ))}
              <div className="relative">
                <select
                  id="f-eventType"
                  name="eventType"
                  required
                  value={form.eventType}
                  onChange={onChange}
                  className="w-full appearance-none border-0 border-b border-ivory/20 bg-transparent px-0 pb-3 pt-6 text-base text-ivory focus:border-gold focus:outline-none focus:ring-0"
                >
                  <option value="" className="bg-ink">
                    Select…
                  </option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-ink">
                      {t}
                    </option>
                  ))}
                </select>
                <label htmlFor="f-eventType" className="pointer-events-none absolute left-0 top-0 text-xs text-ivory/50">
                  What do you need?
                </label>
              </div>
            </div>

            <div aria-live="polite">
              {status === "sent" && (
                <p className="mt-8 flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                  <CheckCircle2 className="h-5 w-5 shrink-0" /> Thank you — your message is on its way. We'll be in touch within 24 hours.
                </p>
              )}
              {status === "error" && error && (
                <p role="alert" className="mt-8 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-100">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gold group mt-10 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
