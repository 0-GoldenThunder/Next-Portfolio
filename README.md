# Tsaqif N. Naufal — Portfolio

A single-page, high-motion personal portfolio built with **Next.js 15 (App Router)** and **React 19**. It showcases the developer's work, skills, and certifications through an interactive 3D UI rather than a static list of links.

## Overview

The site is a one-page experience. Every section is a client-side React component composed from `src/app/page.js`, stitched together with scroll-driven effects:

| Section | Highlights |
| --- | --- |
| Hero | Name intro, typewriter effect, interactive 3D cube |
| About | Slot-machine adjective scroller over a perspective image marquee |
| Projects | Year-based coverflow timeline with expandable project cards |
| Certifications | Click-through 3D certificate carousel |
| Skills | Isometric orbit of technology icons with smooth inertia |
| Contact | Footer with social links |

## Problem it solves

A conventional portfolio lists links and text — it shows *what* the developer built, not *how well*. This project is itself the demo: it uses the same technologies it advertises (React, Next.js, Three.js, CSS animation) to deliver a portfolio that is interactive, animated, and performance-conscious. The design language — neon orange on a dark/light adaptive background with pixel-style headings — reinforces a distinctive personal brand.

## Key features

- **Loading screen** — simulated "system initializing" boot sequence with a stuttery progress bar before content mounts.
- **Interactive 3D hero cube** — a wireframe cube rendered with `@react-three/fiber`, draggable via `OrbitControls`; auto-rotates only when not grabbed.
- **Scroll-aware section indicator** — a fixed side shape that morphs color, rotation, and border radius (via `animejs`) as you scroll, driven by `IntersectionObserver`.
- **Reveal-on-scroll** — every content section fades/slides in as it enters the viewport, and back out when it leaves.
- **Perspective image marquee** — the About background tilts two image tracks in 3D space and scrolls them in opposite directions.
- **Coverflow project timeline** — projects grouped by year (2023–2026) with an animated milestone track, chevron navigation, and hover "bevel-card" effects.
- **3D certification carousel** — a click-cycling stack with depth, scale, and rotation.
- **Isometric skills orbit** — tech icons orbit a central hub in a flattened 3D plane using a `requestAnimationFrame` loop; hover pauses and highlights a skill.
- **Dark / light theme** — CSS-variable theming via `next-themes`, with a hydration-safe provider.
- **Fluid typography** — a phi-based type scale (`clamp`) and pixel/rounded font pairing loaded via `next/font`.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router, `src/` layout) |
| UI | React 19 |
| Styling | Tailwind CSS 3.4 + custom `tailwind.config.mjs` |
| 3D | Three.js + `@react-three/fiber` + `@react-three/drei` |
| Animation | `animejs`, CSS keyframes, `requestAnimationFrame` |
| Theming | `next-themes` |
| Icons | `lucide-react`, `react-icons` |

## Architecture & how it works

### Rendering model

There is no backend or data layer. The app is a static single-page site: `src/app/layout.js` provides the document shell, fonts, and theme provider; `src/app/page.js` composes the sections. All interactive components are explicitly marked `"use client"` since the animation logic runs in the browser.

### Scroll engine

Two components coordinate scroll-driven behavior via `IntersectionObserver`:

- **`FadeInSection`** wraps each content block and toggles visibility *bidirectionally* — it keeps the observer active instead of unobserving, so sections fade out again when scrolled past.
- **`MorphShape`** observes every section (with a priority boost for the footer) and animates a fixed side indicator between per-section states (color, border radius, rotation, scale) using `animejs`. The hero color is resolved from the active theme.

### Animation approach

Three complementary mechanisms, chosen per effect:

1. **CSS keyframes + Tailwind config** — marquees, glitch, blink, and slide-up-fade for cheap, declarative motion.
2. **`requestAnimationFrame` loop** — `SkillsOrbit` runs a manual physics loop (time-delta based) that eases rotation toward a target speed and repositions every orbiting icon on each frame; a `ResizeObserver` keeps the orbit radius responsive.
3. **Library animation** — `animejs` in `MorphShape` and the WebGL canvas in `Cube3D` (`useFrame`) handle the complex elastic/morphing and 3D-rotation cases.

### Theming

`ThemeProvider` wraps `next-themes` in a mount-guard so theme-dependent UI renders correctly on first paint (avoiding hydration mismatches). Theme values are CSS variables (`--background`, `--foreground`) consumed by Tailwind colors, including light/dark variants of a radial-gradient background and an SVG noise overlay.

### Design system

- **Accent:** neon orange `#ff6b00`, used for active states, highlights, and glow shadows.
- **Fonts:** Pixelify Sans (headings) + Quicksand (body), optimized via `next/font`.
- **Type scale:** phi-based `clamp()` sizes (`phi-h1` … `phi-body`) for fluid scaling across breakpoints.

### Project structure

```
src/
├── app/
│   ├── globals.css        # Tailwind + theme variables, noise texture, shared keyframes
│   ├── layout.js          # Fonts, metadata, ThemeProvider shell
│   └── page.js            # Composes all sections in order
└── components/
    ├── Navbar.js              # Fixed nav, scroll-aware, theme toggle
    ├── LoadingScreen.js       # Boot-style progress overlay
    ├── TypewriterEffect.js    # Cycling phrase type/delete
    ├── Cube3D.js              # Interactive 3D wireframe cube (react-three-fiber)
    ├── MorphShape.js          # Scroll-driven side section indicator
    ├── FadeInSection.js       # Viewport reveal wrapper (IntersectionObserver)
    ├── AboutSection.js        # Marquee backdrop + slot-machine adjective scroller
    ├── ProjectsMilestone.js   # Year-based coverflow timeline + cards
    ├── CertificationsSection.js # 3D certificate carousel
    ├── SkillsOrbit.js         # Isometric orbiting tech icons
    ├── GlitchText.js          # Random glitch text effect
    └── ThemeProvider.js       # Hydration-safe next-themes wrapper
```

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (Turbopack) → http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint with next lint
```

## Customization

Content lives in the component data arrays:

| What | Where |
| --- | --- |
| Project years, titles, links, screenshots | `src/components/ProjectsMilestone.js` (`MILESTONES`) |
| Certifications | `src/components/CertificationsSection.js` (`certificates`) |
| Skills and orbit icons | `src/components/SkillsOrbit.js` (`skills`) |
| Hero phrases | `src/components/TypewriterEffect.js` (`PHRASES`) |
| About marquee images / adjectives | `src/components/AboutSection.js` (`MARQUEE_IMAGES`, `WORDS`) |
| Social links | `src/app/page.js` footer |
| Colors, fonts, type scale | `tailwind.config.mjs`, `src/app/globals.css` |

## Version control

The project is tracked in a local Git repository on the `master` branch, managed with the **Conventional Commits** style:

- `feat:` — new features and section enhancements (e.g. "feat: Enhancing all section UX phase 1")
- `refactor:` — structural or readability improvements without behavior change
- `Initial commit from Create Next App` — the bootstrapped starting point

History reflects an iterative build: start from the `create-next-app` scaffold, then a series of focused commits that add and polish each section (About, Projects, Certifications, Skills) before refinement passes for responsiveness and maintainability. The current working tree also contains an in-progress refactor of `ProjectsMilestone.js` that is not yet committed.

## Deployment

The app is a standard Next.js build and deploys anywhere Next.js is supported (e.g. Vercel, Netlify):

```bash
npm run build
```
