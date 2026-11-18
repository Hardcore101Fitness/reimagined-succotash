# DateNight Breaks: Raid Party (OBS + Whatnot, 1080×1920)

When another seller raids your show, you type their name in a small panel inside OBS and press **START RAID PARTY**. Your stream gets a 15-second party in your brand colors (hot pink `#FF00A8` and electric blue `#14C8FA`), using Anton and Montserrat:

| Time | What happens |
|---|---|
| 0–1.4s | A silver mirror ball comes down under a spotlight while a whoosh builds |
| 1.4s | The lights come on: light spots fill the room, blue and pink lasers fade in, and **RAID FROM @TheirName** appears (with the number of raiders if you enter it) |
| 7.4s | The music lifts, a two-tone laser fan opens and more foil falls. The message changes to **"Tap follow so you never miss a break!"** |
| 11.4s | The name hands over to your **DateNight Breaks logo** with a glow |
| 13.6–15s | Everything fades out and the ball goes back up |

The background is transparent, so your camera stays visible underneath. Preview: `preview-datenight.mp4`.

## Files

Keep these together in one folder, e.g. `Documents/OBS Overlays/raid-party/`:

- `datenight-raid.html`: the overlay
- `raid-control.html`: the control panel
- `assets/`: your logo and the two fonts (both fonts are free to use under the OFL license; the license files are included)

## 1. Turn on OBS's WebSocket server (one time)

OBS → **Tools → WebSocket Server Settings**:
1. Tick **Enable WebSocket server**.
2. Click **Show Connect Info** and copy the **Server Password**.

(This needs OBS 28 or newer.)

## 2. Add the overlay

1. In OBS, make a scene called `Overlays`.
2. In that scene, click **+** → **Browser** → name it `Raid Party`.
3. Set these properties:
   - ✅ **Local file** → choose `datenight-raid.html`
   - **Width** `1080`, **Height** `1920`, **FPS** `60`
   - ✅ **Control audio via OBS**
   - ⬜ **Shutdown source when not visible**: leave it **off**
   - ⬜ **Refresh browser when scene becomes active**: leave it **off**
4. Leave it **visible** (eye on). It's invisible until a raid party plays.
5. Add the `Overlays` scene to the top of each show scene (**+** → **Scene** → `Overlays`).

To hear the music yourself, set the source to **Monitor and Output** in **Edit → Advanced Audio Properties**.

## 3. Add the control panel as a dock

1. OBS → **Docks → Custom Browser Docks…** (on older OBS: **View → Docks**).
2. **Dock Name:** `Raid Control`
3. **URL:** the full path to `raid-control.html`, for example:
   `file:///Users/YOURNAME/Documents/OBS%20Overlays/raid-party/raid-control.html`
   Tip: drag the file into Safari's address bar to see its exact `file:///` path, then copy it. Spaces become `%20`.
4. **Apply**, then dock the panel wherever you like.
5. In the panel, open **OBS connection**, paste the password and click **Connect**. When the dot turns green, you're set. It remembers the password.

### Using it on a raid
1. Type the raider's name, and how many raiders came if you know it.
2. Press **Enter** or click **START RAID PARTY**.
3. Recent raiders are saved as buttons, so a repeat raider is one click away.

Use **Play without name** if you didn't catch the name, and **Stop** to end it early. You can change the two messages under **Custom text**.

## 4. TourBox Elite button (optional)

A TourBox button replays the party with the **last name you used in the panel**, or the no-name version if you haven't used it yet.

1. OBS → **Settings → Hotkeys**. Under the `Overlays` scene, set **Show 'Raid Party'** (e.g. `⌃⌥⌘R`) and **Hide 'Raid Party'** (e.g. `⌃⌥⌘H`).
2. **TourBox Console** → your OBS preset → pick a button → **Macro**: `⌃⌥⌘H` → delay `100 ms` → `⌃⌥⌘R`.

The overlay only plays on a quick hide → show like this, so normal scene switching never sets it off.

On macOS, OBS needs **System Settings → Privacy & Security → Accessibility** (and **Input Monitoring**) for hotkeys to work while another app is in front.

## Test without OBS

Double-click `datenight-raid.html` to watch it in Safari or Chrome. Click to replay with sound. You can add `?name=CardShopJoe&count=148` to the end of the address to preview a name.

---

### Older versions
- `raid-party-v2.html`: the same nightclub look in violet and gold, without your branding or the panel.
- `raid-party.html`: the first, loud rainbow version.

Both play when the source is shown, so they use the setup in their own file comments (with **Shutdown source when not visible** turned on).
