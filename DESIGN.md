---
name: Premium Editorial Dark
colors:
  surface: '#131318'
  surface-dim: '#131318'
  surface-bright: '#39383e'
  surface-container-lowest: '#0e0e13'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f25'
  surface-container-high: '#2a292f'
  surface-container-highest: '#35343a'
  on-surface: '#e4e1e9'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#e4e1e9'
  inverse-on-surface: '#303036'
  outline: '#a08e79'
  outline-variant: '#534433'
  surface-tint: '#ffb95a'
  primary: '#ffc376'
  on-primary: '#462a00'
  primary-container: '#f6a000'
  on-primary-container: '#623d00'
  inverse-primary: '#845400'
  secondary: '#c7c5d0'
  on-secondary: '#303038'
  secondary-container: '#494852'
  on-secondary-container: '#b9b7c2'
  tertiary: '#92d6ff'
  on-tertiary: '#00344a'
  tertiary-container: '#1cbfff'
  on-tertiary-container: '#004a66'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb6'
  primary-fixed-dim: '#ffb95a'
  on-primary-fixed: '#2a1800'
  on-primary-fixed-variant: '#643f00'
  secondary-fixed: '#e4e1ed'
  secondary-fixed-dim: '#c7c5d0'
  on-secondary-fixed: '#1b1b23'
  on-secondary-fixed-variant: '#46464f'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7cd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#131318'
  on-background: '#e4e1e9'
  surface-variant: '#35343a'
  abyssal-black: '#000000'
  chamber-gray: '#16161f'
  brutal-truth-bg: '#111118'
  accent-glow: rgba(246, 160, 0, 0.15)
  border-subtle: rgba(255, 255, 255, 0.06)
  text-muted: rgba(255, 255, 255, 0.5)
  text-secondary: rgba(255, 255, 255, 0.85)
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.15'
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: '0'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.75'
  body-bold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.75'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.6'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  baseline: 4px
  gutter: 16px
  container-max: 1280px
  margin-mobile: 20px
  margin-desktop: 40px
  section-gap: 64px
---

## Brand & Style

This design system is engineered for **authority, analytical rigor, and premium data-driven depth**. It targets savvy consumers who value unvarnished honesty and expert curation.

The visual direction combines **Minimalism** and **Glassmorphism** to create a sophisticated "editorial laboratory" environment. By utilizing an ultra-dark canvas, we maximize the visual weight of product metrics and review content. The aesthetic is punctuated by high-contrast typography and vibrant focal points that guide the user toward high-conversion actions.

**Key Visual Principles:**
- **Analytical Depth:** Use of deep layering and subtle glows to suggest a multi-dimensional data environment.
- **Unbiased Authority:** A strict dual-stack typography system that separates expressive editorial voice from clinical technical data.
- **Tactile High-Performance:** Interactive elements (CTAs) utilize physical metaphors like "capsule" shapes and shimmer effects to feel responsive and high-value.

## Colors

The palette is built on a foundation of **Abyssal Black** and **Deep Space Slate** to create infinite depth. 

- **Primary Accent:** Vibrant Orange (#F6A000) is reserved exclusively for primary CTAs, rating stars, and critical editorial call-outs.
- **Surface Strategy:** We use a tiered system of dark grays (`secondary` and `named_colors.chamber-gray`) to define hierarchy without relying on high-contrast dividers.
- **Typography:** Pure White (#FFFFFF) is used for primary headers and body text to ensure maximum legibility against the dark background. Secondary text uses a slight opacity (85%) to reduce visual noise in long-form content.
- **Glassmorphism:** Interactive surfaces and navigation bars should utilize a background blur (10px) with a semi-transparent dark fill (`rgba(22, 22, 31, 0.7)`).

## Typography

The typography system uses a **high-contrast dual-font stack**. 

- **Playfair Display** (Serif) handles the "Editorial Voice." It conveys authority, luxury, and critical oversight. Use it for all major headers and the "Brutal Truth" accents.
- **Inter** (Sans-Serif) handles the "Technical Data." Its high x-height and clean geometry ensure that dense product specifications and long-form reviews remain legible on OLED and high-brightness displays.

**Scaling & Rhythm:**
Large display sizes are clamped for mobile. Line heights are intentionally generous for body text (1.75) to prevent eye fatigue on dark backgrounds, while headlines remain tight (1.15 - 1.3) to project structural strength.

## Layout & Spacing

This design system uses a **12-column fluid grid** with fixed maximum width boundaries to maintain readability.

- **Desktop Structure:** Editorial content follows a 2/3 width main column (approx. 800px) paired with a 1/3 width sticky sidebar for navigation, quick stats, and primary CTAs.
- **Mobile Structure:** Single column with 20px side margins. Navigation collapses into a full-screen drawer.
- **Spacing Rhythm:** Based on a 4px/8px baseline. Use `section-gap` (64px) between major content blocks to emphasize the premium, breathable aesthetic. Small components use 16px (md) or 24px (lg) internal padding.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

1.  **The Canvas:** The deepest layer is `Abyssal Black`.
2.  **Surface Tier:** Standard sections and list containers use `Deep Space Slate`.
3.  **Component Tier:** Review cards and widgets use `Chamber Gray` with a `border-subtle` outline.
4.  **Active Elevation:** On hover, cards translate -4px on the Y-axis and gain an `accent-glow` (Vibrant Orange, 15% opacity).
5.  **Overlays:** Modals and dropdowns use the `Glassmorphism` style with a 10px backdrop blur to maintain spatial awareness of the content beneath.

## Shapes

The shape language is sophisticated and modern, favoring **Rounded** geometry to balance the "sharp" editorial typography.

- **Standard Elements:** Cards, input fields, and small containers use 0.5rem (8px) corners.
- **Tactile Elements:** High-converting buttons and badges use a **Pill-shaped/Capsule** style (rounded-full) to feel ergonomic and distinct from the layout's structural containers.
- **Media:** Product photography and videos should always feature `rounded-lg` (16px) or `rounded-xl` (24px) corners to match the premium feel.

## Components

### Buttons
- **High-Converting CTA:** Capsule shape with a Vibrant Orange gradient background. Features a `white` shimmer effect on hover and a soft orange outer glow.
- **Secondary Button:** `Chamber Gray` background with a subtle border. Transparent on hover with white text.

### 'Brutal Truth' Call-Out Box
This specialized component builds extreme user trust.
- **Container:** Background is `brutal-truth-bg` (#111118), slightly darker than standard cards.
- **Accent:** A bold 4px left-border in `Primary Orange`.
- **Typography:** Header uses `Playfair Display` (Italic) with a ⚡ emoji prefix. Content uses `Inter` for clean readability.

### Cards
- **Frosted Card:** Semi-transparent charcoal background with 10px backdrop blur. 
- **Comparison Winner:** Adds a 3px top-border band in `Primary Orange` and a gold badge in the top-right corner.

### Navigation
- **Sticky Header:** Frosted glass effect with a 1px bottom border. 
- **Categories:** Links use `label-caps` typography. Highlighting is done via a sliding orange underline that expands from the center.
- **Featured Categories:** Coffee & Espresso, Smart Kitchen, Air Quality, Home, Skin & Beauty.

### Inputs
- **Search & Forms:** Solid slate backgrounds with 1px `border-subtle`. On focus, the border transitions to `Primary Orange` with a 3px outer glow ring.