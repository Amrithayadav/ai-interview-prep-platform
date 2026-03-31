const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// ✅ FINAL FIXED SCHEMA (MATCHES FRONTEND)
const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestions: z
    .array(
      z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string(),
      }),
    )
    .min(3),

  behavioralQuestions: z
    .array(
      z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string(),
      }),
    )
    .min(2),

  skillGaps: z
    .array(
      z.object({
        skill: z.string(),
        severity: z.enum(["low", "medium", "high"]),
      }),
    )
    .min(1),

  preparationPlan: z
    .array(
      z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.array(z.string()), 
      }),
    )
    .min(5),

  title: z.string(),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
 
  const prompt = `
You are an expert interview coach.

Return ONLY valid JSON. No markdown, no explanation.

STRICT REQUIREMENTS:
- technicalQuestions MUST contain minimum 10 questions
- behavioralQuestions MUST contain minimum 10 questions
- Do NOT return fewer or more items
- All questions must be tailored to the Job Description
- Answers must be strong, clear, and realistic (not generic)


JSON structure must be:

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": string,
      "tasks": string[]
    }
  ],
  "title": string
}
ADDITIONAL RULES:
- technicalQuestions must be practical, real interview questions (not theory only)
- behavioralQuestions must follow real HR patterns (e.g., conflict, teamwork, failure)
- skillGaps must reflect missing or weak areas compared to the job
- preparationPlan must contain AT LEAST 7 days
- Each day must include 2–4 actionable tasks
- Keep answers concise but high-quality
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  // ✅ SAFE JSON PARSE
  let parsed;
  try {
    parsed = JSON.parse(response.text);
  } catch (err) {
    console.error("RAW AI RESPONSE:", response.text);
    throw new Error("AI did not return valid JSON");
  }

  return parsed;
}

// ─────────────────────────────────────────────

async function genereratePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumepdfSchema = z.object({
    html: z.string(),
  });
const prompt = `
You are a professional resume writer and ATS optimization expert.

Generate a highly professional, clean, and modern resume in HTML format.

⚠️ STRICT RULES:
- Return ONLY valid JSON (no markdown, no explanation)
- Output format must be:
{
  "html": "<full HTML document>"
}
- The HTML must be a complete document: <!DOCTYPE html>, <html>, <head>, <body>
- Use clean inline CSS (no external links)
- Use simple, readable fonts (Arial, Helvetica, sans-serif)
- Ensure the design is minimal, professional, and ATS-friendly
- Avoid excessive colors, graphics, or complex layouts
- Keep it 1–2 pages when converted to PDF

🎯 CONTENT REQUIREMENTS:
- Tailor the resume specifically to the given Job Description
- Highlight relevant skills, projects, and experience
- Use strong action verbs and measurable impact (e.g., "Improved performance by 30%")
- Make it sound natural and human-written (NOT robotic or generic)
- Remove irrelevant or weak content
- Prioritize clarity and readability

📄 STRUCTURE:
Include these sections (only if relevant):
- Header (Name, Email, Phone, LinkedIn/GitHub)
- Professional Summary (2–3 lines max)
- Skills (grouped, concise)
- Experience (bullet points, achievement-focused)
- Projects (with impact and tech stack)
- Education
- Optional: Certifications / Achievements

🎨 DESIGN GUIDELINES:
- Use clear section headings
- Add subtle spacing and alignment
- Use bullet points for readability
- Use light borders or separators if needed
- Keep layout clean (no tables for main layout)

🚫 DO NOT:
- Add fake data
- Add explanations outside JSON
- Use markdown (###, **, etc.)
- Over-design the resume

Resume (raw content):
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumepdfSchema),
    },
  });

  // ✅ SAFE PARSE
  let jsonContent;
  try {
    jsonContent = JSON.parse(response.text);
  } catch (err) {
    console.error("RAW AI RESPONSE:", response.text);
    throw new Error("AI did not return valid JSON");
  }

  const pdfBuffer = await genereratePdfFromHtml(jsonContent.html);
  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
