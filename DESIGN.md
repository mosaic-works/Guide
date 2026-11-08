---
name: Awareness Operations Guide
description: A quiet editorial guide with a hidden system-aware light and dark palette.
colors:
  canvas-light: "#F7F5F0"
  hero-light: "#EFECE4"
  card-light: "#EAE4DA"
  hover-light: "#E2DBD0"
  accent-light: "#B5563C"
  accent-text-light: "#8F402B"
  on-accent-light: "#FFFDF9"
  ink-light: "#23201D"
  muted-light: "#6E675F"
  line-light: "#DCD5C9"
  canvas-dark: "#161513"
  hero-dark: "#1C1A17"
  card-dark: "#22201D"
  hover-dark: "#2C2925"
  accent-dark: "#D47459"
  on-accent-dark: "#161513"
  ink-dark: "#F0ECE1"
  muted-dark: "#A39C93"
  line-dark: "#302D28"
  qr-paper: "#F7F5F0"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.55rem, 3.3vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.8rem, 2.3vw, 2.35rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Aptos, Segoe UI, ui-sans-serif, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Aptos, Segoe UI, ui-sans-serif, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 750
    lineHeight: 1.2
  mono:
    fontFamily: "Consolas, Courier New, monospace"
    fontSize: "0.88rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  utility: "8px"
  control: "10px"
  media: "12px"
  surface: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "34px"
  xxl: "48px"
  section: "104px"
components:
  button-primary-light:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.on-accent-light}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  button-primary-dark:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.on-accent-dark}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  card-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.surface}"
  card-dark:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.surface}"
---

# Design System: Awareness Operations Guide

## Overview

**Creative North Star: "The System-Aware Exhibition Folio"**

Awareness is a practical Vietnamese guide presented as a calm editorial document. The default Warm Editorial palette follows the visitor's operating-system appearance through CSS. The color change is automatic and has no visible switch. The same typography, layout, QR behavior, and navigation work in both appearances.

The page uses a 60/30/10 relationship: the canvas dominates, cards and supporting bands form a second plane, and the accent is reserved for actions and small signals. This is a visual allocation rule, not a pixel-by-pixel quota. The account section uses one flat card color without a wash or gradient.

**Key Characteristics:**

- Warm Editorial is the default; Mindful Sage and Nordic Sand & Slate remain hidden CSS configurations.
- Paired light and dark tokens share the same color family and reverse the lightness hierarchy.
- Source Serif 4 headings and compact sans-serif controls keep long content readable.
- Sections remain full-width rows; cards are used for bounded information and QR assets.
- Reduced-motion preferences preserve state changes without spatial animation.

## Colors

`styles.css` defines the active roles as `--canvas`, `--hero-field`, `--card`, `--hover`, `--accent`, `--on-accent`, `--ink`, `--muted`, and `--line`. The browser selects the dark values through `prefers-color-scheme: dark`. The root `data-palette` attribute can select `mindful-sage` or `nordic-sand-slate` without adding a UI control. Absence of that attribute selects Warm Editorial.

| Role | Approximate area | Warm light | Warm dark |
| --- | --- | --- | --- |
| Canvas | 60% | `#F7F5F0` | `#161513` |
| Hero diagonal | Supporting ground | `#EFECE4` | `#1C1A17` |
| Card and supporting band | 30% | `#EAE4DA` | `#22201D` |
| Hover | Temporary state | `#E2DBD0` | `#2C2925` |
| CTA | 10% | `#B5563C` | `#D47459` |
| Text on CTA | Contrast pair | `#FFFDF9` | `#161513` |
| Primary text | Reading | `#23201D` | `#F0ECE1` |
| Muted text | Description | `#6E675F` | `#A39C93` |
| Border | Hairline | `#DCD5C9` | `#302D28` |

The same roles are available as hidden presets:

| Preset | Role | Light | Dark |
| --- | --- | --- | --- |
| Mindful Sage | Canvas / hero | `#F4F6F3` / `#EBF0E9` | `#121614` / `#171C19` |
| Mindful Sage | Card / hover | `#E3E8E1` / `#D8E0D5` | `#1D2420` / `#262F2A` |
| Mindful Sage | CTA / CTA text | `#3A5A40` / `#F4F6F3` | `#76A07E` / `#121614` |
| Mindful Sage | Ink / muted / line | `#1C241E` / `#5C665E` / `#CFD6CC` | `#E8EDE9` / `#94A197` / `#2B352E` |
| Nordic Sand & Slate | Canvas / hero | `#F6F6F4` / `#EEEEEB` | `#141619` / `#191C20` |
| Nordic Sand & Slate | Card / hover | `#E6E6E1` / `#DDDDD6` | `#1F2328` / `#282D34` |
| Nordic Sand & Slate | CTA / CTA text | `#3D5A6C` / `#FFFFFF` | `#6E98B3` / `#141619` |
| Nordic Sand & Slate | Ink / muted / line | `#1E2226` / `#636970` / `#D4D4CE` | `#ECEEEF` / `#969FA8` / `#2E343B` |

Small accent-colored text uses a darker Warm Editorial light derivative (`--accent-text`) so labels on cards stay legible. QR artwork retains a light `--qr-paper` backing in either appearance for scanner readability.

| HSL target | Light | Dark |
| --- | --- | --- |
| Main canvas | L 95–97%, S 15–25% | L 8–10%, S 6–12% |
| Card | L 89–92%, 4–6 points below canvas | L 13–16%, 4–6 points above canvas |
| Hover | L 86–88%, 7–9 points below canvas | L 17–20%, 8–10 points above canvas |
| CTA | L 42–48%, S 50–60% | L 60–68%, S 50–60% |
| Main text / muted / border | L 12–15% / 40–45% / 82–85% | L 90–94% / 60–65% / 18–22% |

These are composition targets. The supplied hexadecimal pairs above and in `styles.css` are the implementation values.

**The Lightness Mirror Rule.** Keep the hue family stable. In light mode, the canvas is the lightest broad plane, the card is slightly darker, and hover darker again. In dark mode, the canvas is the darkest plane, the card is slightly lighter, and hover lighter again. The accent becomes lighter on dark ground. Avoid pure white and pure black for broad surfaces.

**The Contrast Rule.** Primary text must exceed 10:1 on canvas and card. Muted labels and controls keep readable contrast in both appearances. The CTA always uses its matching `--on-accent` token.

## Typography

Source Serif 4 remains the display face; Aptos, Segoe UI, and system sans-serif carry navigation, guidance, controls, and metadata. Consolas is used only for commands and machine-readable values. The display heading tops out at 3.5rem, section headings at 2.35rem, and tool or account titles at 1.25rem. Body copy stays near 1rem, with the hero description at 1–1.125rem. The scale steps down again below 720px.

## Layout

The shell is 1180px wide with 24px desktop gutters and 16px mobile gutters. The first viewport splits its statement and project summary; at 960px it becomes one column. At 1100px navigation becomes a panel; at 720px operational rows and workflow steps stack. The theme changes token values without changing content order or responsive structure.

## Elevation & Depth

Card and closing-section separation comes from the card tone and quiet borders. Ordinary reading rows stay flat. Shadows are reserved for the primary action, QR hover, transient toast, image-detail frame, and protected QR preview. The accent remains scarce relative to the canvas and card fields.

## Shapes

Bounded surfaces use a 16px radius, controls 10px, and media wells 12px. Pills are reserved for statuses and filters. Editorial rows and section bands remain square. The hero and page-level moments use a narrow accent rule rather than a multicolor stripe.

## Components

### Buttons and navigation

Primary buttons use `--accent` and `--on-accent`; their dark accent is visibly lighter. Secondary buttons use card and border tokens. Focus uses a visible accent outline. Navigation text follows `--ink` and uses `--accent-text` on hover.

The Awareness wordmark pairs its name with an orange `✯` that spins continuously; reduced-motion preferences limit it to one brief turn. Active status labels and the live indicator use a separate green success color.

### Sections and cards

The Awareness summary and closing section use `--card`, separated from `--canvas` with a quiet line. The account section is a flat `--card` field; its rows use `--hover` only during interaction. Accordion motion preserves height and opacity continuity and respects `prefers-reduced-motion`.

### QR and image pages

QR filters, search, cards, preview, and hidden image-data pages inherit the same theme roles. QR images sit on `--qr-paper` so transparent codes do not disappear against the dark UI. The QR preview remains a native dialog with a darkened backdrop.

## Do's and Don'ts

### Do:

- **Do** use semantic roles for every appearance-sensitive color.
- **Do** keep the automatic system preference hidden from the visible interface.
- **Do** keep the card and hover lightness steps distinct in both modes.
- **Do** retain readable text and focus indication across all pages.
- **Do** use the light QR backing even in dark mode.

### Don't:

- **Don't** invert images or QR artwork when changing appearance.
- **Don't** use pure white or pure black as large page backgrounds.
- **Don't** use a gradient for the account section.
- **Don't** turn the 60/30/10 guide into an exact area calculation.
