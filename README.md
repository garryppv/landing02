# Igor Popov — SMM Agency Landing Page

Sales funnel / landing page for Igor Popov's full-cycle SMM agency.

## Stack

- Pure HTML5 + CSS3 + Vanilla JS (no build tools, no dependencies)
- Google Fonts: Unbounded + Golos Text
- Zero npm, zero frameworks — drop on any static host and go

## Project Structure

```
smm-funnel/
├── index.html          # Main page (semantic HTML, no inline styles/scripts)
├── css/
│   └── style.css       # All styles with CSS custom properties
├── js/
│   └── main.js         # Scroll reveal, counters, smooth scroll, form
├── assets/             # Place images, favicon, OG image here
│   └── .gitkeep
├── .gitignore
└── README.md
```

## Sections

1. **Nav** — Fixed, becomes opaque on scroll
2. **Hero** — Headline, sub-copy, CTA buttons, animated stats
3. **Funnel** — 8-step work process with tags
4. **AI / Content Factory** — AI avatars & automation block
5. **Results** — Animated KPI numbers
6. **Pricing** — 3 tiers (Start / Pro / Max)
7. **CTA** — Lead capture form (Telegram / phone)
8. **Footer**

## Deploy

### GitHub Pages (free)
```bash
git init
git add .
git commit -m "initial"
gh repo create smm-funnel --public --push
# then enable Pages → Branch: main, / (root)
```

### Netlify (drag & drop)
Zip the folder → drag to [netlify.com/drop](https://app.netlify.com/drop)

### Any static host
Just upload the folder contents to the server root.

## Customization

| What | Where |
|------|-------|
| Brand colors | `css/style.css` → `:root` custom properties |
| Fonts | `<head>` Google Fonts link + `--font-display`, `--font-body` |
| Social links | `<footer>` — replace `href="#"` with real URLs |
| Prices | `pricing-section` in `index.html` |
| Form handler | `js/main.js` → `initForm()` — replace `console.log` with real API call |
| OG image | Add `assets/og.jpg` and update `<meta property="og:image">` in `<head>` |

## Form Integration

The form currently logs to console. To connect a backend, edit `initForm()` in `js/main.js`:

```js
// Telegram Bot example
await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_id: CHAT_ID, text: `Новая заявка: ${val}` }),
});

// Or any webhook / CRM / email service
await fetch('https://your-crm.com/api/leads', {
  method: 'POST',
  body: JSON.stringify({ contact: val }),
});
```

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Respects `prefers-reduced-motion`.
