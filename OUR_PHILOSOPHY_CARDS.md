# Our Philosophy -- Animated Cards Design Specification

## Overview

The **Our Core Philosophy** section (`#pillars`) presents ION's four foundational pillars as large, interactive animated cards arranged in a **2x2 grid**. Each card uses a unique colour palette, a distinct code-driven animation as its centrepiece, and descriptive pill-shaped tags at the bottom. The result is a section that feels alive -- each pillar is not just stated but *demonstrated* through motion.

The four pillars map directly to the company's mission:

> *To empower neurominorities through Education, Mentorship, Advocacy, Social Cohesion and Community Support.*

---

## Section Layout

| Property | Value |
|---|---|
| Section ID | `#pillars` |
| Grid | `grid-cols-1 md:grid-cols-2 gap-8` |
| Card aspect ratio | `aspect-[4/3]` (landscape, generous vertical space for animation) |
| Card corners | `rounded-3xl` (~1.5rem) |
| Card border | Subtle `border border-white/10` or tinted to match card palette |

Each card follows a consistent anatomy:

```
+----------------------------------------------------+
|  [Icon]  NUMBERED LABEL BADGE            top-left  |
|                                                     |
|          ┌─────────────────────┐                    |
|          │  Animated Visual    │    centre stage     |
|          │  (unique per card)  │                     |
|          └─────────────────────┘                    |
|                                                     |
|  [ Pill Tag ]  [ Pill Tag ]  [ Pill Tag ]   bottom  |
|                                                     |
|  monospace metadata left           metadata right   |
+----------------------------------------------------+
```

### Shared Elements

- **Icon** (top-left): A small circular icon badge with a tinted background matching the card's colour theme
- **Numbered label** (top-left, beside icon): e.g. `01. EDUCATION & AWARENESS` -- uppercase, bold, small font, rendered inside a rounded pill/badge with a light tinted background
- **Pill tags** (bottom): Rounded pill-shaped labels describing sub-topics for each pillar, styled with a light tinted border and background matching the card's palette
- **Monospace metadata** (bottom corners): Small `font-mono` text in muted tones, adding a data-dashboard aesthetic (e.g. `UPTIME: 99.9%`, `FRAMEWORK // 2026`)

---

## Card 1 -- Diagnostic Shuffler

**Label:** `01. EDUCATION & AWARENESS`
**Colour palette:** Cool blue / lavender -- light blue-tinted background (`bg-blue-50` to `bg-indigo-50` range)

### Philosophy Link

Education requires **cycling through many perspectives**. The shuffling card stack is a metaphor for moving through different awareness topics, campaigns, and learning materials -- one insight at a time, layered on top of the last.

### Visual Description

A **stacking card carousel** centred in the card. The visible top card is a white rounded rectangle with a subtle border, displaying:
- A bold heading (e.g. **"National Campaigns"**)
- A short description paragraph
- A card index number in the bottom-right (e.g. `[03]`)

Behind the top card, 1-2 additional cards are partially visible with offset positioning (shifted down/right) and reduced opacity, creating a physical "deck" illusion.

### Animation Details

| Property | Value |
|---|---|
| Cycle interval | ~3,500 ms (`setInterval`) |
| Transition duration | 700 ms |
| Easing | Default CSS ease (smooth deceleration) |
| Properties animated | `transform` (translateY), `opacity`, `zIndex` |
| Card count | 3 cards cycling in a loop |

The top card slides away while the next card rises to take its place. The transition is smooth and unhurried, matching the contemplative pace of learning.

### Content Examples (Cards in the Stack)

Each sub-card represents a different education initiative:
- National Campaigns -- annual awareness campaigns with mainstream media
- School Programmes -- neurodiversity education in primary/secondary schools
- Digital Resources -- online toolkits, webinars, and self-assessment guides

### Skills / Techniques

- **React state** (`useState`, `useEffect`) for auto-cycling index
- **CSS transitions** via inline `style` objects (transform, opacity, zIndex)
- **Stacking context** managed through dynamic zIndex values
- **Timer cleanup** in `useEffect` return to prevent memory leaks

---

## Card 2 -- Telemetry Typewriter

**Label:** `02. SUPPORT & MENTORSHIP`
**Colour palette:** Warm amber / cream -- soft golden background (`bg-amber-50` to `bg-orange-50` range)

### Philosophy Link

Mentorship is a **continuous, real-time connection** -- not a one-off conversation but a persistent stream of support. The telemetry display evokes a live system dashboard: always on, always monitoring, always there. Each status line represents a different mentorship channel that is actively running and verified.

### Visual Description

A terminal/console-style panel centred in the card with a warm-tinted background. The display shows:

- **Header line:** `LIVE_TELEMETRY // MENTORSHIP` preceded by a small amber/gold status dot (pulsing to indicate "live")
- **Status lines** in monospace font, each prefixed with `>`:
  - `> WORKPLACE_MENTORSHIP_SYS: ONLINE`
  - `> STUDENT_BUDDY_SYS: STANDBY`
  - `> SUPPORT_NETWORKS_SECURE: VERIFIED`
- **Active typing line:** `# ESTABLISHING MENTORSHIP NEXUS...` followed by a **blinking amber block cursor**
- **Footer metadata:** `UPTIME: 99.9%` (left) and `FRQ: 0.85 HZ` (right)

All text is in `font-mono` (IBM Plex Mono), coloured in muted amber/brown tones against the cream background.

### Animation Details

| Property | Value |
|---|---|
| Typing speed | ~30-50 ms per character |
| Animation method | `requestAnimationFrame` with timestamp delta |
| Cursor | Blinking amber block, `animate-pulse` or custom blink keyframe |
| Font | `font-mono` (IBM Plex Mono) |
| Text colour | Amber/brown on cream (`text-amber-700` range) |
| Status dot | Pulsing amber dot (`animate-pulse`) |

The typewriter animates the active line character by character. Once complete, it may pause and cycle to a new line, creating the impression of an ongoing system process.

### Skills / Techniques

- **requestAnimationFrame** with deltaTime for frame-rate-independent typing
- **State machine** tracking current line index and character position
- **Monospace typography** for authentic terminal aesthetic
- **Pulsing indicator** for "live" status feel

---

## Card 3 -- Network Topology

**Label:** `03. COMMUNITY ENGAGEMENT`
**Colour palette:** Green / white -- clean white background with ION Green (`#76C691`) nodes and lines

### Philosophy Link

Community is a **living, self-organising network**. Each particle node represents a person; each connecting line is a relationship. The way nodes drift, cluster, and respond to the user's mouse mirrors how real communities form organically -- around proximity, shared purpose, and active engagement. Moving your cursor into the card and watching nodes gather toward you is a direct metaphor for *showing up* in a community.

### Visual Description

A **full-card HTML5 Canvas** rendering approximately 60 small green circular nodes (`#76C691`) connected by thin green/grey lines. The network fills the entire card area behind the label and tags. Lines are drawn between nodes that fall within a proximity threshold, creating a web-like mesh that shifts as nodes drift.

Below the network, **pill tags** describe community activities:
- `Interactive online forums`
- `Networking events`
- `Creative showcases`
- `Connecting neurominorities & allies`

### Animation Details

| Property | Value |
|---|---|
| Particle count | ~60 nodes |
| Render loop | `requestAnimationFrame` (continuous 60fps) |
| Node colour | ION Green `#76C691` |
| Line colour | Green/grey with alpha, opacity inversely proportional to distance |
| Connection threshold | Distance-based radius (~100-150px) |
| Mouse interaction | Nodes within ~120px of cursor are attracted toward it |
| Particle speed | Slow, gentle drift with random velocity vectors |
| Boundary behaviour | Wrap or bounce at card edges |

### Interaction

- **Mouse-responsive**: Hovering over the card causes nearby nodes to gravitate toward the cursor, forming temporary clusters -- visually demonstrating "community forming around a point of contact"
- **Mouse leave**: Nodes gently return to natural drift
- **Passive state**: Without mouse input, the network drifts organically, still conveying interconnection

### Skills / Techniques

- **Canvas 2D API** -- `getContext('2d')`, arc drawing, line drawing
- **requestAnimationFrame** for smooth continuous rendering
- **Euclidean distance** for proximity-based connections and mouse attraction
- **Vector physics** -- velocity, drift, boundary handling
- **Mouse event listeners** (`mousemove`, `mouseleave`) with canvas-local coordinate mapping
- **Performance** -- bounded particle count, alpha culling for distant lines

---

## Card 4 -- Policy Framework

**Label:** `04. POLICY & ADVOCACY`
**Colour palette:** Soft pink / rose -- light pink background (`bg-rose-50` to `bg-pink-50` range)

### Philosophy Link

Policy and advocacy are built on **layered documents and formal frameworks** -- legislation, position papers, guidelines, and compliance standards stacked upon each other. The single document mockup centred in the card represents the formal, structured nature of this work. On hover, additional document layers fan out, revealing the depth of policy infrastructure beneath the surface.

### Visual Description

A **document/page mockup** centred in the card -- a white rounded rectangle with:
- A small red/rose file icon in the top-left corner
- A coloured title bar line near the top (blue/dark)
- Several horizontal grey bars representing lines of text (faux content)
- A small red/rose dot accent in the bottom-right of the document

Below, **pill tags** list advocacy focus areas:
- `Legislative Engagement`
- `Caregiver Advocacy`
- `Inclusive Hiring Partners`

**Footer metadata:** `FRAMEWORK // 2026` (left) and `REGISTRY: VERIFIED` (right)

### Animation Details

| Property | Value |
|---|---|
| Document layers | 3 stacked (visible on hover) |
| Default state | Single document visible, others hidden beneath with slight offset |
| Hover state | Stack fans out with rotation and translation |
| Transition | `transition-all duration-700` |
| Easing | `cubic-bezier(0.34, 1.56, 0.64, 1)` -- spring overshoot curve |
| Properties animated | `transform` (rotate, translateX, translateY), `opacity` |

The spring easing creates a satisfying, physical feel -- the documents seem to have weight and momentum as they separate.

### Skills / Techniques

- **CSS transitions** with cubic-bezier spring easing
- **Transform stacking** -- rotate + translate combined
- **Hover state** via Tailwind `group-hover:` utilities
- **Decorative UI** -- faux text lines, document chrome, file icons for metaphorical reinforcement
- **Layered z-index** for document stacking depth

---

## Animation Principles

### 1. Meaningful Motion

Every animation directly represents its pillar's core idea:

| Pillar | Animation | Metaphor |
|---|---|---|
| Education & Awareness | Shuffling card stack | Cycling through perspectives and topics |
| Support & Mentorship | Live telemetry typewriter | Continuous, always-on support stream |
| Community Engagement | Interactive particle network | Organic, self-organising human connections |
| Policy & Advocacy | Layered document fan-out | Depth of formal frameworks and structures |

### 2. Colour as Identity

Each card's palette is distinct and emotionally purposeful:

| Card | Background | Accent | Emotional Register |
|---|---|---|---|
| Education | Cool blue / lavender | White card stack | Calm, intellectual, trustworthy |
| Mentorship | Warm amber / cream | Amber text & cursor | Warm, reliable, always-present |
| Community | Clean white | ION Green nodes & lines | Open, growing, organic |
| Advocacy | Soft pink / rose | Rose document accents | Empathetic, formal, structured |

### 3. Performance

- Canvas animations use `requestAnimationFrame`, never `setInterval` for rendering
- CSS transitions target only GPU-accelerated properties (`transform`, `opacity`)
- No layout-triggering properties animated (no `width`, `height`, `top`, `left`)
- Particle count bounded to ~60 to prevent frame drops

### 4. Easing & Timing

- **Never linear**: All transitions use ease-out, cubic-bezier spring curves, or GSAP power3
- Card 1 cycling: gentle 700ms ease
- Card 2 typing: steady ~30-50ms per character
- Card 3 particles: continuous smooth drift
- Card 4 hover: 700ms with spring overshoot `cubic-bezier(0.34, 1.56, 0.64, 1)`

### 5. Accessibility

- All content is readable without animations
- No rapid flashing or strobing
- Auto-playing animations are slow and gentle
- Interactive canvas degrades gracefully without mouse input
- Pill tags ensure each pillar's topics are conveyed in static text regardless of animation state

---

## Technical Stack

| Technology | Role in This Section |
|---|---|
| React 18 (`useState`, `useEffect`, `useRef`) | Component state, timer lifecycle, canvas refs |
| Tailwind CSS 3 | Grid layout, colour palettes, pill tags, hover states, transitions |
| HTML5 Canvas API | Particle network rendering (Card 3) |
| `requestAnimationFrame` | Smooth animation loops (Cards 2 & 3) |
| `setInterval` | Auto-cycling timer (Card 1) |
| CSS `transition` + `cubic-bezier` | Spring hover effects (Card 4) |
| IBM Plex Mono | Monospace terminal text (Card 2 metadata, footer metadata) |

---

## Design Tokens

```
Colours (from tailwind.config.js):
  Primary Blue:   #3F7CBF
  Accent Red:     #EF534C
  ION Green:      #76C691
  ION Yellow:     #FFC614
  Dark:           #111111
  Background:     #F5F7FA

Fonts:
  Headings:    Outfit
  Body:        Plus Jakarta Sans
  Dramatic:    Cormorant Garamond (section title)
  Monospace:   IBM Plex Mono (telemetry, metadata)

Radius:
  Cards:       rounded-3xl (1.5rem)
  Pills/Tags:  rounded-full
  Sub-cards:   rounded-xl to rounded-2xl
```

---

## Relationship to Company Philosophy

```
ION Mission Pillar            Card Animation           What It Communicates
────────────────────────────  ───────────────────────  ──────────────────────────────────
Education & Awareness         Shuffling card stack     Knowledge is layered; cycle through
                                                       many perspectives to build awareness

Support & Mentorship          Live telemetry feed      Support is continuous, monitored,
                                                       and always-on -- not a one-time event

Community Engagement          Interactive node network  Community is organic, self-forming,
                                                       and responds to participation

Policy & Advocacy             Layered document stack   Advocacy is built on formal, layered
                                                       frameworks that fan out when examined
```

The section communicates that ION's philosophy is **active, interconnected, and alive** -- dynamic commitments visualised through motion, not a static mission statement on a wall.
