// Utility to interact with Google Gemini 1.5 Flash API
// Supports both multimodal (text + base64 image) and standard text prompts

export interface GeminiContentPart {
  text?: string;
  inline_data?: {
    mime_type: string;
    data: string;
  };
}

export async function callGemini(
  systemInstruction: string,
  prompt: string,
  image?: { mimeType: string; base64: string }
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY_NOT_CONFIGURED');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const parts: GeminiContentPart[] = [];

  if (image) {
    // Strip header if present in data URL
    const cleanBase64 = image.base64.replace(/^data:[a-zA-Z0-9\/]+;base64,/, '');
    parts.push({
      inline_data: {
        mime_type: image.mimeType || 'image/jpeg',
        data: cleanBase64,
      },
    });
  }

  parts.push({ text: `${systemInstruction}\n\n${prompt}` });

  const payload = {
    contents: [
      {
        parts: parts,
      },
    ],
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      maxOutputTokens: 2500,
      responseMimeType: 'application/json',
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API Error:', response.status, errorText);
    throw new Error(`GEMINI_API_ERROR: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  const candidate = result.candidates?.[0];
  const textContent = candidate?.content?.parts?.[0]?.text;

  if (!textContent) {
    throw new Error('EMPTY_GEMINI_RESPONSE');
  }

  return textContent;
}
