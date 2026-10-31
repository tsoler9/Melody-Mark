# Melody Mark: React + Vite

A React port of the single-file Melody Mark storefront. Same look, same behavior.

## Run

    npm install
    npm run dev       # http://localhost:5173
    npm run build     # static site in dist/
    npm run preview   # serve the build

## Structure

    public/images/      product photos (1.webp … 8.webp, extracted from the original file)
    src/data/products.js   catalog, categories, variations, reviews
    src/context/        CartContext (cart, promo, totals, localStorage), ToastContext
    src/hooks.js        hash router, shop filters
    src/pages/          Home, Shop, Product, About, Cart, Orders, Profile
    src/components/     Header, Footer, Tabs, Qty, ProductCard, ProductImage
    src/index.css       styles carried over unchanged, plus a few additions for links/buttons

## Behavior kept from the original

- Hash routes: `#home`, `#shop`, `#about`, `#cart`, `#product-<id>`
- Cart persists in localStorage (`mm-cart`); promo code `MELODY10` gives 10% off; 11% tax
- Dark theme only (matches the Figma design)
- Search (press Enter), category tree, price range and sort filters

## Changes from the original

- Images are real files in `public/images/` instead of base64 strings in the JS.
- Clickable `div`/`a` elements are now real `<a href>` links or `<button>`s, so keyboard and screen readers work.
- Header search box is a controlled input and clears when you pick a category.

## Still stubs (as in the original)

Login, checkout and the workshop-booking button only show a toast. Wire them to a real backend or payment provider next.

## Account screens (from the final design)

- `#orders`, `#profile` routes; Preferences menu on the gear (notification switches, help, log out)
- `src/context/AccountContext.jsx`: profile, saved addresses, orders and preferences (localStorage `mm-account`), seeded with the design's sample data
- Checkout places an order for the selected delivery address, empties the cart and opens My orders
- `src/i18n.js`: English UI strings for the nav, preferences, cart, orders and profile screens
