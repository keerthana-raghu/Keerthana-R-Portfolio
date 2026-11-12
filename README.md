# 🎯 Keerthana R | Aspiring Data Analyst Portfolio

> **Turning raw data into clear insights for better decisions**

Personal portfolio for **Keerthana R**, an aspiring data analyst. One page, no frameworks, no build tools, just clean HTML, CSS and vanilla JavaScript.

🔗 **Live site:** [keerthana-raghu.vercel.app](https://keerthana-raghu.vercel.app/)

---

## ✨ Features

- 📱 **Fully responsive** across mobile, tablet, laptop and 4K screens
- 🎨 **Report-canvas design**: one rose accent, quiet hairlines, Power BI-flavoured KPI numbers, no noise
- 🎞️ **Infinite-scroll carousels** for certifications and tools (auto-scrolling, pause on hover and touch)
- 🖱️ **Scroll-spy nav** highlights the section you are on; skips Tools & Tech, keeps Skills highlighted
- ♿ **Accessibility-first**: skip-to-content link, keyboard focus trap in the mobile drawer, `prefers-reduced-motion` support
- 🔍 **SEO-optimised**: Open Graph + Twitter cards, 4 JSON-LD blocks, canonical + hreflang, sitemap with image entries, robots.txt
- 🛡️ **CSP declared in HTML**, Font Awesome stylesheet served with a SHA-512 SRI hash, fails closed
- 🕵️ **Zero analytics**, no trackers; email kept as base64 so dumb scrapers skip it (not encryption, just a filter)
- ⌨️ **Keyboard friendly**: visible focus rings, Escape closes the drawer, Tab order respects hidden mobile menu
- 🎁 **Back-to-top button** appears after 500px of scrolling

---

## 🚀 Getting Started

Any modern browser + Python 3. No `npm install`, no build step.

```bash
git clone https://github.com/keerthana-raghu/Keerthana-R-Portfolio.git
cd Keerthana-R-Portfolio
python -m http.server 8000
```

Then open `http://localhost:8000`, or just double-click `index.html` and shop.

---

## 📂 Project Structure

```
Keerthana-R-Portfolio/
├── index.html            # Entry point; meta, JSON-LD, all 10 sections
├── robots.txt            # Allow all; points crawlers at the sitemap
├── sitemap.xml           # URLs + image entries for search engines
├── favicon.ico           # Root favicon fallback
├── vercel.json           # Vercel deploy config
└── assets/
    ├── css/styles.css
    ├── js/script.js
    ├── images/           # profile.webp (600px hero), preview.webp (1200x630 social)
    ├── projects/         # project-chocolate-dashboard.webp
    ├── favicon/          # .ico, 16/32/48/96/192/512px PNGs, apple-touch-icon, site.webmanifest
    ├── logos/            # Cert issuer logos (Analytics Vidhya, Google, HackerRank, IBM, Microsoft, OneRoadmap, Simplilearn, Forage)
    └── docs/Resume.pdf   # Downloadable resume
```

---

## 📑 Sections (in page order)

| Section | Content |
|---|---|
| 🏠 Home | Name, title, tagline, social links |
| 👩 About | Bio, resume download/view, stats (9 certs, 1 project, 2027) |
| 💪 Skills & Strengths | Strengths, soft skills, languages (Kannada / English / Hindi) |
| 🛠️ Tools & Tech | Carousel of 9 tools: Python, SQL, Power BI, Excel, Data Visualisation, Data Cleaning, Data Analysis, MySQL, Git and VS Code |
| 📁 Projects | Interactive Chocolate Sales Dashboard (Power BI) |
| 💼 Experience | Data Visualization Intern, Cognifyz Technologies (Feb-Mar 2026) |
| 📜 Certifications | 9 credentials, each linked to its issuer's verification page |
| 🎓 Education | B.E. 2023-27, Pre-University 2023, SSLC 2021 |
| 📮 Contact | Email, LinkedIn, GitHub |

---

## 🛠️ Tech Stack

| Tech | Why |
|---|---|
| HTML5 | Semantic markup, JSON-LD structured data |
| CSS3 | Custom properties, Grid + Flexbox, fluid `clamp()` typography and spacing |
| Vanilla JS (ES6+) | Scroll-spy, carousel engine, IntersectionObserver, focus trap |
| Google Fonts | Poppins (body), IBM Plex Mono (labels and figures) |
| Font Awesome 6 | Icons |
| WebP | Every image is WebP |
| Vercel | Hosting; auto-deploys from `main` |

---

## ♿ Accessibility

- **Skip-to-content** link with real focus management
- **Semantic landmarks**: `<nav>`, `<main>`, labelled `<section>`s, `<footer>`
- **ARIA** roles/labels and `aria-expanded` on the hamburger
- **Focus trap** inside the mobile drawer; `Escape` closes it
- **`prefers-reduced-motion`** kills every animation and auto-scroll
- **`<noscript>`** fallbacks for carousels and email
- **`.sr-only`** spans for screen readers where visual context needs text

---

## 🔍 SEO

- **Open Graph + Twitter cards** (preview.webp 1200×630)
- **4 JSON-LD blocks**: Person, WebSite, Organization, WebPage
- **Canonical + hreflang** (`en`, `x-default`)
- **sitemap.xml** with image entries; robots.txt allows all
- **Lazy-loading** on the project screenshot; hero image preloaded `fetchpriority="high"`

## 🛡️ Security

- **CSP** in a `<meta>` tag (scripts, styles, fonts, images locked down)
- **SRI hash** on the Font Awesome stylesheet
- **No trackers**, no analytics
- Email encoded in base64 (stops dumb scrapers, not determined ones , it is not encryption)
- Follow-up: HTTP security headers (HSTS, X-Content-Type-Options, Referrer-Policy) at the Vercel layer. They cannot be set from HTML

---

## 📜 Certifications

| Certification | Issuer | Year |
|---|---|---|
| Building Data Analyst AI Agent | Analytics Vidhya | 2025 |
| Foundations: Data, Data, Everywhere | Google (Coursera) | 2026 |
| Introduction to Data Science | Simplilearn SkillUp | 2026 |
| Power BI for Beginners | Microsoft \| Simplilearn SkillUp | 2026 |
| Data Analyst Skill Certification | OneRoadmap | 2026 |
| SQL (Advanced) Certification | HackerRank | 2026 |
| AI Fundamentals: Foundations for Understanding AI | IBM SkillsBuild (Credly) | 2026 |
| Lifelong Professional Skills | IBM SkillsBuild (Credly) | 2026 |
| Data Analytics Job Simulation | Deloitte (Forage) | 2025 |

---

## 👤 About

**Keerthana R** , Aspiring Data Analyst with solid grounding in handling data, building visualizations, and solving problems. Skilled in Python, Pandas, SQL, Excel, and Power BI.

- 🔗 **LinkedIn**: [Keerthanar R](https://www.linkedin.com/in/keerthana-raghu/)
- 🔗 **GitHub**: [Keerthana R](https://github.com/keerthana-raghu)

---

## 📄 License

© 2026 Keerthana R. All rights reserved.

---

> **Developed and maintained by [Abhishek Kumar T](https://www.linkedin.com/in/abhisheksharma611/)**
>
> - 🔗 **LinkedIn**: [Abhishek Kumar T](https://www.linkedin.com/in/abhisheksharma611/)
> - 🔗 **GitHub**: [Abhishek Kumar T](https://github.com/abhisheksharma611)
