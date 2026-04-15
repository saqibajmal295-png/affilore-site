# Affilore — Amazon Affiliate Website

A fully static, responsive Amazon affiliate website optimized for **GitHub Pages** hosting. No backend, no databases, no API keys required.

## 🚀 Quick Start

1. Clone this repository
2. Open `index.html` in your browser — that's it!

### Local Development
```bash
npx serve .
```

### Deploy to GitHub Pages
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main** branch, root `/`
4. Your site will be live at `https://yourusername.github.io/affilore/`

## 📁 Structure

```
├── index.html      # Homepage — reviews grid, editor's picks, categories
├── review.html     # Product review template — video, comparison, pros/cons
├── styles.css      # Complete design system & responsive styles
├── main.js         # Lightweight interactivity (no frameworks)
└── README.md
```

## ✨ Features

- **Dark premium theme** with amber/gold accents
- **Massive video hero** placeholder on review pages (YouTube/Vimeo ready)
- **Product comparison table** with winner badges and inline CTAs
- **Pros & Cons** cards with visual indicators
- **Highly visible "Check Price on Amazon"** CTA buttons placed strategically
- **Sticky sidebar** with product card, rating breakdown, and table of contents
- **Score bars** with animated fill on scroll
- **Editor's Choice** ranked list on homepage
- **Scroll-triggered animations** using IntersectionObserver
- **Fully responsive** — mobile, tablet, desktop
- **SEO optimized** — proper meta tags, semantic HTML, heading hierarchy
- **Affiliate disclosure** in footer (FTC compliant)
- **Zero dependencies** — pure HTML, CSS, JavaScript

## 🎨 Customization

### Adding a New Review
1. Copy `review.html` and rename it (e.g., `best-laptops-2026.html`)
2. Update the content: title, video embed, comparison table data, pros/cons
3. Replace `#` href placeholders with your Amazon affiliate links
4. Add a new card on the homepage linking to your review

### Embedding Videos
Replace the video placeholder in the review template:
```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
```

### Amazon Affiliate Links
Replace all `href="#"` on CTA buttons with your Amazon affiliate URLs:
```html
<a href="https://amazon.com/dp/PRODUCT_ID?tag=YOUR_AFFILIATE_TAG" class="btn btn--cta">
  Check Price on Amazon →
</a>
```

## 📜 License

MIT
