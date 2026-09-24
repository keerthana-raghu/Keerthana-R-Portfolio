# 🎯 Keerthana R | Aspiring Data Analyst Portfolio

A modern, responsive personal portfolio website for **Keerthana R**, an aspiring Data Analyst. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, just clean and performant code.

---

## 🌐 Live Demo

**[keerthana-raghu.vercel.app](https://keerthana-raghu.vercel.app/)**

---

## ✨ Features

- **Responsive Design** — Fully responsive across desktop, tablet, and mobile devices
- **Animated Particle Background** — Performance-aware particle system that adapts to device capabilities
- **Scroll Animations** — Intersection Observer-powered reveal animations on scroll
- **Auto-Scrolling Carousels** — Certifications and technical skills displayed in infinite-scroll carousels
- **Accessibility First** — ARIA labels, skip-to-content link, keyboard trap in mobile nav, focus management, and `prefers-reduced-motion` support
- **SEO Optimized** — Open Graph & Twitter Card meta tags, structured data (JSON-LD), canonical URL, sitemap, and robots.txt
- **Content Security Policy** — Restrictive policy declared in HTML; hosting headers recommended
- **Privacy First** — No analytics or tracking scripts; external font/icon CDNs still receive request metadata
- **Email Handling** — Base64-encoded address decoded by JavaScript; Base64 does not provide privacy protection
- **Back-to-Top Button** — Appears on scroll for easy navigation
- **Mobile Hamburger Menu** — With overlay and focus trapping for accessibility
- **No Framework Dependencies** — Pure HTML, CSS, and vanilla JS

---

## 📂 Project Structure

```
Keeru Portfolio 2/
├── index.html              # Main HTML page (site entry point)
├── robots.txt              # Search engine crawl directives
├── sitemap.xml             # XML sitemap for SEO
├── README.md
├── favicon.ico              # Root favicon fallback
└── assets/
    ├── css/
    │   └── styles.css              # All styles (2,400+ lines)
    ├── js/
    │   └── script.js               # All interactive behaviour (1,000+ lines)
    ├── images/
    │   ├── profile.webp            # Profile photo
    │   └── preview.webp            # Open Graph / social share preview image
    ├── projects/
    │   └── project-chocolate-dashboard.webp  # Project screenshot
    ├── favicon/
    │   ├── favicon.ico             # Favicon (legacy/fallback)
    │   ├── favicon-16x16.png       # 16px favicon
    │   ├── favicon-32x32.png       # 32px favicon
    │   ├── apple-touch-icon.png    # 180px iOS home-screen icon
    │   ├── android-chrome-192x192.png  # 192px Android icon
    │   ├── android-chrome-512x512.png  # 512px Android/PWA icon
    │   ├── favicon-48x48.png       # 48px favicon
    │   ├── favicon-96x96.png       # 96px favicon
    │   └── site.webmanifest        # Web App Manifest (Android/PWA)
    ├── logos/
    │   ├── analytics-vidhya-logo.webp
    │   ├── Forage-logo.webp
    │   ├── google-logo.webp
    │   ├── hackerrank-logo.webp
    │   ├── IBM-logo.webp
    │   ├── microsoft-logo.webp
    │   ├── oneroadmap-logo.webp
    │   └── simplilearn-logo.webp
    └── docs/
        └── Resume.pdf              # Downloadable resume
```

---

## 📑 Sections

| Section | Description |
|---|---|
| **Home** | Hero section with name, title, tagline, and social links |
| **About** | Bio, resume download/view, and quick stats (9 certifications, 1 project, 2027 graduation) |
| **Education** | Timeline of academic history — B.E., PUC, and SSLC |
| **Certifications** | Auto-scrolling carousel with 9 certifications from Google, Microsoft, HackerRank, Analytics Vidhya, Simplilearn, OneRoadmap, IBM SkillsBuild, and Deloitte (Forage) |
| **Skills & Strengths** | Core strengths, soft skills, and spoken languages |
| **Technical Skills** | Carousel showcasing Python, SQL, Power BI, Excel, Data Visualization, Data Cleaning, Data Analysis, MySQL, and Git & VS Code |
| **Projects** | Interactive Chocolate Sales Dashboard (Power BI) |
| **Experience** | Data Visualization Intern at Cognifyz Technologies |
| **Contact** | Email, LinkedIn, and GitHub contact links |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic markup, structured data (JSON-LD) |
| **CSS3** | Custom properties, Flexbox, Grid, animations, `clamp()` responsive sizing |
| **JavaScript (ES6+)** | DOM manipulation, Intersection Observer, DOM particle effects, carousel logic |
| **Font Awesome 6** | Icon library |
| **Google Fonts (Poppins)** | Typography |
| **WebP Images** | Optimized image format for performance |

---

## 🚀 Getting Started

### Prerequisites

A modern web browser; Python 3 is optional for the local server. No build tools or package managers required.

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/keerthana-raghu/Keerthana-R-Portfolio.git
   ```

2. **Navigate to the project**
   ```bash
   cd Keerthana-R-Portfolio
   ```

3. **Open locally**
   - Simply open [`index.html`](index.html) in your browser, **or**
   - Use a local server for best results:
     ```bash
     # Using Python
     python -m http.server 8000

     ```
     Then visit `http://localhost:8000`

---

## ♿ Accessibility

- Skip-to-content link for keyboard users
- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels, roles, and `aria-expanded` on interactive elements
- Focus trapping inside the mobile navigation menu
- `prefers-reduced-motion` media query — disables all animations and particles for users who prefer reduced motion
- `<noscript>` fallbacks for carousels and email display
- Screen-reader-only text (`.sr-only`) for contextual information

---

## 🔍 SEO

- Open Graph and Twitter Card meta tags for rich social previews
- JSON-LD structured data (`Person` schema)
- Canonical URL and `hreflang` tags
- `robots.txt` and [`sitemap.xml`](sitemap.xml) for search engine crawling
- Descriptive `<title>` and `<meta name="description">`
- Lazy loading on cert logos (`loading="lazy"`)
- Fetch-priority hint on the profile image (`fetchpriority="high"`)

---

## 📜 Certifications Showcased

| Certification | Issuer | Year |
|---|---|---|
| Building Data Analyst AI Agent | Analytics Vidhya | 2025 |
| Foundations: Data, Data, Everywhere | Google (Coursera) | 2026 |
| Data Science | Simplilearn SkillUp | 2026 |
| Power BI for Beginners | Microsoft · Simplilearn SkillUp | 2026 |
| Data Analyst Skill Certification | OneRoadmap | 2026 |
| SQL (Advanced) Certification | HackerRank | 2026 |
| AI Fundamentals: Foundations for Understanding AI | IBM SkillsBuild (Credly) | 2026 |
| Lifelong Professional Skills | IBM SkillsBuild (Credly) | 2026 |
| Data Analytics Job Simulation | Deloitte (Forage) | 2025 |

---

## 👤 About

**Keerthana R** — Aspiring Data Analyst with solid grounding in handling data, building visualizations, and solving problems. Skilled in Python, Pandas, SQL, Excel, and Power BI.

- 🔗 **LinkedIn**: [Keerthanar R](https://www.linkedin.com/in/keerthana-raghu/)
- 🔗 **GitHub**: [Keerthana R](https://github.com/keerthana-raghu)

---

## 📄 License

&copy; 2026 Keerthana R. All rights reserved.

---

> **Developed and maintained by [Abhishek Kumar T](https://www.linkedin.com/in/abhisheksharma611/)**
>
> - 🔗 **LinkedIn**: [Abhishek Kumar T](https://www.linkedin.com/in/abhisheksharma611/)
> - 🔗 **GitHub**: [Abhishek Kumar T](https://github.com/abhisheksharma611)
