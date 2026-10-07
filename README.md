# Concept B — Industrial / Transport / B2B Logistics

Independent design concept. Original Concept A files are unchanged.

Run the existing `npm start` in the project root and open http://127.0.0.1:4173/concept-b/index.html. No install or build required. This folder can also be deployed as a standalone static website.

Architecture retains the original 800px mobile breakpoint, native menu state, Escape handling, native modal dialogs and backdrop dismissal, lazy image loading, explicit image dimensions, local assets and reduced-motion handling. The curved hero and overlapping service/about compositions are intentionally replaced. No GSAP payload or eager image sequence is needed for the single-photo hero.

Mobile uses a separately composed photograph above the headline and a native horizontal service browser with snap, arrow buttons and keyboard support. Desktop uses a 56/44 rectangular hero split and a 2 × 2 editorial photo grid.

The brand is a neutral placeholder. Business facts and contact details are visibly bracketed placeholders. The contact action opens an inquiry preparation guide; it does not send messages. Confirm company name, routes, fleet, warehouse capabilities, certifications and contact details before publishing.

Local sample photographs are from Unsplash (not photographs of the future company):
- fleet.jpg: https://images.unsplash.com/photo-1601584115197-04ecc0da31d7
- transport.jpg: image ID photo-1519003722824-194d4455a60c
- warehouse.jpg: image ID photo-1586528116311-ad8dd3c8310d
- distribution.jpg: image ID photo-1494412519320-aa613dfb7738

Replace these reference photographs with approved company photography before launch.

## Video Hero comparison
- `index-photo.html`: preserved photograph version.
- `index.html` and `index-video.html`: video version, also used by the project root homepage.
- Run `node server-video.cjs` from the project root for preview on port 4175 (MP4 MIME support).
- Browser-ready H.264 video: `assets/hero-video-v2.mp4`, with fast-start metadata and no audio. Only the current web video and its poster are retained in the assets folder.
- Muted loop playback, pause/resume control, and static first-frame poster for reduced motion.


