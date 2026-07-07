import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Contact form submission endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, message, subject, phone } = req.body;
    
    if (!name || !email || !message) {
      res.status(400).json({ error: "Naam, e-mailadres en bericht zijn verplicht." });
      return;
    }
    
    console.log("=== NIEUWE BOEKING / CONTACT AANVRAAG ===");
    console.log(`Van: ${name} (${email})`);
    if (phone) console.log(`Telefoon: ${phone}`);
    if (subject) console.log(`Onderwerp: ${subject}`);
    console.log(`Bericht:\n${message}`);
    console.log(`Bestemming: Ruben_beukers@outlook.com`);
    console.log("=========================================");
    
    // In a production server, this would send an actual email via nodemailer, SendGrid, etc.
    // Here we log it and return a successful verification message.
    res.json({
      success: true,
      message: "Je aanvraag is verzonden! We nemen binnen 24 uur contact met je op."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
