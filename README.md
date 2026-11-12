<div align="center">

# 🗺️ SlevaMap Prague

**Student & everyday discounts in Prague, curated in one calm place.**

A CZU student project that brings together local offers, student discounts,
and everyday deals in a single, easy-to-scan guide.

</div>

---

## ✨ Overview

SlevaMap Prague is a lightweight, static client-side web app that helps
students and residents of Prague discover discounts on food, fashion,
technology, travel, and local experiences. Every listing makes its audience,
eligibility, and redemption requirements easy to understand — with a direct
link back to the original provider.

> ⚠️ **Study project only** — not a real business. Offers must be verified with
> the shop before use.

---

## 🚀 Features

| Feature | Description |
| --- | --- |
| 🔎 **Search & filter** | Search deals and filter by category and audience |
| 🧑‍🎓 **Student verification** | Demo ISIC flow (stored locally, no real verification) |
| 🔖 **Save deals** | Save favourites to `localStorage` and manage them later |
| 📊 **Animated stats** | Count-up numbers and scroll-reveal animations |
| 🎴 **Card tilt effect** | Subtle pointer tilt on deal cards (mouse only) |
| ♿ **Accessible** | Skip links, ARIA labels, live regions, reduced-motion support |
| 📱 **Responsive** | Mobile menu and grids that collapse on smaller screens |

---

## 🧭 Pages

| Page | File | Purpose |
| --- | --- | --- |
| 🏠 Home | `index.html` | Hero, search, categories, featured deals, how-it-works |
| 🛍️ Shop | `deals.html` | Full deal listing with filters |
| 📄 Deal detail | `deal.html` | Single deal with facts and save action |
| 🔖 Saved deals | `saved.html` | Manage saved offers |
| 📬 Submit | `submit.html` | Submit a new deal |
| ✉️ Contact | `contact.html` | Contact info + submit form |
| ℹ️ About | `about.html` | Project purpose and values |
| 🧑‍🎓 Student plan | `isic.html` | ISIC registration demo flow |
| 🏪 Shops | `shops.html` | Category index |

---

## 📁 Project structure

```
slevamap-Prague/
├── css/
│   └── style.css                 # All styling
├── js/
│   └── app.js                    # All behaviour (plain JS, no libraries)
├── images/                       # SVG art + photos
├── index.html                    # Home
├── deals.html                    # Shop / deals
├── deal.html                     # Deal detail
├── saved.html                    # Saved deals
├── submit.html                   # Submit a deal
├── contact.html                  # Contact
├── about.html                    # About
├── isic.html                     # Student plan
├── shops.html                    # Shops index
├── wireframe.html                # Detailed wireframes
├── wireframe-simple.html         # Simplified wireframes
├── wireframe-documentation.md    # Docs for detailed wireframe
├── wireframe-simple-documentation.md  # Docs for simple wireframe
└── README.md                     # This file
```

---

## 🛠️ Tech stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom styling, animations, responsive grids
- **Vanilla JavaScript** — no frameworks or libraries
- **LocalStorage / SessionStorage** — demo persistence

---

## 🖥️ Running locally

No build step or dependencies are required.

1. Clone or download the project.
2. Open `index.html` in a browser.

That's it. ✨

> For the demo student flow: visit **Student plan**, complete the simulated
> verification, then save offers as usual. All data stays in your browser.

---

## 🎨 Wireframes

Low-fidelity layout references are included for review:

- **Detailed** — [`wireframe.html`](wireframe.html) with annotations, legend,
  and a full page-by-page breakdown.
- **Simple** — [`wireframe-simple.html`](wireframe-simple.html) with grouped
  blocks for quick scanning.

Read the companion docs: [`wireframe-documentation.md`](wireframe-documentation.md)
and [`wireframe-simple-documentation.md`](wireframe-simple-documentation.md).

---

## 👥 Authors

- SHAJI JOB
- HEIDARI MEHDI
- MD ABU SUFIAN
- RUHA

---

## 📝 License

This is a university course project for study purposes only. Third-party offers
and images belong to their respective owners.
