---
name: Awareness Operations Guide
description: A warm editorial handbook for understanding and operating the Awareness exhibition.
colors:
  clay: "#a9472d"
  clay-dark: "#83351f"
  clay-soft: "#f0d7cd"
  ink: "#181817"
  paper: "#f7f6f2"
  paper-deep: "#eeeae2"
  surface: "#fffefa"
  muted: "#65625e"
  line: "#d9d5cc"
  line-dark: "#b8b3aa"
  green: "#326b4f"
  green-soft: "#dce9df"
  status-green-ink: "#25593f"
  sand: "#e8ddc7"
  status-waiting-ink: "#79441f"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(3.7rem, 7.4vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.4rem, 5vw, 4.25rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.55rem"
    fontWeight: 500
    lineHeight: 1.15
  body:
    fontFamily: "Aptos, Segoe UI, ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Aptos, Segoe UI, ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.76rem"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "0.03em"
rounded:
  compact: "8px"
  control: "10px"
  surface: "14px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "110px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.clay-dark}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  project-summary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "32px"
  status-ready:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.status-green-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 11px"
  status-waiting:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.status-waiting-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 11px"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 16px 0 44px"
    height: "48px"
---

# Design System: Awareness Operations Guide

## Overview

**Creative North Star: "The Warm Operations Folio"**

Awareness presents practical project operations with the calm authority of a well-edited handbook. Warm paper, near-black ink, earthy clay accents, expressive serif headings, compact sans-serif utility text, and hairline rules turn dense operational material into a continuous, composed read.

The system is editorial rather than dashboard-like. Rows, sequences, and typographic contrast carry the hierarchy; bounded surfaces are rare and purposeful. Interaction remains direct and quiet, with authored line icons, restrained movement, and accessible focus states supporting the content instead of decorating it.

**Key Characteristics:**

- Warm cream and clay palette with near-black ink.
- Source Serif 4 for editorial voice; Aptos/Segoe UI for utility clarity.
- Hairline rows and reading sequences instead of repeated card grids.
- Bounded surfaces use a gentle 14px radius and little or no elevation.
- Authored single-stroke SVG arrows signal links and direction.
- Desktop composition at 1440px becomes a clean single-column reading flow at 390px.

## Colors

The palette behaves like warm printed matter: clay is the single expressive accent, while paper, ink, and fine neutral rules do most of the structural work.

### Primary

- **Editorial Clay:** Use for emphasized words, the closing action field, the hero rule, and small brand marks.
- **Deep Fired Clay:** Use for interactive hover states, inline actions, and security accents that need stronger contrast.
- **Pale Clay Wash:** Reserve for soft accent support; it must never compete with the main clay voice.

### Secondary

- **Operational Green / Soft Green:** Use only for ready/live status communication.
- **Muted Sand:** Use only for waiting or not-yet-ready status communication.

### Neutral

- **Warm Paper:** Default page canvas and the project-summary fill.
- **Deep Paper:** Hover fill and subtle tonal separation within the cream world.
- **Porcelain Surface:** The lightest bounded surface, button fill, and QR page canvas.
- **Near-Black Ink:** Primary text, strong rules, and the dark action button.
- **Warm Graphite:** Supporting copy and low-emphasis metadata.
- **Hairline Linen / Dark Linen:** Default and stronger border roles; lines carry structure more often than containers do.
- **Pure White:** High-contrast text on the dark and clay action fields.

**The One Clay Voice Rule.** Clay is the only expressive brand accent; status colors remain semantic and local.

**The Paper, Not White Rule.** Large backgrounds stay within the warm paper family so the guide retains its editorial atmosphere.

## Typography

**Display Font:** Source Serif 4 (self-hosted variable font, with Georgia fallback)  
**Body Font:** Aptos (with Segoe UI and system sans-serif fallbacks)

**Character:** The serif supplies warmth, confidence, and long-form continuity. The sans-serif keeps controls, metadata, and instructions compact and operational.

### Hierarchy

- **Display** (medium, fluid, tightly tracked): Reserved for the opening statement; balance lines and keep the composition spacious.
- **Headline** (medium, fluid, tightly tracked): Section and QR hero headings.
- **Title** (medium): Tool names, account names, workflow steps, and editorial row headings.
- **Body** (regular): Instructions and descriptions; explanatory lines generally stop near 62ch.
- **Label** (heavy, lightly tracked): Status pills and compact metadata; uppercase is reserved for field labels.

**The Serif Leads Rule.** Serif type owns names, headings, and editorial emphasis; sans-serif owns operation, navigation, status, and controls.

**The Medium, Not Bold Rule.** Large serif text remains at weight 500; scale and spacing establish authority without heavy display weights.

## Layout

Content sits inside a centered 1180px shell with 24px desktop gutters. The first viewport uses an asymmetric two-column grid—roughly 1.38fr to 0.62fr—with a minimum 620px hero height and a wide, fluid gap. Standard sections use 110px vertical padding and split headings into an editorial title column plus a restrained explanatory column.

At 960px, the hero and section headings become one column, workflow steps become two columns, and QR rows become two columns. At 720px, the shell moves to 16px gutters, navigation becomes a full-height menu below the 64px masthead, operational tables reflow, workflow and QR rows become one column, and sections tighten to 76px. The 430px refinement stacks dense tool rows. The shipped 1440px and 390px views must remain free of horizontal overflow.

**The Continuous Read Rule.** Prefer full-width editorial rows, ruled sequences, and clear section rhythm over grids of repeated cards.

**The 62ch Rule.** Supporting prose should remain near 62 characters per line so instructional copy scans quickly.

## Elevation & Depth

The system is flat by default. Tonal shifts and 1px rules establish hierarchy; the project summary is a border-only surface with no shadow. Elevation is reserved for elements that physically leave the document plane: the transient toast and the modal QR preview.

### Shadow Vocabulary

- **Live Halo:** A compact four-pixel status halo around the live indicator; semantic, not decorative.
- **Toast Lift:** A low floating shadow for transient confirmation messages.
- **Preview Lift:** The strongest shadow in the system, reserved for the modal QR image preview against its darkened backdrop.

**The Border Before Shadow Rule.** Use warm 1px rules and tonal separation first; never add ambient card shadows to ordinary content.

## Shapes

Bounded surfaces use gently rounded 14px corners. Controls use 10px corners; small utility buttons use 8px. Pills are reserved for statuses, while workflow numbers and the live dot are true circles. Editorial rows, bands, and section boundaries remain square so the page reads as a document rather than a field of cards.

**The Bounded Surface Rule.** Apply the 14px radius only to genuinely bounded objects such as the project summary and preview dialog, never to every section.

## Components

### Buttons

- **Shape:** Compact 10px corners with a 48px minimum height and firm 12px by 20px padding.
- **Primary:** Near-black fill and porcelain text; hover shifts to deep clay and lifts by 2px.
- **Secondary:** Porcelain fill with a dark linen border; hover strengthens the border to ink.
- **Focus:** A visible 3px clay outline with 4px offset is mandatory.

### Chips

- **Style:** Small, heavy sans-serif labels on semantic soft fills with a full pill radius.
- **State:** Green communicates ready/live; sand communicates waiting. Chips do not act as decorative categories.

### Cards / Containers

- **Corner Style:** Gentle 14px corners only for bounded surfaces.
- **Background:** Warm paper or porcelain surface according to surrounding contrast.
- **Shadow Strategy:** None at rest for the project summary; see the modal exception in Elevation & Depth.
- **Border:** One dark linen hairline around the summary, with lighter internal dividers.
- **Internal Padding:** 32px on desktop, tightening to 22px on narrow mobile screens.

### Inputs / Fields

- **Style:** 48px-tall porcelain field with a dark linen border, 10px corners, and an inline 18px search icon.
- **Focus:** Use the global clay focus outline without suppressing the native interaction state.
- **Placeholder:** Warm gray, visibly subordinate to entered text.

### Navigation

The masthead is a quiet paper band with a hairline lower rule. The serif brand pairs with a custom radial line mark; navigation links are compact sans-serif text that turn deep clay on hover. At 720px and below, a 42px bordered menu control opens a full-height paper panel with large serif link rows and hairline separators.

### Editorial Rows

Tool, account, workflow, and QR content is organized as ruled rows. Interactive rows shift to deep paper and move their content slightly on hover. Direction and external-link affordances use authored, round-capped SVG arrows at 1em rather than font glyphs or third-party icon packs.

### QR Preview

The protected-focus native dialog is a 14px bounded surface with a dark translucent, softly blurred backdrop. Its header uses a hairline divider, the image remains contained, and the original-file action appears below the preview.

## Do's and Don'ts

### Do:

- **Do** use warm paper, ink, and hairline rules as the primary hierarchy system.
- **Do** reserve clay for the brand voice, key actions, and interactive emphasis.
- **Do** pair Source Serif 4 headings with compact Aptos/Segoe UI utility text.
- **Do** preserve the 1180px shell, 24px desktop gutters, and 16px mobile gutters.
- **Do** keep authored SVG link icons optically light, round-capped, and aligned with text.
- **Do** verify both 1440px and 390px layouts without horizontal overflow.

### Don't:

- **Don't** replace editorial rows and sequences with a generic repeated-card dashboard.
- **Don't** add ambient shadows to the project summary or ordinary content surfaces.
- **Don't** spread the 14px radius across unbounded sections, bands, or row groups.
- **Don't** introduce additional expressive accent colors beside clay.
- **Don't** substitute a remote display font or icon library for the self-hosted serif and authored SVG set.
- **Don't** hide focus outlines or ignore the reduced-motion fallback.
