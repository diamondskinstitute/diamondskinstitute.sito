"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { ArrowRight } from "../ui/Icons";

// Iscrizione newsletter — SEGNAPOSTO.
// Per attivarla davvero: sostituisci `onSubmit` con la chiamata al tuo
// servizio (Mailchimp, Brevo, Resend…) o a una nuova API route.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div>
      <h2 className="font-serif text-lg text-cream">{site.newsletter.titolo}</h2>
      <p className="mt-2 text-sm leading-relaxed text-cream/55">
        {site.newsletter.testo}
      </p>

      {done ? (
        <p className="mt-4 text-sm text-gold-light">
          {site.newsletter.conferma}
        </p>
      ) : (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            {site.newsletter.placeholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={site.newsletter.placeholder}
            className="field flex-1"
          />
          <button
            type="submit"
            className="btn-primary !px-4"
            aria-label={site.newsletter.cta}
          >
            <ArrowRight />
          </button>
        </form>
      )}
    </div>
  );
}
