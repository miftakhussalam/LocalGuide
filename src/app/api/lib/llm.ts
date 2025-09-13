const LLM_API = process.env.LOCAL_LLM_API || "http://localhost:8080/api/chat";

export type Place = {
  name: string;
  location: string;
  description: string;
  distance?: string;
};

export type responseMessage = {
  role: string;
  content: string;
}

export type responseData = {
  model: string;
  created_at: string;
  message: responseMessage;
};

export async function callLocalLLM(prompt: string): Promise<responseData> {
  const body = {
    model: "llama3",
    messages: [{ role: "user", content: prompt }],
    stream: false,
  };

  const res = await fetch(LLM_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`LLM error: ${text}`);
  }

  const data = await res.json() as responseData;

  return data;
}
