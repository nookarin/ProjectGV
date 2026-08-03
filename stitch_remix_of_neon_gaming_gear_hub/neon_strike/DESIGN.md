---
name: Neon Strike
colors:
  surface: '#13121b'
  surface-dim: '#13121b'
  surface-bright: '#3a3842'
  surface-container-lowest: '#0e0d16'
  surface-container-low: '#1c1a24'
  surface-container: '#201e28'
  surface-container-high: '#2a2933'
  surface-container-highest: '#35333e'
  on-surface: '#e5e0ee'
  on-surface-variant: '#d0c2d5'
  inverse-surface: '#e5e0ee'
  inverse-on-surface: '#312f39'
  outline: '#998d9e'
  outline-variant: '#4d4353'
  surface-tint: '#e0b6ff'
  primary: '#e0b6ff'
  on-primary: '#4c007d'
  primary-container: '#9d4edd'
  on-primary-container: '#fffdff'
  inverse-primary: '#8433c4'
  secondary: '#ddb8ff'
  on-secondary: '#490081'
  secondary-container: '#62259b'
  on-secondary-container: '#d1a1ff'
  tertiary: '#fface8'
  on-tertiary: '#5e0053'
  tertiary-container: '#d500bf'
  on-tertiary-container: '#fffeff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f2daff'
  primary-fixed-dim: '#e0b6ff'
  on-primary-fixed: '#2e004e'
  on-primary-fixed-variant: '#6a0baa'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb8ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#62259b'
  tertiary-fixed: '#ffd7f0'
  tertiary-fixed-dim: '#fface8'
  on-tertiary-fixed: '#3a0033'
  on-tertiary-fixed-variant: '#840076'
  background: '#13121b'
  on-background: '#e5e0ee'
  surface-variant: '#35333e'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered for a high-performance gaming gear e-commerce experience. The brand personality is aggressive, futuristic, and tech-oriented, designed to resonate with competitive gamers and hardware enthusiasts. 

The visual style blends **Modern Brutalism** with **Vaporwave-inspired Glassmorphism**. It utilizes a deep, nocturnal foundation punctuated by high-energy neon accents. The emotional response should be one of adrenaline and precision, mimicking the aesthetic of high-end RGB-lit gaming rigs. Key visual drivers include high-contrast interactive states, luminous depth, and sharp, intentional geometry.

## Colors
The palette is rooted in a "Deep Dark" ecosystem to allow neon accents to vibrate against the background.

- **Primary Background (#0F0E17):** A saturated dark base that provides infinite depth.
- **Surface/Card (#1A1825):** Used for structural elements to create subtle separation from the background.
- **Primary Neon Purple (#9D4EDD):** The main action color for CTAs, signifies "Power" and "Interaction."
- **Accent Purple (#C084FC):** A lighter, more luminous variant used for hover states and internal glows.
- **Support Neon:** Use a tertiary hot pink/magenta for "SALE" or "HOT" badges to create visual urgency.

## Typography
Since "Kanit" was requested but not in the available library, **Sora** is utilized for its aggressive geometric qualities and wide stance, which mirrors the "Kanit" aesthetic perfectly. **Space Mono** is introduced for technical labels and data points to reinforce the "tech-oriented" narrative.

Headlines should utilize wide tracking (letter-spacing) to feel expansive and cinematic. Body text is kept clean with generous line height to ensure readability against dark backgrounds. Use "Label-Caps" for categories and technical specs.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a heavy emphasis on "Section Stacking." 

- **Desktop:** 12-column grid with 24px gutters. Wide outer margins (80px) focus the eye on high-fidelity product photography.
- **Mobile:** 4-column grid with 16px gutters.
- **Philosophy:** Spacing should be aggressive. Use large vertical gaps (stack-lg or more) between major sections to mimic the airy feel of a premium showroom. Elements within a card or component should be tightly packed to feel "engineered."

## Elevation & Depth
This design system avoids traditional drop shadows in favor of **Luminous Depth** and **Glassmorphism**.

1.  **Level 0 (Base):** #0F0E17.
2.  **Level 1 (Cards):** #1A1825 with a 1px solid border of rgba(157, 78, 221, 0.2).
3.  **Level 2 (Glass):** Used for Navbars and Overlays. `background: rgba(26, 24, 37, 0.7)` with `backdrop-filter: blur(10px)`.
4.  **Interactive Glow:** Primary buttons and active states use an "External Neon Bloom": `box-shadow: 0 0 15px rgba(168, 85, 247, 0.5)`.
5.  **Hover State:** Cards should lift slightly and increase border opacity from 0.2 to 0.8 on hover, triggering a soft purple floor-glow.

## Shapes
To maintain an "aggressive" and "technical" feel, the roundedness is kept to a **Soft (1)** level (4px - 12px). 

- **Small Components:** Checkboxes and small tags use `rounded-sm` (4px).
- **Standard Components:** Buttons and Input fields use `rounded-md` (8px).
- **Containers:** Product cards and modals use `rounded-lg` (12px).
Avoid pill-shaped or overly rounded elements as they diminish the "sharpness" of the gaming aesthetic.

## Components

### Buttons
- **Primary:** Solid #9D4EDD background, white text, 8px radius. On hover, apply the `0 0 15px` neon glow and transition to #C084FC.
- **Secondary/Ghost:** 1px border (#9D4EDD), transparent background. On hover, fill background with a low-opacity purple (10%).

### Product Cards
- Background: #1A1825.
- Border: 1px subtle purple.
- Imagery: Large, high-contrast hardware photos.
- Interaction: On hover, the border glows and the image scales 5% to create a "zoom" effect.

### Badges (NEW, HOT, SALE)
- Use bold, all-caps **Space Mono**.
- **SALE:** Neon Pink (#FF00E5) background.
- **NEW:** Neon Cyan or Purple.
- Apply a small 4px glow to the badge itself to make it "pop" off the card.

### Input Fields
- Dark background (#0F0E17), 1px border of #A1A1AA.
- Focus State: Border changes to #9D4EDD with a subtle inner glow.

### Navigation Bar
- Position: Sticky/Fixed.
- Style: Glassmorphic (#1A1825 at 70% opacity) with a bottom 1px border that uses a linear gradient from #9D4EDD to #FF00E5.