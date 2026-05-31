export const config = {
  runtime: "edge",
};

const VPS_TARGET = 
"https://alyan.hackerman9zd.store:443";

export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = VPS_TARGET + url.pathname + url.search;

  if (req.headers.get("upgrade")?.toLowerCase() === "websocket") {
    return fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
  }

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
