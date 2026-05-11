# Design Brief: Faith & Community — Church Youth Ministry

## Visual Direction
Modern spiritual aesthetic merging faith-centered reverence with youthful energy. Bold commitment to accessibility and community-first design. Not corporate, not overly trendy — intentional, welcoming, dignified.

## Tone & Differentiation
Spiritual yet contemporary. Emphasizes belonging, community, and hope without kitsch. Animations feel purposeful (fade-in, slide-up, float) rather than decorative. Deep royal blue conveys trust and spirituality; warm gold/amber adds energy and welcome. Designed intentionally for dark mode to enhance spiritual ambiance.

## Color Palette (OKLCH)

| Token | Light | Dark | Purpose |
|-------|-------|------|----------|
| Primary | 0.38 0.18 254 (Royal Blue) | 0.72 0.18 254 (Sky Blue) | CTAs, hero accents, active states |
| Secondary | 0.75 0.14 54 (Warm Gold) | 0.75 0.14 54 (Gold) | Highlights, energy accents |
| Accent | 0.65 0.2 54 (Deep Gold) | 0.75 0.18 54 (Bright Gold) | Emphasis, hover states |
| Background | 0.98 0.01 0 (Off-white) | 0.1 0.01 0 (Deep Navy) | Page base |
| Card | 1.0 0.01 0 (White) | 0.15 0.01 0 (Navy) | Elevation, sections |
| Foreground | 0.15 0.01 0 (Dark Grey) | 0.96 0.01 0 (Off-white) | Body text |
| Border | 0.88 0.01 0 (Light Grey) | 0.25 0.01 0 (Dark Grey) | Dividers, subtle edges |

## Typography
**Display:** General Sans (bold, geometric, youthful) — headlines, section titles, CTAs.
**Body:** Lora (humanist serif, warm, readable) — paragraphs, long-form content.
**Mono:** System monospace — code, data, technical content.

## Elevation & Depth
- `shadow-subtle`: 0 4px 6px -1px (light interactions, cards)
- `shadow-md`: 0 8px 12px 0 (elevated cards, modals)
- `shadow-elevated`: 0 20px 25px -5px (hero sections, floating elements)
- Dark mode: shadows use foreground opacity for consistency.

## Structural Zones

| Zone | Light | Dark | Purpose |
|------|-------|------|----------|
| Header/Nav | bg-card border-b | bg-card border-b (navy) | Elevation, clear separation |
| Hero | bg-primary with accent gradient | bg-primary with accent glow | Impact, welcome |
| Content Section | bg-background | bg-background (deep navy) | Breathing room |
| Alternating Section | bg-muted/30 | bg-muted/30 (subtle navy) | Rhythm, hierarchy |
| Footer | bg-muted border-t | bg-card border-t | Grounded, intentional |

## Spacing & Rhythm
- Base unit: 0.625rem (--radius). Spacing: 4px, 8px, 12px, 16px, 24px, 32px.
- Generous padding on cards (16px–24px) reflects community-focused warmth.
- Alternating bg-muted sections create visual rhythm without clutter.

## Component Patterns
- **Buttons:** Primary (blue bg, white text) + Secondary (gold bg, dark text) + Ghost (text only).
- **Cards:** Rounded md, subtle shadow, hover: lift (translate-y negative) + shadow-md + smooth transition.
- **Forms:** High-contrast labels, bordered input with gold focus ring, inline validation.
- **Navigation:** Horizontal header with logo + mobile hamburger. Sidebar optional for admin.

## Motion & Animation
- **fade-in:** 0.6s ease-out (hero, page load)
- **slide-up:** 0.5s ease-out (card reveals)
- **float:** 3s ease-in-out infinite (subtle accent movement)
- **Hover:** transition-lift (0.3s cubic-bezier easing) on interactive elements.
- Choreography: hero fades in, then cards slide-up sequentially. No jank, no overlapping animations.

## Constraints
- No raw hex or RGB colors; OKLCH-only for CSS.
- No generic stock gradients; gold/blue accents only.
- No bouncy or playful animations; spiritually respectful motion.
- Dark mode NOT inverted light theme — intentional palette swap for navy/gold harmony.
- Typography hierarchy: display for h1–h2, body serif for paragraphs, mono for metadata.

## Signature Detail
Gold + royal blue combination is distinctly church-modern. Warm serif body font humanizes community messaging. Intentional dark mode (not inverted) deepens spiritual ambiance. Smooth accordion motions on admin panels reflect composed, thoughtful interaction design.
