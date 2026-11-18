# Raid Party Overlay (OBS + Whatnot, 1080×1920)

> **Two versions:**
> - **`raid-party-v2.html` (recommended):** a refined nightclub look. A silver mirror ball lit by a spotlight throws light spots around the room. Violet lasers frame the sides, gold and silver foil falls, and clean type shows "RAID FROM @Name". It keeps your face clear, and the music is a smooth house groove with no air horn. Change the colors with `?color=%2300d5ff` (lasers/glow) and `?gold=%23f3c969` (accents). Preview: `preview-v2.mp4`.
> - **`raid-party.html` (v1):** the loud, rainbow, air-horn version.
>
> Setup is identical for both. Just pick the file you want in step 1.

A 10-second party you play with one button when another seller raids your show: a disco ball drops in, lasers and spotlights sweep, the ball throws light spots around the room, confetti bursts, and a big neon **RAID PARTY!** appears with a "Welcome raiders" message. It includes its own synthesized music: a whoosh, an air horn and a disco beat. The background is transparent, so your camera stays visible underneath.

`preview.mp4` shows what it looks like (filmed on a gray stand-in background).

## 1. Add it to OBS (Mac)

1. Download `raid-party.html` and keep it somewhere permanent, e.g. `Documents/OBS Overlays/`.
2. In OBS, click **+** in Sources → **Browser** → name it `Raid Party`.
3. Set these properties:
   - ✅ **Local file** → Browse → choose `raid-party.html`
   - **Width** `1080`, **Height** `1920`, **FPS** `60`
   - ✅ **Control audio via OBS** (so the party music goes out on stream)
   - ✅ **Shutdown source when not visible**
   - ✅ **Refresh browser when scene becomes active**
   - Leave Custom CSS as is.
4. Make sure it's at the **top** of the source list and fills the canvas (right-click → Transform → Fit to screen).
5. Click the 👁 eye icon to **hide** it. It plays each time it's shown.

**Use it in every scene:** make a scene called `Overlays`, put the `Raid Party` source in it, then add the `Overlays` scene as a source (**+** → Scene) at the top of each show scene. Then one hotkey works everywhere.

### Personalize (optional)
To change the text, use **Local file** off and put this in **URL** instead (adjust the path):

```
file:///Users/YOURNAME/Documents/OBS%20Overlays/raid-party.html?name=CardShopJoe
```

| Option | What it does |
|---|---|
| `?name=CardShopJoe` | Shows "THANKS FOR THE RAID @CardShopJoe" |
| `?sub=Free%20pack%20giveaway%20next!` | Custom second line (instead of "say hi in the chat 👋") |
| `?sound=0` | Turns off the built-in music |
| `?volume=0.5` | Music volume, 0–1 (default 0.7) |
| `?dim=0` | No screen darkening (default 0.25 makes lasers pop) |

Combine options with `&`, e.g. `?name=CardShopJoe&volume=0.5`.

## 2. OBS hotkeys

OBS → **Settings → Hotkeys**, find the `Raid Party` entries (under the `Overlays` scene if you nested it):

- **Show 'Raid Party'** → e.g. `⌃⌥⌘R`
- **Hide 'Raid Party'** → e.g. `⌃⌥⌘H`

macOS: OBS needs **System Settings → Privacy & Security → Accessibility** (and **Input Monitoring**) turned on, or hotkeys won't work while another app is in front.

## 3. TourBox Elite one-button trigger

The overlay must be hidden and then shown to replay, so set up one button to do both:

1. Open **TourBox Console** → choose your OBS preset (or create one for OBS).
2. Pick a button → **Macro**:
   1. Key: `⌃⌥⌘H` (hide)
   2. Delay: `100 ms`
   3. Key: `⌃⌥⌘R` (show)
3. Save. One press = raid party. Pressing it again during the party restarts it.

The overlay fades to fully transparent by itself after 10 seconds, so you don't need to hide it after.

## Test it

Double-click `raid-party.html` to open it in Safari or Chrome and watch it play. Click or press Space to replay with sound (browsers block sound until you click).
