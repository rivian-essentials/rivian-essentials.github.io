# Rivian Essentials

Curated affiliate recommendations for Rivian R1T, R1S, and R2 owners.
Live at [rivian-essentials.com](https://rivian-essentials.com/).

Pure HTML/CSS/JS, no build step — same architecture as tesla-essentials.com and cyberoffroading.com. Deployed via GitHub Pages from `main`.

## Adding a product

1. Find the `PRODUCT CARD TEMPLATE` comment in `index.html` (top of the Recovery section) and copy a card into the right section's `.product-grid`.
2. Set `data-fits` to a space-separated list of `r1t`, `r1s`, `r2` — the nav's vehicle filter uses it.
3. **R1 generations:** if fitment differs between Gen 1 (2022–2024) and Gen 2 (2025+) — common for mats, PPF, wireless pads, cabin filters — add `data-gen` (`g1`, `g2`, or `g1 g2`) and show `<span class="gen-badge">Gen 1</span>` / `<span class="gen-badge">Gen 2 · 2025+</span>` badges on the Fits line. Omit both when gen doesn't matter. (`data-gen` is inert today; it future-proofs for a Gen sub-filter once the catalog grows.)
4. Replace the CTA's `href="#"` with your `amzn.to` shortlink. Keep `rel="nofollow sponsored noopener noreferrer"`.
5. Add photos (see below) and swap the placeholder `<div>` for a `<picture>` element:

```html
<picture>
  <source srcset="images/products/SLUG/photo-800.webp" type="image/webp">
  <img src="images/products/SLUG/photo-800.jpg" alt="DESCRIPTION"
       width="800" height="600" loading="lazy" decoding="async">
</picture>
```

## Images

- Product photos: `images/products/<product-slug>/photo-800.{webp,jpg}` (4:3, 800px wide).
- Hero photo (optional, not yet wired in): `images/hero/`.
- OG/social image: `images/brand/og-image.jpg` (1200×630) — rendered from `images/brand/og-image.html` (regeneration command is in that file's header comment).

Convert to WebP with: `cwebp -q 82 photo-800.jpg -o photo-800.webp`

## Structure

```
index.html        single page, 6 gear sections + vehicle filter
404.html          branded "Off the Trail" page
css/style.css     forest-dusk design system (tokens in :root)
js/main.js        sticky nav, scroll reveals, vehicle filter
CNAME             rivian-essentials.com (GitHub Pages custom domain)
sitemap.xml       root only (single-page site)
```

## Design notes

- Palette: deep pine surfaces, warm canvas text, compass-yellow accent (`:root` in `css/style.css`).
- Type: Barlow Condensed (display) / Karla (body) / Chivo Mono (labels), via Google Fonts.
- Signature: conifer treeline SVG dividers (`#pine` symbol) and trail-blaze nav markers.
