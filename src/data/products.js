// Catalog data. Images live in /public/images/<id>.webp
export const GROUPS = [
  { name: "Instrument", categories: ["Guitar", "Piano", "Violin", "Drums", "Flute"] },
  { name: "Accessories", categories: [] },
  { name: "Equipment", categories: [] },
  { name: "Bundles & Starter Packs", categories: [] },
  { name: "Learning materials", categories: [] },
];

export const VARIATIONS = ["Standard", "With gig bag", "With strap & picks", "Full starter kit"];

export const GENERIC_DESCRIPTION =
  "A reliable instrument, inspected, set up and play-tested in our workshop before it ships.";

// group = index into GROUPS. tags: hot | new | feat | pop
export const PRODUCTS = [
  { id: 1, name: "Yamaha CPX600 BL Acoustic-Electric Guitar, Black", brand: "Yamaha", group: 0, category: "Guitar", price: 32596, hue: 230, tags: ["hot"], rating: 5, reviews: 128, bestSeller: true },
  {
    id: 2, name: "Vintage REVO ELEKTRA ~ Sunburst Silk", brand: "Revo", group: 0, category: "Guitar", price: 13107.18, hue: 28, tags: ["new"], rating: 5, reviews: 44, bestSeller: true,
    description:
      "The Vintage REVO ELEKTRA is the perfect acoustic guitar for players of all levels. Featuring a solid spruce top and mahogany back and sides, this guitar delivers a rich, full-bodied tone that sounds great whether you’re strumming chords or fingerpicking melodies.\n\nThe comfortable dreadnought body shape projects your sound clearly, making it ideal for both practice sessions and live performances. The rosewood fingerboard provides smooth playability, while the die-cast tuning machines keep your guitar in tune longer.\n\nIncludes a padded gig bag for easy transport and protection.",
  },
  { id: 3, name: "Yamaha Dreadnought Acoustic Guitar, Natural", brand: "Yamaha", group: 0, category: "Guitar", price: 32596, hue: 42, tags: ["feat"], rating: 5, reviews: 76, bestSeller: true },
  { id: 4, name: "Heritage Ascent Collection H-137 P90 Electric Guitar, Black", brand: "Heritage", group: 0, category: "Guitar", price: 15264.03, hue: 260, tags: ["new", "hot"], rating: 5, reviews: 52, bestSeller: true },
  { id: 5, name: "Casio AP-270 BN Celviano Piano (88 Keys)", brand: "Casio", group: 0, category: "Piano", price: 46872.15, hue: 20, tags: ["pop", "feat"], rating: 5, reviews: 91, bestSeller: true },
  { id: 6, name: "Clifton Strassus - Violin with Gigbag and Rosin", brand: "Clifton", group: 0, category: "Violin", price: 1950, hue: 15, tags: ["pop", "hot"], rating: 5, reviews: 37, bestSeller: true },
  { id: 7, name: "NUX DM-7X All Remo Mesh Head Digital Drum Kit", brand: "NUX", group: 0, category: "Drums", price: 41999, hue: 200, tags: ["pop", "new"], rating: 5, reviews: 64, bestSeller: true },
  { id: 8, name: "Chromatic LCD Digital Clip On Guitar Tuner", brand: "Generic", group: 1, category: "Accessories", price: 1480.97, hue: 140, tags: ["pop", "hot"], rating: 5, reviews: 210 },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

export const REVIEWS = [
  ["Maria Reyes", "I love that Melody Mark has their own brand and partners with trusted sellers. I know everything they sell is quality tested. No worries at all!"],
  ["Juan Dela Cruz", "Whether it’s their own brand or partner sellers, every instrument is top quality. You can really trust what they sell. No cheap imitations here!"],
  ["Carlo Santos", "Melody Mark doesn’t just accept anyone. They carefully choose which sellers they partner with and they have their own reliable brand. Best of both worlds!"],
  ["Anna Reyes", "I keep coming back to Melody Mark because their own brand is reliable and they only partner with trusted sellers. Always satisfied!"],
];
