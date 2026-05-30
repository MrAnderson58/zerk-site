/**
 * Vercel Serverless — OpenAI proxy for ZERK Assistant
 *
 * Env: OPENAI_API_KEY (required)
 * Optional: OPENAI_MODEL (default gpt-4o-mini)
 *
 * POST /api/chat
 * Body: { "messages": [{ "role": "user"|"assistant"|"system", "content": "..." }] }
 * Response: { "reply": "..." }
 */

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'OPENAI_API_KEY not configured' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: messages.slice(-20),
        temperature: 0.6,
        max_tokens: 600,
      }),
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      console.error('[api/chat]', data);
      return res.status(openaiRes.status).json({
        error: data.error?.message || 'OpenAI request failed',
      });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ error: 'Empty response from model' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply, model });
  } catch (err) {
    console.error('[api/chat]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
