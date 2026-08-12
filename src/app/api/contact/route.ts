import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * Boekingsaanvraag:
 * 1. Lead opslaan in Supabase (als geconfigureerd) → zichtbaar in /admin
 * 2. E-mailnotificatie via Resend (als RESEND_API_KEY gezet) → CONTACT_EMAIL
 *
 * Slaagt zolang minstens één van de twee kanalen werkt, zodat een
 * ontbrekende API-key nooit een aanvraag laat verdwijnen zonder feedback.
 */
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

  // 1 — Supabase lead
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

  // 2 — E-mail via Resend (REST, geen SDK nodig)
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || "hugenholtzjulian@gmail.com";
  if (resendKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "QLC Website <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: body.subject || `Nieuw bericht van ${name}`,
          text: `Van: ${name} <${email}>${body.phone ? `\nTelefoon: ${body.phone}` : ""}\n\n${message}`,
        }),
      });
      if (res.ok) {
        emailSent = true;
      } else {
        problems.push(`resend: ${res.status} ${await res.text()}`);
      }
    } catch (e) {
      problems.push(`resend: ${e instanceof Error ? e.message : "network error"}`);
    }
  }

  if (problems.length > 0) {
    console.error("[contact] delivery problems:", problems.join(" | "));
  }

  if (!storedInDb && !emailSent) {
    // Niets geconfigureerd of alles faalde: log de aanvraag zodat er in elk
    // geval een spoor is, en wees eerlijk richting de bezoeker.
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
