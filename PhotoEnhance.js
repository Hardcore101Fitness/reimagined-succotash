// PhotoEnhance — Scriptable script
// Setup: install Scriptable (free, App Store) → tap + → paste this code → name it "Photo Enhance"
// Usage: share a photo to this script; the enhancement prompt is sent to Claude and the response is copied to clipboard

const API_KEY = "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";

const ENHANCEMENT_PROMPT = `Ultra-high-resolution 4K enhancement based strictly on the provided reference image. Absolute fidelity to original facial anatomy, proportions, and identity. Preserve expression, gaze, pose, camera angle, framing, and perspective with zero deviation. Clothing, hair, skin, and background elements must remain unchanged in structure, placement, and design. Recover fine-grain detail with natural realism. Enhance pores, fine lines, hair strands, eyelashes, fabric weave, seams, and material edges without introducing stylization. Maintain original color science, white balance, and tonal relationships exactly as captured. Lighting direction, intensity, contrast, and shadow behavior must match the source image precisely, with only improved clarity and expanded dynamic range. No relighting, no reshaping. Remove any grain. Apply controlled sharpening and high-frequency detail reconstruction, remove compression artifacts and noise while retaining authentic texture. No smoothing, no plastic skin, no artificial gloss. Facial features must remain consistent across the entire image with coherent anatomy and clean, stable edges. Negative constraints: no warping, no facial drift, no added or missing anatomy, no altered hands, no distortions, no perspective shift, no text or graphics, no hallucinated detail, no stylized rendering. Output must read as a true-to-life, photorealistic upscale that matches the reference exactly, only clearer, sharper, and higher resolution.`;

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

// Encode image as base64 PNG
const fm = FileManager.local();
const tmp = fm.joinPath(fm.temporaryDirectory(), "pe_tmp.png");
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
  max_tokens: 2048,
  messages: [{
    role: "user",
    content: [
      {
        type: "image",
        source: { type: "base64", media_type: "image/png", data: b64 }
      },
      {
        type: "text",
        text: ENHANCEMENT_PROMPT
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

const result = res?.content?.[0]?.text;

if (!result) {
  const a = new Alert();
  a.title = "No response received";
  a.message = JSON.stringify(res);
  a.addAction("OK");
  await a.present();
  Script.complete();
  return;
}

Pasteboard.copyString(result);

const n = new Notification();
n.title = "Photo Enhance";
n.body = "Response copied to clipboard";
await n.schedule();

Script.complete();
