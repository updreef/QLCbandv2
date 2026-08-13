import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * Boekingsaanvraag:
 * 1. Lead opslaan in Supabase (als geconfigureerd) → zichtbaar in /admin
 * 2. E-mail naar Julian via FormSubmit (geen API-key nodig; Julian bevestigt
 *    het adres eenmalig via een mail van FormSubmit).
 *
 * Slaagt zolang minstens één kanaal werkt.
 */
const CONTACT_EMAIL = "hugenholtzjulian@gmail.com";

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Naam, e-mailadres en bericht zijn verplicht." },
      { status: 400 }
    );
  }

  let storedInDb = false;
  let emailSent = false;
  const problems: string[] = [];

  // 1 — Supabase lead (bonus: zichtbaar in /admin, als geconfigureerd)
  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: body.phone || null,
      subject: body.subject || null,
      message,
      status: "nieuw",
    });
    if (error) {
      problems.push(`supabase: ${error.message}`);
    } else {
      storedInDb = true;
    }
  }

  // 2 — E-mail naar Julian via FormSubmit (geen key nodig)
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: body.subject || `Nieuwe boekingsaanvraag — ${name}`,
        _template: "table",
        Naam: name,
        "E-mail": email,
        Telefoon: body.phone || "-",
        Bericht: message,
      }),
    });
    if (res.ok) {
      emailSent = true;
    } else {
      problems.push(`formsubmit: ${res.status} ${await res.text()}`);
    }
  } catch (e) {
    problems.push(`formsubmit: ${e instanceof Error ? e.message : "network error"}`);
  }

  if (problems.length > 0) {
    console.error("[contact] delivery problems:", problems.join(" | "));
  }

  if (!storedInDb && !emailSent) {
    console.log("[contact] UNDELIVERED LEAD:", JSON.stringify({ name, email, ...body }));
    return NextResponse.json(
      { error: "Versturen is niet gelukt. Bel ons direct: 06 40 08 19 79." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Je aanvraag is verzonden! We nemen binnen 24 uur contact met je op.",
  });
}
