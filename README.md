# OBED ARKOH — Ghana Music Discovery

A responsive Ghanaian music discovery and streaming-interface project created by **Obed Arkoh** for the Pynexia Technology internship assignment.

**Tagline:** The Sound of Ghana. The Pulse of Africa.

## Features
- Responsive desktop and mobile layout
- Ghana Top 10 chart snapshot dated 11 November 2026
- Artist discovery cards with Wikimedia Commons image links where available
- Search across the displayed chart
- Persistent bottom audio player
- Play / pause, previous / next, seek, volume, shuffle, repeat and like controls
- HTML5 Audio API event handling (`loadedmetadata`, `timeupdate`, `ended`, `play`, `pause`)
- CSS waveform-style player accent and custom album art visuals

## Run locally
No build tools or dependencies are required.

1. Download and extract the ZIP.
2. Open `index.html` in a modern browser.
3. For best results, use VS Code Live Server or another local static server.

## Important content and audio notes
- The chart data in this project is a **dated snapshot**, not a live chart feed. It reflects the Apple Music Ghana chart dated **11 November 2026**, as recorded by ChartStats.
- The audio player uses a publicly accessible SoundHelix demonstration MP3 to demonstrate the HTML5 audio controls. It is **not** the actual commercial recording of the chart songs. The player labels chart metadata correctly and does not claim the demo track is the listed song.
- Album/playlist artwork in this student project is original CSS-generated visual artwork, not official album covers.
- Artist images are linked from Wikimedia Commons. Their individual licensing and attribution details should be checked on each file page before redistribution or commercial use. If an image fails to load, initials appear as a fallback.
- This project is a student demonstration and is not affiliated with Apple Music, MUSIGA, the artists, or their labels.

## Chart source
ChartStats — Ghana Apple Music Top Songs, chart dated 11 November 2026:
https://chartstats.com/GH/songs/2026-11-11

The displayed first 10 entries are:
1. Bra — Kweku Smoke
2. Faith — Kweku Smoke & Lasmid
3. Bombele — Kweku Smoke
4. BALOTELLI (SUPA) — Kofi Mole
5. Survival — Kweku Smoke
6. Forgiveness — Asake
7. Soul Healer — Kweku Smoke
8. Ikebe (feat. Asake) — Blaqbonez & Asake
9. B4 B4 — Davido, FOLA & Mayorkun
10. Hallelujah — Kweku Smoke

## Image references
- Black Sherif performance photo: https://commons.wikimedia.org/wiki/File:Black_Sherif.jpg
- Sarkodie performance photo: https://commons.wikimedia.org/wiki/File:Sarkodie-1.jpg
- Lasmid photo: https://commons.wikimedia.org/wiki/Category:Musicians_from_Ghana (verify current file details before reuse)

## Suggested GitHub repository
`pynexia-music-website`

## Suggested deployment
Deploy this static site with Vercel by importing the GitHub repository. No build command is needed; set the output directory to `.` (or leave the static-site defaults if detected).
