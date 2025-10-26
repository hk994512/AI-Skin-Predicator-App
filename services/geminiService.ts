
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    diseaseName: {
      type: Type.STRING,
      description: "The most likely name of the skin disease or condition.",
    },
    confidenceScore: {
      type: Type.NUMBER,
      description: "A confidence score from 0 to 100 on the accuracy of the diagnosis.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed but easy-to-understand description of the condition, its causes, and common symptoms.",
    },
    recommendedTreatment: {
      type: Type.STRING,
      description: "General advice on next steps, potential treatments, or when to see a doctor. Start with a clear disclaimer that this is not medical advice.",
    },
  },
  required: ["diseaseName", "confidenceScore", "description", "recommendedTreatment"],
};

export const analyzeSkinCondition = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: "Analyze this image of a skin condition. Identify the most likely disease, provide a confidence score between 0 and 100, a detailed description, and suggest potential treatments or next steps. It is crucial to start the 'recommendedTreatment' field with a disclaimer stating this is not medical advice and a doctor should be consulted. Return the response in the specified JSON format."
          }
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Basic validation
    if (
      typeof result.diseaseName !== 'string' ||
      typeof result.confidenceScore !== 'number' ||
      typeof result.description !== 'string' ||
      typeof result.recommendedTreatment !== 'string'
    ) {
      throw new Error("Invalid response structure from API");
    }

    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI service.");
  }
};
