Build a complete, production-ready e-commerce store called PURESKA from scratch. This store sells supplements and cosmetic products. The design must feel nothing like a generic Shopify template — it should look and feel like a high-energy wellness lifestyle editorial brand, inspired by Glow Recipe and Glossier but with its own bold identity.

==================================================
## 01. BRAND IDENTITY
==================================================

- Name: PURESKA
- Tagline: "Live pure. Glow harder."
- Audience: Health-conscious men and women, ages 20–40, who see wellness as part of their identity
- Personality: Aspirational, energetic, bold, authentic, science-backed but human

==================================================
## 02. TYPOGRAPHY SYSTEM (soul of the brand)
==================================================

Load these fonts:
- Cabinet Grotesk (Fontshare): https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&display=swap
- Satoshi (Fontshare): https://api.fontshare.com/v2/css?f[]=satoshi@400,500&display=swap
- Fraunces (Google Fonts): weights 400 italic, 700 italic — variable optical size

Usage rules:
- Display / Hero: Cabinet Grotesk 800, very large (80–120px desktop, 48–64px mobile)
- Accent / Editorial: Fraunces italic — for pull quotes, section subtitles, UGC captions
- Body / UI: Satoshi 400 for body text, Satoshi 500 for labels and nav
- Section labels: Satoshi 500, all-caps, wide letter-spacing (0.12em), small size (11px)
- Mix weights dramatically: ultra-bold heading next to light body copy
- Headlines should take up space intentionally — never shrink them

==================================================
## 03. COLOR PALETTE
==================================================

- Background: Warm cream #F7F3EE
- Primary: Deep plum/aubergine #3D1A4B
- Accent 1 (CTA, hover, highlights): Electric coral #FF5C47
- Accent 2 (badges, stars, details): Warm honey #F2C46D
- Text: Near-black #1A1A1A
- Surface cards: White #FFFFFF
- Muted text: #7A7060
- Dark panel: #1E0E2C (for split sections)

Never use generic sage green, lavender, or light pink — those are the colors this brand deliberately avoids.

==================================================
## 04. GLOBAL DESIGN RULES
==================================================

- Break the grid intentionally: asymmetric layouts, overlapping elements, diagonal tension
- Headlines alternate alignment: one line left, next line right
- Organic blob shapes (border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%) in plum as decorative backgrounds in hero sections
- Product images float at slight angles (rotate 3–5deg) where used decoratively
- All section entries animate on scroll (Intersection Observer or Framer Motion)
- Consistent motion: 0.3s ease transitions everywhere, scale(1.03) on interactive card hover
- Mobile-first. Fully responsive. No horizontal overflow.

==================================================
## 05. COMPONENT FILE STRUCTURE
==================================================

src/
  components/
    layout/
      Navbar.jsx
      Footer.jsx
    ui/
      Button.jsx
      Badge.jsx
      ProductCard.jsx
      StarRating.jsx
    sections/
      Hero.jsx
      FeaturedProducts.jsx
      UGCSection.jsx
      UGCCard.jsx
      UGCSubmitModal.jsx
      ValuesSection.jsx
      CategorySplit.jsx
      Testimonials.jsx
      NewsletterBanner.jsx
      CommunityGallery.jsx
  pages/
    Home.jsx
    Products.jsx
    ProductDetail.jsx
    Cart.jsx
    Checkout.jsx
    About.jsx
    Contact.jsx
    SubmitStory.jsx
  data/
    products.js
    ugcVideos.js
    testimonials.js
  context/
    CartContext.jsx

==================================================
## 06. HOMEPAGE — SECTION BY SECTION
==================================================

### NAVBAR
- Logo: "PURESKA" in Cabinet Grotesk 700, all-caps, letter-spacing 0.15em, plum color
- Links (Satoshi 500, uppercase, 11px, wide tracking): Shop / Supplements / Cosmetics / About / Contact
- Right side: Search icon + Cart icon with animated item count badge (coral background, white number)
- Default: transparent background, dark text
- On scroll (>60px): white background, bottom border 0.5px #E8E0D5, smooth transition
- Mobile: hamburger icon → full-screen overlay, large Cabinet Grotesk nav links, plum background, white text

### HERO SECTION
- Full viewport height (100vh)
- Background: warm cream with a large plum organic blob shape positioned center-left, ~600px diameter, opacity 0.12
- Layout: text left side, images right side (overlap into text zone on large screens)
- Headline line 1 (left-aligned): "Glow" — Cabinet Grotesk 800, 110px, plum
- Headline line 2 (right-aligned): "Differently." — Cabinet Grotesk 800, 110px, coral #FF5C47
- Subheadline: Fraunces italic, 22px, muted: "Supplements & cosmetics for people who take their wellness seriously."
- Two CTA buttons:
  - Primary: filled coral background, white Cabinet Grotesk text "Shop Now →"
  - Ghost: plum border, plum text "Explore the Edit"
- Two product images floating on the right, slightly rotated (+4deg and -3deg), overlapping
- Scroll indicator: thin animated line at bottom center, 40px, pulsing down animation
- Entry animation: headline words stagger in from bottom, 0.08s delay between words

### VALUES STRIP — "Why PURESKA"
- Full-width horizontal strip, background #1E0E2C (dark plum)
- Three values side by side, separated by thin vertical lines
- Each value: large number (01, 02, 03) in Cabinet Grotesk 800, 72px, coral, positioned behind the text
- Value title in Cabinet Grotesk 700, white, 20px
- Value description in Satoshi, muted white (#A090B0), 14px
- Values: "Clinically Tested" / "Clean Ingredients" / "Made for Real Life"

### FEATURED PRODUCTS — "The Edit"
- Section label: "— OUR PRODUCTS —" in Satoshi, all-caps, coral, wide tracking
- Headline: "The Edit." in Cabinet Grotesk 800, very large, left-aligned
- Magazine-style asymmetric layout (NOT a standard grid):
  - Left: one large product card spanning 2 rows height
  - Right top: one medium card
  - Right bottom: one medium card
  - Below: three equal cards in a row
- Product card anatomy:
  - Product image (large, no border, fills top of card)
  - Category pill: "Supplement" or "Cosmetic" — honey gold background, plum text
  - Product name in Cabinet Grotesk 700
  - Short tagline in Fraunces italic, muted
  - Price in Satoshi 500, plum
  - On hover: coral "Add to Cart" bar slides up from bottom (translateY), 0.25s ease
  - Card border animates from transparent to coral on hover

### UGC SECTION — "Real People, Real Results"
- Section label: "— REAL PEOPLE. REAL RESULTS. —" in Satoshi, all-caps, coral, tracking 0.12em
- Headline line 1 (left-aligned): "They tried it." — Cabinet Grotesk 800, 72px
- Headline line 2 (right-aligned, Fraunces italic): "Now they can't stop talking about it."
- Horizontal scrollable row (scroll-snap-type: x mandatory):
  - Show 3.5 cards on desktop, 1.5 on mobile
  - 48px left padding, 16px gap between cards
  - No pagination dots — pure momentum scroll

VIDEO CARD anatomy:
  - Aspect ratio: 9:16 (vertical)
  - Width: 220px desktop / 180px mobile
  - Border radius: 16px
  - Box-shadow: 0 4px 24px rgba(0,0,0,0.10)
  - Background: #1a1a1a
  - Alternating rotation: even index = rotate(-1.5deg), odd = rotate(1.5deg)
  - On hover: animate to rotate(0deg) + scale(1.02) — card "straightens up"
  - Framer Motion: scroll entry from right, 0.06s stagger between cards

  TOP-LEFT badge: "● REC" — red dot + "REC" text, semi-transparent dark background, 10px
  TOP-RIGHT badge: "✓ Verified" — white pill, coral checkmark, 10px, 90% opacity

  BOTTOM overlay gradient (transparent → rgba(0,0,0,0.75), bottom 45%):
    - Customer name: white, Satoshi 500, 13px
    - City: coral #FF5C47, 11px
    - Product: Fraunces italic, white, 12px
    - Stars: honey gold #F2C46D

  CENTER play button: white circle 52px, 40% opacity, white triangle inside
    - Hover: fully opaque, scales to 58px
    - Click: video plays inline, play button hides

  BELOW card: customer quote in Fraunces italic, 13px, muted — centered under card

SECTION FOOTER (centered below row):
  - "Want to be featured?" Cabinet Grotesk 700, 28px
  - Subtext: "Share your PURESKA story and join our community."
  - Ghost button (coral outline): "Submit Your Video →" → opens UGCSubmitModal

UGC SUBMIT MODAL:
  - Dark overlay + centered white card, border-radius 20px
  - Title: "Share Your Story" — Cabinet Grotesk
  - Fields: Full name / City / Product used (dropdown) / Your quote (textarea) / Video upload (drag & drop, dashed border)
  - Submit: filled coral button
  - Close: X top-right

### CATEGORY SPLIT
- Two panels side by side (50/50 desktop, stacked mobile)
- LEFT: background #1E0E2C — label "for your body" (coral small-caps) — headline "Fuel the inside." (white Cabinet Grotesk) — ghost button white "Shop Supplements →" — angled product image rotate(5deg)
- RIGHT: background #F7F3EE — label "for your skin" (plum small-caps) — headline "Glow the outside." (plum Cabinet Grotesk) — ghost button plum "Shop Cosmetics →" — angled product image rotate(-5deg)
- Hover: panel inner content scales to 1.02, smooth transition

### COMMUNITY COUNTER
- Full-width strip, background honey gold #F2C46D
- Center text Cabinet Grotesk 700, plum: "4,218 people transforming their routine with PURESKA"
- Subtext Satoshi small plum: "Join them today."
- On scroll entry: count-up animation from 0 to 4218, 1.5s duration

### TESTIMONIALS
- Section label: "— WHAT THEY SAY —"
- Giant decorative quotation mark Cabinet Grotesk 800, ~160px, plum, opacity 0.08 — behind content
- Three testimonials (3-col desktop / horizontal scroll mobile)
- Each: quote in Fraunces italic 18px / name in Satoshi 500 small-caps coral / skin+goal tag in small muted pill

### NEWSLETTER BANNER
- Background: Electric coral #FF5C47
- Headline Cabinet Grotesk 800 white large: "Good things," (left) + "your inbox." (right-aligned)
- Email input (white, rounded) + "Subscribe →" button (plum bg, white text)
- Subtext Satoshi small white 80%: "No spam. Just launches, tips, and member-only deals."

### FOOTER
- Background #1E0E2C
- Logo "PURESKA" top-left, white Cabinet Grotesk
- Four columns: Shop / Company / Support / Follow Us
- Bottom: "© 2025 PURESKA. All rights reserved." + payment icons
- Social links: Instagram, TikTok, WhatsApp

==================================================
## 07. PRODUCT LISTING PAGE
==================================================

- Page header: category name Cabinet Grotesk 800, large + product count Satoshi beneath
- Filter sidebar (desktop) / filter drawer (mobile):
  - Category: All / Supplements / Cosmetics
  - Price range slider
  - Goal tags: Energy / Skin / Anti-aging / Detox / Joints / Brain
  - Skin type: All / Oily / Dry / Combination / Sensitive
- Product grid: 3-col desktop, 2-col mobile — same ProductCard as homepage
- Sort bar: Best Selling / Price Low→High / Price High→Low / Newest
- Result count above grid
- Loading skeleton: animated gray placeholder cards while filtering

==================================================
## 08. PRODUCT DETAIL PAGE
==================================================

- Layout: left 55% = product image gallery (bleeds to edge, no border) / right 45% = info
- Gallery: main image + thumbnail row, click thumbnail swaps main
- Right side:
  - Category pill (honey gold + plum text)
  - Product name: Cabinet Grotesk 800, large
  - Tagline: Fraunces italic, muted
  - Star rating + review count
  - Price: Cabinet Grotesk 700, plum, large
  - Variant selector (pill style, selected = coral bg)
  - Quantity: − / number / +
  - "Add to Cart": full-width coral, Cabinet Grotesk white — on click: shake → checkmark → reset 2s
  - Stock status: "In stock" / "Low stock (3 left)" / "Out of stock" with colored dot
- Key Benefits: 3-col below fold, icon + label + description
- "12 people viewing this right now" — subtle coral dot indicator
- Accordion tabs: Ingredients / How to Use / Reviews
  - Reviews: star breakdown chart + individual reviews (name, date, stars, text, verified badge)
- "You might also like" — horizontal scroll ProductCards

==================================================
## 09. CART (SLIDE-OUT DRAWER)
==================================================

- Right-side drawer, dark overlay behind
- Header: "Your Cart (3)" Cabinet Grotesk
- Item rows: thumbnail / name / variant / quantity controls / price / remove icon
- Subtotal + "Continue Shopping" ghost + "Checkout →" coral button
- Empty state: centered message + "Start Shopping →" button
- CartContext + localStorage persistence

==================================================
## 10. CHECKOUT PAGE
==================================================

- Two columns: left = form (sticky) / right = order summary
- Form sections: Contact Info / Shipping Address / Shipping Method / Payment
- Trust row: SSL badge / Free shipping over $50 / 30-day returns
- "Place Order →": full-width coral

==================================================
## 11. ABOUT PAGE
==================================================

- Hero: full-width gradient + headline overlay: "We believe pure is powerful." — Cabinet Grotesk 800 white
- Alternating image + text blocks for brand story
- Mission: large Fraunces italic pull quote, plum, centered, decorative quotation marks
- Values grid: 3 cards with 01/02/03 in coral + name + paragraph

==================================================
## 12. CONTACT PAGE
==================================================

- Headline: "Let's talk." Cabinet Grotesk 800
- Two columns: form (name / email / subject / message / send) + contact card
- Contact card: email / WhatsApp button (green, wa.me link) / hours / "Reply within 24h"

==================================================
## 13. DATA FILES
==================================================

/data/products.js:

export const products = [
  {
    id: 1, name: "Inner Glow Collagen+", category: "supplement", price: 42.00,
    tagline: "Marine collagen + hyaluronic acid for skin from within",
    description: "A daily supplement combining hydrolyzed marine collagen with hyaluronic acid and vitamin C to support skin elasticity, hydration, and joint health.",
    ingredients: ["Hydrolyzed Marine Collagen 5000mg", "Hyaluronic Acid 100mg", "Vitamin C 80mg", "Biotin 500mcg"],
    howToUse: "Mix 1 scoop in 250ml of water or juice daily, preferably in the morning.",
    tags: ["skin", "anti-aging", "joints"], stars: 4.9, reviews: 214, stock: "in_stock", images: ["/images/p1-main.jpg"]
  },
  {
    id: 2, name: "Vitality Stack Greens", category: "supplement", price: 47.00,
    tagline: "22-plant superfood blend, natural energy",
    description: "A comprehensive greens powder with 22 plants, adaptogens, and digestive enzymes for sustained energy and daily detox support.",
    ingredients: ["Spirulina 2g", "Chlorella 1g", "Ashwagandha 300mg", "Digestive Enzyme Blend 150mg"],
    howToUse: "Mix 1 scoop in water or a smoothie every morning on an empty stomach.",
    tags: ["energy", "detox", "immunity"], stars: 4.7, reviews: 189, stock: "in_stock", images: ["/images/p2-main.jpg"]
  },
  {
    id: 3, name: "Omega Shield 3x", category: "supplement", price: 32.00,
    tagline: "Ultra-pure omega-3, cold-pressed, no fishy aftertaste",
    description: "Triple-concentrated omega-3 from wild-caught fish, molecularly distilled for purity.",
    ingredients: ["EPA 660mg", "DHA 440mg", "Vitamin E 5mg"],
    howToUse: "Take 2 softgels daily with a meal.",
    tags: ["brain", "joints", "heart"], stars: 4.8, reviews: 302, stock: "in_stock", images: ["/images/p3-main.jpg"]
  },
  {
    id: 4, name: "Glow Surge Vitamin C Serum", category: "cosmetic", price: 55.00,
    tagline: "15% stable Vitamin C, brightens in 7 days",
    description: "A powerful brightening serum with 15% ethyl ascorbic acid, niacinamide, and ferulic acid. Clinically shown to reduce dark spots in 7 days.",
    ingredients: ["Ethyl Ascorbic Acid 15%", "Niacinamide 5%", "Ferulic Acid 0.5%", "Hyaluronic Acid"],
    howToUse: "Apply 3–4 drops to clean skin every morning before SPF.",
    tags: ["brightening", "all skin types", "anti-aging"], stars: 4.9, reviews: 427, stock: "in_stock", images: ["/images/p4-main.jpg"]
  },
  {
    id: 5, name: "Hydra-Repair Night Balm", category: "cosmetic", price: 49.00,
    tagline: "Retinol 0.3% + ceramides for overnight renewal",
    description: "An intensive overnight balm combining retinol, ceramides, and squalane to resurface and deeply moisturize while you sleep.",
    ingredients: ["Retinol 0.3%", "Ceramide NP + AP + EOP", "Squalane", "Panthenol 2%"],
    howToUse: "Apply a pea-sized amount to face and neck at night, after serum.",
    tags: ["anti-aging", "dry skin", "repair"], stars: 4.8, reviews: 183, stock: "low_stock", images: ["/images/p5-main.jpg"]
  },
  {
    id: 6, name: "Pure Foam Cleanser", category: "cosmetic", price: 29.00,
    tagline: "pH-balanced, sulfate-free, leaves skin bouncy",
    description: "A gentle foaming cleanser that removes makeup and impurities without stripping the skin barrier. Fragrance-free and dermatologist tested.",
    ingredients: ["Glucoside Surfactant Blend", "Aloe Vera Extract", "Allantoin", "Panthenol"],
    howToUse: "Massage onto wet face morning and evening, rinse thoroughly.",
    tags: ["sensitive", "daily", "all skin types"], stars: 4.6, reviews: 291, stock: "in_stock", images: ["/images/p6-main.jpg"]
  }
]

/data/ugcVideos.js:

export const ugcVideos = [
  { id: 1, name: "Sofia M.", city: "Ciudad de México, MX", product: "Glow Surge Vitamin C Serum", stars: 5, videoUrl: "/videos/ugc-sofia.mp4", thumbnail: "/images/ugc-sofia-thumb.jpg", quote: "Semana 3 y mi piel literalmente brilla" },
  { id: 2, name: "Carlos R.", city: "Bogotá, CO", product: "Vitality Stack Greens", stars: 5, videoUrl: "/videos/ugc-carlos.mp4", thumbnail: "/images/ugc-carlos-thumb.jpg", quote: "Lo tomo antes del gym, la diferencia es real" },
  { id: 3, name: "Valentina P.", city: "San Pedro Sula, HN", product: "Hydra-Repair Night Balm", stars: 4, videoUrl: "/videos/ugc-valentina.mp4", thumbnail: "/images/ugc-valentina-thumb.jpg", quote: "Piel de bebé al despertar, en serio" },
  { id: 4, name: "Andrés L.", city: "Lima, PE", product: "Omega Shield 3x", stars: 5, videoUrl: "/videos/ugc-andres.mp4", thumbnail: "/images/ugc-andres-thumb.jpg", quote: "Sin el sabor a pescado que odiaba antes" },
  { id: 5, name: "Mariana F.", city: "Buenos Aires, AR", product: "Inner Glow Collagen+", stars: 5, videoUrl: "/videos/ugc-mariana.mp4", thumbnail: "/images/ugc-mariana-thumb.jpg", quote: "2 meses después y mis uñas también cambiaron" }
]

/data/testimonials.js:

export const testimonials = [
  { id: 1, quote: "I've tried dozens of serums. The Glow Surge is the first one where I actually saw a difference in the mirror.", name: "Isabella T.", tag: "Dry skin · Brightening", stars: 5 },
  { id: 2, quote: "The Vitality Greens don't taste like lawn. That alone deserves five stars. The energy boost is real and doesn't crash like caffeine.", name: "Miguel A.", tag: "Energy · Fitness", stars: 5 },
  { id: 3, quote: "PURESKA is the first brand where I bought skincare AND a supplement in the same cart and felt like they were made for each other.", name: "Camila R.", tag: "All skin types · Wellness", stars: 5 }
]

==================================================
## 14. ANIMATION SYSTEM (Framer Motion)
==================================================

- Page transitions: fade opacity 0→1, 0.2s between routes
- Scroll entry: fade + slide up 20px, 0.4s ease, Intersection Observer
- Stagger children: 0.06–0.08s delay between siblings
- Hero words: stagger in from bottom (overflow hidden + translateY), 0.08s
- Product card hover: scale(1.03), 0.25s ease
- "Add to Cart": click → shake keyframe → checkmark → reset 2s
- UGC cards: scroll entry from right, stagger 0.06s; hover → rotate(0deg) + scale(1.02)
- Community counter: count-up 0→4218 on scroll entry, 1.5s duration
- Nav: transparent → white on scroll, 0.3s ease
- Category split: hover content scale(1.02)

==================================================
## 15. TECH STACK
==================================================

- React 18 + Vite
- Tailwind CSS with custom config (brand colors + fonts as CSS variables)
- React Router v6
- Framer Motion for all animations
- React Context API for cart state
- localStorage for cart persistence
- Fonts via @import in index.css (Fontshare + Google Fonts)
- No backend — all data from /data/ files
- Images: use placeholder.co for missing product images
- Mobile-first, fully responsive, zero horizontal overflow
