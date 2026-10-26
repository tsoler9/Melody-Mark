import { useMemo } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { GROUPS, PRODUCTS } from "../data/products.js";

const SORTS = [["pop", "Popularity"], ["new", "New"], ["lo", "Price: Low to High"], ["hi", "Price: High to Low"]];
const COMPARE = {
  lo: (a, b) => a.price - b.price,
  hi: (a, b) => b.price - a.price,
  new: (a, b) => b.id - a.id,
  pop: (a, b) => b.reviews - a.reviews,
};

export default function Shop({ shop }) {
  const { group, category, query, min, max, sort, open } = shop;

  const list = useMemo(() => {
    const q = query.toLowerCase();
    let l = q
      ? PRODUCTS.filter((p) => (p.name + p.brand + p.category).toLowerCase().includes(q))
      : PRODUCTS.filter((p) => p.group === group && (!category || p.category === category));
    if (min !== "") l = l.filter((p) => p.price >= +min);
    if (max !== "") l = l.filter((p) => p.price <= +max);
    return [...l].sort(COMPARE[sort]);
  }, [group, category, query, min, max, sort]);

  const heading =
    list.length + (list.length === 1 ? " product" : " products") +
    (query ? ` for “${query}”` : ` in ${GROUPS[group].name}${category ? " › " + category : ""}`);

  return (
    <div className="wrap shop">
      <aside>
        <div className="box">
          <h5>Category</h5>
          {GROUPS.map((g, i) => (
            <div key={g.name}>
              <button className="gh" onClick={() => shop.toggleGroup(i)}>{open.includes(i) ? "▾" : "▸"} {g.name}</button>
              {open.includes(i) && g.categories.map((c) => (
                <button key={c} className={`sub ${group === i && category === c ? "on" : ""}`} onClick={() => shop.pickCategory(i, c)}>{c}</button>
              ))}
            </div>
          ))}
        </div>

        <div className="box">
          <h5>Filter 🔍</h5>
          <small>Price Range</small>
          <p>
            <input type="number" min="0" placeholder="3,000" aria-label="Minimum price" value={min} onChange={(e) => shop.setMin(e.target.value)} />
            {" — "}
            <input type="number" min="0" placeholder="10,000" aria-label="Maximum price" value={max} onChange={(e) => shop.setMax(e.target.value)} />
          </p>
          <small>Sort by:</small>
          {SORTS.map(([k, label]) => (
            <label key={k}>
              <input type="radio" name="sort" checked={sort === k} onChange={() => shop.setSort(k)} /> {label}
            </label>
          ))}
          <p><button className="btn" onClick={shop.reset}>Reset Filters</button></p>
        </div>
      </aside>

      <div>
        <p className="mut">{heading}</p>
        <div className="grid">
          {list.length
            ? list.map((p) => <ProductCard key={p.id} product={p} />)
            : <p className="mut">No products match. Try another category or reset the filters.</p>}
        </div>
      </div>
    </div>
  );
}
