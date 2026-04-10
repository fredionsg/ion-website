# ION Brand Guidelines

**Institute of Neurodiversity Singapore**

This document defines the visual brand language for the ION academic platform. Use these tokens to keep the new product visually consistent with our existing website.

---

## Colours

The palette is split into a neutral base, two primary brand colours, and two supporting accents. Hex codes below match the ones in production (`tailwind.config.js`).

| Token | Hex | Usage |
|---|---|---|
| **Background** | `#F5F7FA` | Default page background. A cool off-white that pairs cleanly with ION Blue. |
| **Primary — ION Blue** | `#3F7CBF` | Primary buttons, links, key UI accents, brand voice. |
| **Accent — ION Red** | `#EF534C` | Secondary CTAs, highlights, attention-grabbing UI elements. Use sparingly. |
| **Dark** | `#111111` | Body text, headings, high-contrast borders. Avoid pure black. |
| **ION Green** | `#76C691` | Tertiary accent — success states, supportive tags, illustrations. |
| **ION Yellow** | `#FFC614` | Tertiary accent — warmth, highlights, callouts, illustrations. |

### Usage notes
- The default body uses **Background** with **Dark** text.
- Buttons follow three patterns: `btn-primary` (blue on background), `btn-accent` (red on dark), `btn-outline` (transparent with dark border).
- Cards and surfaces use `#F5F7FA` with a subtle `border: 1px solid rgba(17,17,17,0.1)` and a soft shadow.
- A faint SVG fractal-noise overlay (~5% opacity) sits over the whole page to add organic texture — feel free to replicate this on the academic platform for brand cohesion.

---

## Typography

We use four typefaces, each with a clear role. All are free Google Fonts.

| Font | Role | Where to use |
|---|---|---|
| **Outfit** | Heading | All headings (`h1`–`h6`). Tracking is slightly tight. |
| **Plus Jakarta Sans** | Body / UI | Default body text, paragraphs, buttons, form inputs, navigation. |
| **Cormorant Garamond** | Drama / Editorial | Reserved for editorial moments — pull quotes, large feature statements, hero taglines. Use sparingly. |
| **IBM Plex Mono** | Data | Numbers, stats, code, metadata, timestamps, technical labels. |

### Google Fonts import

Add this to the `<head>` of the new platform:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=IBM+Plex+Mono:ital,wght@0,100..700;1,100..700&display=swap"
  rel="stylesheet">
```

### CSS font-family stacks

```css
--font-sans: "Plus Jakarta Sans", sans-serif;   /* body / UI */
--font-heading: "Outfit", sans-serif;           /* headings */
--font-drama: "Cormorant Garamond", serif;      /* editorial */
--font-data: "IBM Plex Mono", monospace;        /* data / code */
```

---

## Tailwind config (drop-in)

If the platform uses Tailwind, you can paste this directly into `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      background: '#F5F7FA',
      primary:    '#3F7CBF',
      accent:     '#EF534C',
      dark:       '#111111',
      'ion-green':  '#76C691',
      'ion-yellow': '#FFC614',
    },
    fontFamily: {
      sans:    ['"Plus Jakarta Sans"', 'sans-serif'],
      heading: ['"Outfit"', 'sans-serif'],
      drama:   ['"Cormorant Garamond"', 'serif'],
      data:    ['"IBM Plex Mono"', 'monospace'],
    },
    borderRadius: {
      '2xl': '2rem',
      '3xl': '3rem',
      'full': '9999px',
    }
  }
}
```

---

## Shape & form language

- **Generous corner radii.** Cards use `2rem` (`rounded-2xl`); buttons and pills are fully rounded (`rounded-full`).
- **Soft shadows.** Prefer subtle elevation (`shadow-sm`) over heavy drop shadows.
- **Borders are quiet.** Use `rgba(17,17,17,0.1)` for dividers — avoid hard black lines.
- **Texture.** Apply a faint fractal-noise overlay (~5% opacity) to add organic warmth.
- **Motion.** Links and buttons rise slightly on hover (`translateY(-1px)`) with a 300ms ease.

---

## Assets in this folder

```
brand-kit/
├── BRAND_GUIDELINES.md          ← this file
├── logos/
│   ├── Logo-01.png              ← square / icon mark
│   └── LogoWide-01.png          ← horizontal lockup
├── icons/
│   ├── Communityicon-01.png     ← icon-only versions (for nav, badges)
│   ├── Educationicon-01.png
│   ├── Mentorshipicon-01.png
│   ├── Community-01.png         ← full illustrated versions (for sections)
│   ├── Education-01.png
│   ├── Mentor-01.png
│   └── Policy-01.png
└── illustrations/
    └── PolicyIllustration-01.png
```

### Logo usage

- Use **LogoWide-01.png** in the top-left of the platform's header / nav bar.
- Use **Logo-01.png** for favicons, app icons, social avatars, and any square context.
- Maintain clear space around the logo equal to the height of the "I" in ION.
- Never recolour the logo. If a single-colour version is required, ask the design team.

### Icon system

The four pillar icons (**Community, Education, Mentorship, Policy**) come in two flavours:
- `*icon-01.png` — compact, icon-only, for navigation and small UI.
- `*-01.png` — fuller illustrative version, for landing sections and feature cards.

Use the same pillar metaphor on the academic platform wherever you need to categorise content by ION's four areas of work.

---

## Contact

If anything's missing — additional logo formats (SVG), extra colour swatches, or vector versions of the icons — let me know and I'll source them from the design team.
