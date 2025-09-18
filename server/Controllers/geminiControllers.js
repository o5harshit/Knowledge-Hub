import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import DocumentModel from "../Models/DocumentModel.js";

dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const GenerateSummary = async (req, res) => {
  try {
    const { title, content } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Summarize the following document in 3-4 clear sentences (no extra commentary).

Title: ${title}
Content: ${content}`,
            },
          ],
        },
      ],
    });

    res.status(200).json({ success: true, message: response.text });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate summary" });
  }
};

export const GenerateTags = async (req, res) => {
  try {
    const { title, content } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate 3-7 concise, relevant tags for this document in JSON array format.

Title: ${title}
Content: ${content}`,
            },
          ],
        },
      ],
    });

    // Parse JSON array from text
    const tagsText = response.text.replace(/```json|```/g, "").trim();
    let tags = [];
    try {
      tags = JSON.parse(tagsText);
    } catch {
      tags = tagsText.split(",").map((t) => t.trim());
    }

    res.status(200).json({ success: true, message: tags });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate tags" });
  }
};

export const GenerateQans = async (req, res) => {
  try {
    const { question, docIds } = req.body;
    const doc = docIds?.length
      ? await DocumentModel.find({
          _id: { $in: docIds },
          isActive: true,
          isDeleted: false,
        })
      : await DocumentModel.find({ isActive: true, isDeleted: false });
    console.log(doc);
    if (!doc.length) {
      return res.status(400).json({
        success: false,
        message: "No documents available to answer this question.",
      });
    }
    const combinedContent = doc
      .map(
        (d) => `Title: ${d.title}\nContent: ${d.content}\nSummary: ${d.summary}`
      )
      .join("\n\n");

    const prompt = `
         You are an expert assistant. Answer the question based on the following documents. 
         Only use information from the documents.

        Documents: ${combinedContent}
        Question: ${question}
     Answer concisely and accurately.`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    res.status(200).json({ success: true, message: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate answer" });
  }
};
