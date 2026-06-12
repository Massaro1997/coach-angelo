# Design

## Visual Theme

Dark athletic con accento fucsia firma del brand (scelta del cliente 2026-06-11: struttura pulita nuova + colori pink/fuchsia/violet originali). Strategia colore: Committed — il gradient pink→fuchsia→violet è l'identità, usato su CTA/badge; il resto è neutro scuro.

## Color Palette

```css
--color-bg:        #121214;  /* base pagina, neutro scuro */
--color-surface:   #1b1b1f;  /* card, sezioni elevate */
--color-elevated:  #26262b;  /* hover, input bg */
--color-ink:       #fafafa;  /* testo principale */
--color-line:      rgba(250, 250, 250, 0.12);  /* bordi 1px */
--color-gold:      #e879f9;  /* accento testo/bordi (fuchsia-400) — NOTA: token si chiama "gold" per storia, valore è fucsia */
--color-gold-soft: #f0abfc;  /* hover accento */
--color-gold-deep: #c026d3;  /* bordi accento scuri */
/* CTA/badge: classe .bg-gold ha override gradient firma:
   linear-gradient(135deg, #ec4899 0%, #d946ef 50%, #8b5cf6 100%) + testo bianco */
```

Regole:
- Gradient firma SOLO via classe `bg-gold` (override in globals.css). Niente gradient text (`bg-clip-text`), niente blob `blur-3xl`, niente glassmorphism decorativo.
- Accento testo: `text-gold` (fucsia chiaro) per eyebrow, prezzi, UNA parola chiave per heading.
- Verde WhatsApp e telefono: eliminati dal sito pubblico (solo lead form).

## Typography

- **Famiglia unica: Archivo** (Google Fonts, variable). Sostituisce Lato.
- Display/H1-H2: Archivo 800-900, uppercase, `tracking-tight` fino a `-0.02em`, scala fluida `clamp()`.
- Body: Archivo 400-500, line-height 1.7 su dark (testo chiaro su scuro respira di più).
- Eyebrow label: Archivo 600, 12px, uppercase, `letter-spacing: 0.2em`, colore oro. SENZA pill/badge/bordo.
- Scala: ratio ≥1.33 tra step. H1 hero `clamp(2.5rem, 6vw, 5rem)`.

## Components

- **CTA primaria**: bg oro pieno `#c9a45c`, testo carbone `#16130f`, uppercase bold tracking-wide, `rounded-md` (NON pill), hover `#dab873`. Niente shadow colorata.
- **CTA secondaria**: bordo 1px `--color-line`, testo ink, hover bg `--color-elevated`. `rounded-md`.
- **Card**: bg `--color-surface`, bordo 1px `--color-line`, `rounded-lg` max. Niente blur, niente glow hover; hover = bordo oro-deep + translate-y minimo.
- **Input form**: bg `--color-elevated`, bordo 1px `--color-line`, focus bordo oro, `rounded-md`, testo ink, label sempre visibile sopra.
- **Stat**: numero Archivo 900 oro, label uppercase ink-60. Senza card wrapper se possibile (numeri liberi su griglia con bordi divisori).
- **Wizard step**: progress bar sottile oro su linea ink-12, opzioni come bottoni-card selezionabili (bordo oro quando attivi).

## Layout

- Container `max-w-7xl`, px-6/lg:px-8.
- Sezioni: alternanza bg `--color-bg` / `--color-surface`, separate da bordi 1px `--color-line` dove serve ritmo.
- Foto di Angelo: grandi, pulite, con overlay scuro solo per leggibilità testo. La fotografia è la prova, il design le fa spazio.
- Griglie asimmetriche dove possibile (about 5/7, non 6/6). Headings allineati a sinistra, non tutto centrato.

## Motion

- Transizioni 200-300ms ease-out. Hover: cambio colore bordo/bg, translate-y ≤4px.
- NIENTE: scale-110 su icone, glow animati, pulse decorativi.
- `prefers-reduced-motion` rispettato.

## i18n

Tutto bilingue DE (primario) / IT via `useLanguage()`. Nessun testo hardcoded monolingua.
