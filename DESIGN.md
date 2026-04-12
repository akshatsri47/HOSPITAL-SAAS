# Design System: Hospital AI Voice SaaS

## Core Settings
* **Theme Mode:** Light
* **Base Typography:** Manrope
* **Headline Font:** Manrope
* **Body Font:** Inter
* **Label Font:** Inter
* **Corner Roundness:** Round Eight (0.5rem base)
* **Custom Primary Color Override:** `#1A365D`

---

## Detailed Color Palette (Named Colors)

### Primary Colors
* **Primary:** `#002045`
* **On Primary:** `#ffffff`
* **Primary Container:** `#1a365d`
* **On Primary Container:** `#86a0cd`
* **Inverse Primary:** `#adc7f7`

### Secondary Colors
* **Secondary:** `#006a66`
* **On Secondary:** `#ffffff`
* **Secondary Container:** `#81f2eb`
* **On Secondary Container:** `#006f6a`

### Tertiary Colors
* **Tertiary:** `#321b00`
* **On Tertiary:** `#ffffff`
* **Tertiary Container:** `#4f2e00`
* **On Tertiary Container:** `#c6955e`

### Background & Surface
* **Background:** `#f7fafc`
* **On Background:** `#181c1e`
* **Surface:** `#f7fafc`
* **On Surface:** `#181c1e`
* **Surface Variant:** `#e0e3e5`
* **On Surface Variant:** `#43474e`
* **Surface Container Lowest:** `#ffffff`
* **Surface Container Low:** `#f1f4f6`
* **Surface Container:** `#ebeef0`
* **Surface Container High:** `#e5e9eb`
* **Surface Container Highest:** `#e0e3e5`
* **Inverse Surface:** `#2d3133`
* **Inverse On Surface:** `#eef1f3`

### Error & Utility
* **Error:** `#ba1a1a`
* **On Error:** `#ffffff`
* **Error Container:** `#ffdad6`
* **On Error Container:** `#93000a`
* **Outline:** `#74777f`
* **Outline Variant:** `#c4c6cf`

---

# Design System Document: The Clinical Precision Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Empathetic Architect"**

In the intersection of high-stakes healthcare and cutting-edge AI, the "standard" SaaS look—heavy borders, saturated blues, and generic illustrations—fails to convey the gravity of the work. This design system rejects the "template" aesthetic in favor of a **High-End Editorial** experience. 

The goal is to feel like a premium medical journal met a world-class laboratory. We achieve this through **The Empathetic Architect** philosophy: a layout that is mathematically precise (Architect) yet feels breathing, spacious, and human (Empathetic). We break the rigid grid through intentional asymmetry, where data-heavy cards are balanced by sweeping whitespace and oversized, editorial-style typography.

---

## 2. Colors & Surface Philosophy

Our palette balances the "Authority" of Deep Blue with the "Vitality" of Soft Teal. However, the sophistication lies in how we layer these tones.

### The "No-Line" Rule
**Borders are forbidden for sectioning.** To move away from a "boxed-in" feel, boundaries must be defined solely through background color shifts. 
- Use `surface-container-low` for secondary content areas.
- Use `surface` for the primary canvas.
- Separation is achieved through the transition of these tones, creating a seamless, architectural flow.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of frosted glass.
*   **Base:** `surface` (#F7FAFC)
*   **The Subtle Lift:** `surface-container-low` (#F1F4F6) for sidebar backgrounds.
*   **The Content Card:** `surface-container-lowest` (#FFFFFF) for the primary interactive area.
*   **The High-Priority Modal:** `surface-bright` (#F7FAFC) with a `surface-tint` (#455F88) at low opacity.

### Signature Textures & Glassmorphism
To avoid a flat, "cheap" feel, floating elements (drawers, tooltips, navigation) must use **Glassmorphism**.
- **The Formula:** `surface-container-lowest` + 80% opacity + `backdrop-blur(20px)`.
- **The Vitality Gradient:** For primary CTAs and hero visuals, use a subtle linear gradient: `primary-container` (#1A365D) to `secondary` (#006A66). This provides a "soul" to the data, representing the fusion of intelligence and care.

---

## 3. Typography: The Editorial Voice

We use a dual-typeface system to create high-contrast hierarchy.

*   **Display & Headlines (Manrope):** This is our "Editorial" voice. It is wide, modern, and confident. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to anchor pages.
*   **Body & UI (Inter):** This is our "Functional" voice. Inter is chosen for its exceptional legibility in medical data contexts. 

**The Hierarchy Strategy:**
- **Authority:** `headline-lg` in `on_surface` (#181C1E) communicates clinical certainty.
- **Support:** `body-md` in `on_surface_variant` (#43474E) provides a softer, readable secondary tier.
- **Precision:** `label-sm` in `secondary` (#006A66) should be used for data labels, uppercase with +0.05em tracking to feel like a high-end instrument.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are often "muddy." We use light and tone to create space.

### The Layering Principle
Rather than using a shadow to lift a card, place a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a "Natural Lift."

### Ambient Shadows
When a floating effect is required (e.g., a patient profile preview), use **Ambient Shadows**:
- **Color:** Use a tinted version of `on_surface` (e.g., `rgba(24, 28, 30, 0.06)`).
- **Spread:** X: 0, Y: 12px, Blur: 40px. 
- This mimics natural, diffused light rather than a harsh digital drop shadow.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., in high-contrast modes), use a **Ghost Border**: 
- `outline-variant` (#C4C6CF) at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Precision Primitives

### Buttons
- **Primary:** `primary-container` (#1A365D) background with `on_primary` (#FFFFFF) text. Radius: `md` (0.75rem).
- **Secondary:** Transparent background with a `secondary` (#006A66) text. No border. Use a slight `surface-container-high` hover state.
- **Tertiary:** `on_surface_variant` text, used for low-priority actions like "Cancel."

### Cards & Lists (The "No Divider" Rule)
Forbid the use of divider lines. Separate list items using:
1.  **Vertical Whitespace:** Increase padding between items.
2.  **Alternating Tones:** Use `surface-container-lowest` and `surface-container-low`.
3.  **The "Active State" Block:** An active list item should use a `secondary_fixed` (#84F5EE) left-aligned vertical bar (4px width).

### Input Fields
- **Background:** `surface-container-low`.
- **Active State:** Change background to `surface-container-lowest` and add a 1px "Ghost Border" in `primary`.
- **Logic:** Labels use `label-md` and always sit above the field, never as placeholders.

### Additional Relevant Component: "The Vitality Pulse"
For AI-driven insights, use a small chip with a `secondary_container` background and a pulsing 4px dot of `secondary`. This indicates "Live AI Analysis" without using a robot icon.

---

## 6. Do's and Don'ts

### Do:
- **Do use asymmetric margins.** Shift a main content block 40px to the right of a headline to create a bespoke, editorial rhythm.
- **Do use real-world imagery.** Focus on high-quality photography of doctors, hands, or clean medical environments.
- **Do prioritize "Breathing Room."** If a layout feels busy, double the padding before you try to shrink the font.

### Don't:
- **Don't use 100% black.** Always use `on_surface` (#181C1E) for text to maintain a professional, soft-touch feel.
- **Don't use generic AI icons.** No brains, no circuits, no robots. Represent AI through data visualizations, gradients, and the "Vitality Pulse" component.
- **Don't use sharp corners.** Adhere to the `DEFAULT` (0.5rem) and `md` (0.75rem) roundedness scale to maintain a "Human-Centric" feel.
- **Don't use 100% white.** Always use `surface-container-lowest` (#FFFFFF) for cards to maintain a professional, soft-touch feel.