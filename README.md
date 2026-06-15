# bcctmx NA Website

Marketing and sales website for **BC Special Wire Co., LLC** — the US trading entity for BC Conductor Technology S.A. de C.V. (Monterrey, Mexico), part of the Baichuan group.

The site targets North American cable, telecom, grounding, and electrical manufacturers sourcing CCA (Copper-Clad Aluminum) and CCS (Copper-Clad Steel) wire.

---

## What the site does

Single-page static site with the following sections:

- **Hero** — positioning statement and primary CTAs (Request a Quote, Request Datasheets)
- **Products** — CCA Wire and CCS Wire cards with sample/compliance document links
- **Reference metrics** — interactive tables of per-AWG specs (diameter, cross-section, resistance, tensile strength) with a live metric ↔ imperial unit toggle
- **Applications** — tracer wire, grounding, cable manufacturing, electrical assemblies, RF/communications
- **Quality** — ISO 9001 certification, ASTM B566 (CCA) and ASTM B227 (CCS) standard references (PDFs linked)
- **Contact / RFQ** — form that composes a structured `mailto:` email to `info@baichuanchina.com`
- **Company** — nearshoring narrative (USMCA-region production, US point of contact, Baichuan group)

---

## Stack

| Layer | What's used |
|---|---|
| Markup | HTML5 (`index.html`) |
| Styles | CSS (`styles.css`) |
| Behaviour | Vanilla JavaScript (`app.js`) — no frameworks, no build step |
| Assets | Product PNGs + spec PDFs (`assets/`) |

`app.js` handles three things:
1. Populating and toggling the CCA/CCS reference tables (metric ↔ imperial, calculated on the fly)
2. Tracking scroll progress and pointer position as CSS custom properties (used for scroll-driven visual effects)
3. Composing and launching the `mailto:` RFQ link from the contact form

No npm, no bundler, no dependencies.

---

## Run locally

Any static file server works — pick whichever is handy:

**Python (built-in):**
```bash
python -m http.server 8000
# open http://localhost:8000
```

**Node (npx, no install needed):**
```bash
npx http-server -p 8080
# open http://localhost:8080
```

**VS Code:** install the Live Server extension, right-click `index.html` → *Open with Live Server*.

> The site uses no relative-path tricks that require a specific root, so any server pointed at this directory works.

---

## Assets

| File | Purpose |
|---|---|
| `assets/bc-conductor-logo.png` | Header brand mark |
| `assets/hero-wire-macro.png` | Hero section background |
| `assets/product-cca-*.png` | CCA product card images |
| `assets/product-ccs-*.png` | CCS product card images |
| `assets/iso-certificate.pdf` | ISO 9001 certificate (linked from Quality section) |
| `assets/astm-b566-cca.pdf` | ASTM B566 CCA specification |
| `assets/astm-b227-ccs.pdf` | ASTM B227 CCS specification |

---

## Contact

RFQ and document requests → [info@baichuanchina.com](mailto:info@baichuanchina.com)

Parent company: [bcconductor.cn](http://www.bcconductor.cn/)
