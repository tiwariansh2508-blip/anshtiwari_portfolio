import { useState } from 'react';

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Copy,
  Check,
  Send,
  AlertCircle,
  Info,
  ArrowUpRight,
} from 'lucide-react';

import { personalInfo } from '@/data/portfolio';
import { useCopyToClipboard } from '@/hooks';

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'error'
  >('idle');

  const { copied, copy } = useCopyToClipboard();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    const email = formState.email.trim();

    if (!email) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Please enter a message';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setStatus('sending');

    const subject = encodeURIComponent(
      `Portfolio contact from ${formState.name.trim()}`,
    );

    const body = encodeURIComponent(
      `${formState.message.trim()}\n\nFrom: ${formState.name.trim()}\nEmail: ${formState.email.trim()}`,
    );

    try {
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

      setStatus('sent');
      setFormState({
        name: '',
        email: '',
        message: '',
      });
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500/15 dark:bg-[#070b12] dark:text-white dark:placeholder:text-slate-500 ${
      hasError
        ? 'border-red-400 focus:border-red-400'
        : 'border-slate-200 focus:border-cyan-500 dark:border-white/10 dark:focus:border-[#00e5ff]/70'
    }`;

  const contactCardClass =
    'group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgba(0,229,255,0.08)] dark:border-white/[0.08] dark:bg-[#0b1420]/90 dark:hover:border-[#00e5ff]/35 dark:hover:shadow-[0_8px_30px_rgba(0,229,255,0.05)]';

  const iconBoxClass =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-50 text-cyan-700 transition-colors group-hover:bg-cyan-100 dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.06] dark:text-[#00e5ff] dark:group-hover:bg-[#00e5ff]/[0.12]';

  const labelClass =
    'mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400';

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-50 py-20 text-slate-900 transition-colors duration-300 dark:bg-[#070b12] dark:text-white sm:py-24 lg:py-28"
    >
      {/* Ambient neon background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[120px] dark:bg-[#00e5ff]/[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-400/[0.07] blur-[130px] dark:bg-[#00bfff]/[0.05]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="reveal mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-50 px-4 py-2 dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.06]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-600 dark:bg-[#00e5ff]" />

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-800 dark:text-[#00e5ff]">
              Contact / Connect
            </span>
          </div>

          <h2 className="mb-5 font-display text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Let's build
            <span className="block text-cyan-700 dark:text-[#00e5ff] dark:[text-shadow:0_0_25px_rgba(0,229,255,0.2)]">
              something together.
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            Whether it's a job opportunity, a collaboration, or simply a
            question — I'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Contact information */}
          <div className="reveal space-y-4 lg:col-span-5">
            {/* Email */}
            <div className={contactCardClass}>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex min-w-0 flex-1 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <div className={iconBoxClass}>
                    <Mail size={19} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <p className={labelClass}>Email</p>

                    <p className="break-all text-sm font-medium text-slate-800 transition-colors group-hover:text-cyan-700 dark:text-slate-200 dark:group-hover:text-[#00e5ff]">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={() => copy(personalInfo.email)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-cyan-500/40 hover:bg-cyan-50 hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-white/[0.07] dark:text-slate-400 dark:hover:border-[#00e5ff]/35 dark:hover:bg-[#00e5ff]/[0.06] dark:hover:text-[#00e5ff]"
                  aria-label="Copy email address"
                  title={copied ? 'Email copied' : 'Copy email'}
                >
                  {copied ? (
                    <Check size={15} className="text-cyan-600 dark:text-[#00e5ff]" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>
            </div>

            {/* Phone */}
            <a
              href={`tel:${personalInfo.phone}`}
              className={`${contactCardClass} block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500`}
            >
              <div className="flex items-center gap-3">
                <div className={iconBoxClass}>
                  <Phone size={19} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className={labelClass}>Phone</p>

                  <p className="break-words text-sm font-medium text-slate-800 transition-colors group-hover:text-cyan-700 dark:text-slate-200 dark:group-hover:text-[#00e5ff]">
                    {personalInfo.phone}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:text-slate-600 dark:group-hover:text-[#00e5ff]"
                  aria-hidden="true"
                />
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contactCardClass} block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500`}
            >
              <div className="flex items-center gap-3">
                <div className={iconBoxClass}>
                  <Linkedin size={19} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className={labelClass}>LinkedIn</p>

                  <p className="text-sm font-medium text-slate-800 transition-colors group-hover:text-cyan-700 dark:text-slate-200 dark:group-hover:text-[#00e5ff]">
                    View professional profile
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-700 dark:text-slate-600 dark:group-hover:text-[#00e5ff]"
                  aria-hidden="true"
                />
              </div>
            </a>

            {/* Location */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors dark:border-white/[0.08] dark:bg-[#0b1420]/90">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-50 text-cyan-700 dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.06] dark:text-[#00e5ff]">
                  <MapPin size={19} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className={labelClass}>Location</p>

                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Honest mailto notice */}
            <div className="flex items-start gap-3 rounded-xl border border-cyan-500/20 bg-cyan-50/70 p-4 dark:border-[#00e5ff]/15 dark:bg-[#00e5ff]/[0.035]">
              <Info
                size={16}
                className="mt-0.5 shrink-0 text-cyan-700 dark:text-[#00e5ff]"
                aria-hidden="true"
              />

              <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">
                This form uses your email application to prepare a message. No
                backend is connected, so the website itself does not store or
                send your message.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div
            className="reveal min-w-0 lg:col-span-7"
            style={{ transitionDelay: '0.1s' }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-white p-5 shadow-[0_0_40px_rgba(0,229,255,0.04)] transition-colors dark:border-[#00e5ff]/20 dark:bg-[#0b1420]/95 sm:p-7"
            >
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent dark:via-[#00e5ff]/70"
              />

              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-700 dark:text-[#00e5ff]/80">
                    Send a message
                  </p>

                  <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                    Get in touch
                  </h3>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-50 text-cyan-700 dark:border-[#00e5ff]/20 dark:bg-[#00e5ff]/[0.06] dark:text-[#00e5ff]">
                  <Send size={19} aria-hidden="true" />
                </div>
              </div>

              {/* Name */}
              <div className="mb-5">
                <label
                  htmlFor="contact-name"
                  className="mb-2 block font-mono text-xs text-slate-600 dark:text-slate-400"
                >
                  Your name
                </label>

                <input
                  type="text"
                  id="contact-name"
                  autoComplete="name"
                  value={formState.name}
                  onChange={(event) => {
                    setFormState((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }));

                    setErrors((previous) => ({
                      ...previous,
                      name: '',
                    }));

                    if (status !== 'idle') setStatus('idle');
                  }}
                  className={inputClass(Boolean(errors.name))}
                  placeholder="Enter your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? 'contact-name-error' : undefined
                  }
                />

                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-2 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-300"
                  >
                    <AlertCircle size={13} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-mono text-xs text-slate-600 dark:text-slate-400"
                >
                  Your email
                </label>

                <input
                  type="email"
                  id="contact-email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={(event) => {
                    setFormState((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }));

                    setErrors((previous) => ({
                      ...previous,
                      email: '',
                    }));

                    if (status !== 'idle') setStatus('idle');
                  }}
                  className={inputClass(Boolean(errors.email))}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? 'contact-email-error' : undefined
                  }
                />

                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="mt-2 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-300"
                  >
                    <AlertCircle size={13} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono text-xs text-slate-600 dark:text-slate-400"
                >
                  Your message
                </label>

                <textarea
                  id="contact-message"
                  rows={5}
                  value={formState.message}
                  onChange={(event) => {
                    setFormState((previous) => ({
                      ...previous,
                      message: event.target.value,
                    }));

                    setErrors((previous) => ({
                      ...previous,
                      message: '',
                    }));

                    if (status !== 'idle') setStatus('idle');
                  }}
                  className={`${inputClass(Boolean(errors.message))} resize-y leading-6`}
                  placeholder="Tell me about your opportunity, project, or idea..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                />

                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-2 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-300"
                  >
                    <AlertCircle size={13} />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-500/50 bg-cyan-50 px-5 py-3.5 text-sm font-semibold text-cyan-800 transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-100 hover:shadow-[0_0_25px_rgba(0,229,255,0.12)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-[#00e5ff]/50 dark:bg-[#00e5ff]/10 dark:text-[#00e5ff] dark:hover:border-[#00e5ff] dark:hover:bg-[#00e5ff]/15"
              >
                {status === 'sending' ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-600 dark:border-[#00e5ff]/30 dark:border-t-[#00e5ff]" />
                    Opening email client...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Prepare Message
                    <ArrowUpRight size={15} />
                  </>
                )}
              </button>

              {/* Success status */}
              {status === 'sent' && (
                <div
                  role="status"
                  className="mt-5 flex items-start gap-3 rounded-xl border border-cyan-500/25 bg-cyan-50 p-4 dark:border-[#00e5ff]/25 dark:bg-[#00e5ff]/[0.05]"
                >
                  <Check
                    size={17}
                    className="mt-0.5 shrink-0 text-cyan-700 dark:text-[#00e5ff]"
                  />

                  <p className="text-xs leading-6 text-slate-700 dark:text-slate-300">
                    Your email application should open with the message
                    prepared. Make sure to send the email from that application.
                    If it did not open, contact me directly at{' '}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="break-all text-cyan-800 underline underline-offset-4 dark:text-[#00e5ff]"
                    >
                      {personalInfo.email}
                    </a>
                    .
                  </p>
                </div>
              )}

              {/* Error status */}
              {status === 'error' && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-50 p-4 dark:border-red-400/25 dark:bg-red-400/[0.05]"
                >
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-600 dark:text-red-300"
                  />

                  <p className="text-xs leading-6 text-slate-700 dark:text-slate-300">
                    Something went wrong while opening your email application.
                    Please email me directly at{' '}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="break-all text-cyan-800 underline underline-offset-4 dark:text-[#00e5ff]"
                    >
                      {personalInfo.email}
                    </a>
                    .
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
