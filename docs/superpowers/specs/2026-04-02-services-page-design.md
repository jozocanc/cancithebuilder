# Services & Pricing Page — Design Spec

**Date:** 2026-04-02
**Project:** cancithebuilder.com
**File:** `services.html` (new page)

---

## Goal

A dedicated services/pricing page where visitors can pick a pre-made bundle or build a custom package, then submit their info and book a strategy call.

## Tech Stack

- Static HTML, same as rest of site
- Shares `style.css` for base styling, new styles added to `style.css` or inline in `services.html`
- Vanilla JS for interactivity (toggle cards, running total, quantity selectors, summary population)
- Formspree for email capture (same as `start.html`)
- Calendly link opens in new tab after form submit
- Google Analytics (G-XYY9YQW58B) included

## Page Flow

1. Hero
2. Bundle Cards (3 tiers)
3. Divider — "Want something custom?"
4. Build Your Own (toggle card grid)
5. Summary + Email Capture (hidden until selection made)

---

## Section 1: Hero

- Matches site brand: dark background, Bebas Neue headline, Barlow body
- Headline: "Find Your Perfect Package" or similar
- Subtext: brief line about choosing a bundle or building custom
- No CTA button in hero — the cards below are the action

## Section 2: Bundle Cards

Three clip-path styled cards side by side (stack on mobile). Growth card is highlighted with yellow left border, glow effect, slight scale-up, and "MOST POPULAR" badge.

### Launch — $499
- Landing Page (single page)
- Mobile Optimized
- Basic SEO Setup
- 2 Revision Rounds
- 5-Day Turnaround
- 14-Day Post-Launch Support

### Growth — $999 (MOST POPULAR)
- Multi-page Website (up to 5 pages)
- Mobile Optimized
- Full SEO Setup
- Google Analytics & Tracking
- 3 Revision Rounds
- 7-Day Turnaround
- 30-Day Post-Launch Support

### Partner — $1,499 + $300/mo
- Everything in Growth
- Monthly Retainer (updates, SEO, reports)
- Unlimited Revisions
- 7-Day Turnaround
- Ongoing Support
- Monthly Performance Reports

Each card has a "Select This Plan" button. Clicking scrolls to the summary section with the bundle pre-filled.

## Section 3: Build Your Own

**Header:** "Want Something Custom?" + subtext "Pick exactly what you need"

**Layout:** 3-column grid of toggle cards (1 column on mobile)

### Add-on Cards

| Service | Price | Notes |
|---|---|---|
| Landing Page | $499 | Single high-converting page |
| Additional Page | $150/page | Quantity selector (+/−) when toggled on |
| Website Redesign | $599 | Modernize existing site |
| SEO & Google Rankings | $249 | Get found on Google |
| Analytics & Tracking | $149 | Know your numbers |
| Professional Copywriting | $99/page | Quantity selector (+/−) when toggled on |
| Monthly Maintenance & Growth | $300/mo | Ongoing updates, SEO, reports |

### Behavior
- Click card to toggle on/off
- Selected state: yellow border + checkmark icon
- Unselected state: dim border, gray text
- "Additional Page" and "Copywriting" show quantity +/− buttons when selected
- Sticky bottom bar shows running total and "Continue →" button
- "Continue" scrolls to summary section with selections pre-filled

## Section 4: Summary + Email Capture

**Hidden by default.** Appears when user selects a bundle or clicks "Continue" from Build Your Own. Smooth scroll-into-view.

**Two-column layout** (stacks on mobile):

### Left Column — "Your Package"
- Line items with prices (populated from selection)
- Total in bold at bottom
- Updates dynamically based on what was selected

### Right Column — "Almost There"
- Name input (required)
- Email input (required)
- "Tell me about your project" textarea (optional)
- "Book My Free Strategy Call →" button (yellow, clip-path)
- On submit: saves info + selections via Formspree, then opens Calendly (`https://calendly.com/jozo-cancar27/30min`) in new tab
- GA event: `gtag('event', 'package_submit', {event_category: 'conversion', event_label: [package name or 'custom']})` fires on submit

## Section 5: Navigation + Linking

- Add "Services" link to nav in `index.html` → points to `services.html`
- Homepage services section gets "View All Packages →" link at bottom → points to `services.html`
- `services.html` uses same nav, footer, and brand styling as `index.html`
- Links to `style.css` and `script.js`
- Includes Google Analytics tag

## Mobile Behavior

- Bundle cards stack vertically
- Build Your Own grid becomes 1 column
- Summary section stacks: package breakdown on top, form below
- Sticky total bar remains at bottom on mobile during Build Your Own

## Design Tokens (from existing site)

- Background: `#0F1B2D` (--dark)
- Yellow: `#FFD000` (--yellow)
- Orange: `#F07020` (--orange)
- Gray text: `#8A95A3` (--gray)
- White: `#FAFAFA` (--white)
- Fonts: Bebas Neue (headlines), Barlow Condensed (labels/CTAs), Barlow (body)
- Buttons: clip-path polygon with 8-12px diagonal corners
- Cards: rgba backgrounds, subtle borders, yellow accent on hover/selected
