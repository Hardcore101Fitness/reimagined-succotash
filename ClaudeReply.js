// ClaudeReply — Scriptable script
// Setup: install Scriptable (free, App Store) → tap + → paste this code → name it "Claude Reply"
// Usage: take a screenshot, run this script, pick the screenshot, reply is copied to clipboard

const API_KEY = "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";

const SYSTEM = "You are drafting a reply on behalf of Mike. Match the tone and length of the incoming message. No emojis. No filler phrases. Never sound like AI or corporate speak. No dashes. No sign-off. Include a call to action when relevant. If complaint, stay calm. If spam, polite decline. If unclear, ask clarifying question. If compliment, stay humble and brief. Reply in same language as incoming message. Output only the reply text, nothing else.";

// Accept image from share sheet, or fall back to Photos picker
let image;
if (args.attachments && args.attachments.length > 0) {
  image = args.attachments[0];
} else {
  try {
    image = await Photos.fromLibrary();
  } catch (e) {
    Script.complete();
    return;
  }
  if (!image) { Script.complete(); return; }
}

// Encode image as base64 JPEG
const fm = FileManager.local();
const tmp = fm.joinPath(fm.temporaryDirectory(), "cr_tmp.png");
fm.writeImage(tmp, image);
const b64 = fm.read(tmp).toBase64String();

// Call Anthropic API with vision
const req = new Request("https://api.anthropic.com/v1/messages");
req.method = "POST";
req.headers = {
  "x-api-key": API_KEY,
  "anthropic-version": "2023-06-01",
  "content-type": "application/json"
};
req.body = JSON.stringify({
  model: "claude-haiku-4-5-20251001",
  max_tokens: 1024,
  system: SYSTEM,
  messages: [{
    role: "user",
    content: [
      {
        type: "image",
        source: { type: "base64", media_type: "image/png", data: b64 }
      },
      {
        type: "text",
        text: "Read the incoming message(s) in this screenshot and draft a reply."
      }
    ]
  }]
});

let res;
try {
  res = await req.loadJSON();
} catch (e) {
  const a = new Alert();
  a.title = "Request failed";
  a.message = String(e);
  a.addAction("OK");
  await a.present();
  Script.complete();
  return;
}

const reply = res?.content?.[0]?.text;

if (!reply) {
  const a = new Alert();
  a.title = "No reply received";
  a.message = JSON.stringify(res);
  a.addAction("OK");
  await a.present();
  Script.complete();
  return;
}

Pasteboard.copyString(reply);

const n = new Notification();
n.title = "Reply with Claude";
n.body = "Reply copied";
await n.schedule();

Script.complete();
