# Recall background verification

Checked on 8 October 2026 against the original local file, `ChatGPT Image Aug 30, 2026, 08_48_07 PM.png`, and the raw Git blob fetched from `origin/codex/portfolio-content-2027`.

The local source and committed PNG are byte-identical and have identical decoded pixels. Both are 1619 × 971 pixels, sRGB, with no embedded colour profile or alpha channel. Their SHA-256 is:

`23835e0af3a5ae52da84127a71fa1da258048009d25f0d8e6a34c080475fce4e`

The comparison export supplied later, `Recall_original_background_from_ChatGPT.png`, has SHA-256 `b6b8233c871b6fade72ad3fec6618464aff09fb5b14ded317a4b50d7dd12292b` and is 3,274,533 bytes. It has the same dimensions and colour space, but includes an opaque alpha channel. Comparing both images after decoding to RGBA found zero differing channels: their visual content is identical. Both were also viewed directly. The byte difference is an export difference, not a different background, so the existing PNG was not replaced.

## Loading improvement

The original PNG remains unchanged at `/projects/recall/background.png`. A derived lossless WebP at `/projects/recall/background-lossless.webp` is preferred through `<picture>`, with the PNG retained as fallback.

- PNG: 2,710,175 bytes.
- WebP: 2,073,264 bytes — 23.50% smaller.
- No resize, crop, palette reduction, or lossy compression was applied.
- Decoded RGBA buffers were compared byte-for-byte and are identical.
- The Recall title, SVG waveform, frame, hover behaviour, and reduced-motion behaviour are unchanged.
- The below-fold card stays lazy-loaded; opening the dialog eagerly requests the selected source. The PNG is not preloaded alongside the WebP.

WebP SHA-256: `971b61fd9ca37eacefd7e88f80a4ffe93e305490abacb206ee47460eab656a16`.

This is a measured transfer-size saving, not a claimed loading-time benchmark. The original Downloads file was not modified.

## Browser checks

Compared the PNG fallback and WebP in the real project card at 1440, 768, and 390 pixels, in both themes and with reduced motion enabled and disabled (12 combinations). Screenshot differences were at most one colour level out of 255 on fewer than 0.1% of channels, consistent with browser edge rasterization; the decoded source pixels are exactly equal. Confirmed that WebP is selected in both the card and dialog, the PNG is not also requested, the waveform honours reduced motion, Escape closes the dialog, and no page errors occur.

Lint, typecheck, all 12 content tests, and the production build passed. The pull-request workflow runs these checks without deployment steps or runtime secrets.
