export const runtime = 'edge';
export const maxDuration = 60;

export async function POST(req) {
  try {
    const body = await req.json();
    const { system, messages, max_tokens = 1024, stream = false, model } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'ANTHROPIC_API_KEY missing in Vercel environment variables' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const useModel = model || 'claude-haiku-4-5-20251001';

    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: useModel, max_tokens, system, messages, stream })
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      return new Response(
        JSON.stringify({ error: `API error ${apiRes.status}: ${errText.slice(0, 200)}` }),
        { status: apiRes.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (stream) {
      return new Response(apiRes.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    }

    const data = await apiRes.json();
    const text = data.content?.[0]?.text || '';
    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Server error: ${err.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
