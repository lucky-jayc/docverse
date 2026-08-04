import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Gemini AI OCR & Document Intelligence Endpoint
  app.post("/api/ocr", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY is not configured on the server." 
        });
      }

      const { imageBase64, mimeType = "image/png", prompt } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "No image payload provided for OCR." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const defaultPrompt = prompt || "Extract all visible text from this document image cleanly. Preserve formatting and layout headings where possible.";

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
                  mimeType,
                },
              },
              { text: defaultPrompt },
            ],
          },
        ],
      });

      const extractedText = response.text || "No text could be extracted from the image.";
      res.json({ success: true, text: extractedText });
    } catch (err: any) {
      console.error("Gemini OCR error:", err);
      res.status(500).json({ error: err.message || "Failed to run OCR on document." });
    }
  });

  // AI Summarization & Translation API
  app.post("/api/ai-tool", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ error: "GEMINI_API_KEY missing." });
      }

      const { text, action, targetLanguage } = req.body;
      if (!text) {
        return res.status(400).json({ error: "No text content provided." });
      }

      const ai = new GoogleGenAI({ apiKey });
      let systemPrompt = "Analyze and summarize this document text in bullet points with key insights:";
      if (action === "translate") {
        systemPrompt = `Translate the following text into ${targetLanguage || "English"} accurately while maintaining formatting:`;
      } else if (action === "proofread") {
        systemPrompt = "Fix grammar, spelling, and polish the style of the following text:";
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemPrompt}\n\n${text}`,
      });

      res.json({ success: true, result: response.text });
    } catch (err: any) {
      console.error("AI Tool Error:", err);
      res.status(500).json({ error: err.message || "AI task failed." });
    }
  });

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
