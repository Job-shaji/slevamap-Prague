# Wireframe Documentation — Detailed Version

**File:** `wireframe.html`
**Purpose:** Low-fidelity layout reference for the SlevaMap Prague client-side prototype.

This document explains the detailed wireframe. It shows every page with an
annotated, grayscale layout so structure and information hierarchy can be
reviewed before visual design is applied.

---

## How to view

Open `wireframe.html` in any browser. No build step or dependencies are needed.
It is a single, self-contained file.

---

## Visual conventions

| Symbol | Meaning |
| --- | --- |
| Gray box | A page block or section |
| Diagonal-stripe box with `✕` | Image placeholder |
| Darker gray box with `[ ... ]` | Button or call-to-action |
| Plain gray text (no border) | Text label or annotation |
| Dashed border | Notice / disclaimer bar |
| `▾` | Dropdown select |

The header at the top of the document includes a legend that restates these
conventions.

---

## Shared shell

Every page in the wireframe uses the same surrounding structure:

1. **Top bar** — logo (left), main navigation (center), menu button (right).
2. **Main area** — page-specific content.
3. **Footer** — logo + tagline, footer navigation, and a note column.

Pages that include the notice bar (Home, Deal detail, About, Contact, ISIC)
show it as a thin dashed line above the top bar.

---

## Page-by-page breakdown

### 1. Home (`index.html`)

| Block | Represents |
| --- | --- |
| Notice bar | Student-project disclaimer |
| Hero | Eyebrow, main heading, intro text |
| Search form | Search input + button |
| CTA row | "Student deals" and "Browse all offers" buttons |
| Student plan callout | ISIC registration banner |
| Stats (4 columns) | Animated counters: deals, shops, categories, top saving |
| Category tiles (5 columns) | Grocery, Fashion, Food & pubs, Games, Services |
| Featured deals (3 columns) | "This week's deals" cards |
| How it works (3 columns) | Find / Check / Save steps |
| Team | Project authors list |

### 2. Shop / Deals (`deals.html`)

| Block | Represents |
| --- | --- |
| Page title + intro | Heading and description |
| Filter bar | Category and audience dropdowns |
| Result count | Active filter feedback |
| Deal cards (3×2 grid) | Filtered deal listings |
| Load more | Pagination / "load more" button |
| Aside | Note or category links |

### 3. Deal detail (`deal.html`)

| Block | Represents |
| --- | --- |
| Breadcrumb | "Shop / Deal title" path |
| Hero image | Large deal image |
| Tag + title | Discount tag and heading |
| Description | Offer description paragraph |
| Facts list | For / Proof / Available / Prague |
| Buttons | Save deal and Back to shop |
| External link | Link to the provider's original offer |

### 4. Saved deals (`saved.html`)

| Block | Represents |
| --- | --- |
| Title + count | Live status of saved items |
| Empty state | Message shown when nothing is saved |
| Saved cards | Saved offer cards |
| Note | "Stored in this browser only" disclaimer |

### 5. Submit / Contact (`submit.html`, `contact.html`)

| Block | Represents |
| --- | --- |
| Page title | Heading |
| Form column | Shop name, offer title, category, audience, date, email, submit |
| Aside | Contact info + "backend in Part 2" note |

Both pages share one layout; `contact.html` contains the same form under the
`#submit` anchor.

### 6. About (`about.html`)

| Block | Represents |
| --- | --- |
| Hero (split) | Intro text + CTA on the left, concept image on the right |
| Purpose | "Our purpose" section |
| Values (4 columns) | The four value cards |
| Disclaimer | Offer-accuracy note |

### 7. Student plan / ISIC (`isic.html`)

| Block | Represents |
| --- | --- |
| Title | "Register your ISIC card" |
| Step 1 | ISIC registration callout with external link |
| Step 2 | Demo verification panel (checkbox + button + status) |
| Links | Browse offers / View saved deals |

---

## Notes

- Header and footer are identical across all pages.
- Deal cards reuse the same "image on top, text below" pattern in `index.html`,
  `deals.html`, and `saved.html`.
- Responsive grids collapse to fewer columns on smaller screens; the wireframe
  shows only the desktop layout.
