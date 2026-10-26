import { useState } from "react";
import ProductImage from "../components/ProductImage.jsx";
import Qty from "../components/Qty.jsx";
import Tabs from "../components/Tabs.jsx";
import { GENERIC_DESCRIPTION, VARIATIONS, getProduct } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";
import { peso, stars } from "../utils.js";

// Rendered with key={id} so quantity, variation and tabs reset per product.
export default function Product({ id }) {
  const p = getProduct(id);
  const { add } = useCart();
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(0);
  const [thumb, setThumb] = useState(0);
  const [tab, setTab] = useState("d");

  const description = p.description || `${p.name}. ${GENERIC_DESCRIPTION}`;

  const addToCart = (buyNow) => {
    add(p.id, variant, qty);
    if (buyNow) navigate("cart");
    else toast("Added to cart");
  };

  return (
    <div className="wrap pd">
      <div>
        <ProductImage product={p} className="big" imgStyle={{ transform: `scale(${1 + thumb * 0.12})` }} />
        <div className="th">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`pic ${thumb === i ? "on" : ""}`} onClick={() => setThumb(i)}>
              <img src={`${import.meta.env.BASE_URL}images/${p.id}.webp`} alt={`${p.name}, view ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1>{p.name}</h1>
        <div className="st"><b>{p.rating.toFixed(1)}</b> {stars(p.rating)} <span className="mut">{p.reviews} rating</span></div>
        <div className="price">{peso(p.price)}</div>
        <small className="ok">In stock</small>

        <p>Quantity: <Qty value={qty} onChange={(d) => setQty((q) => Math.max(1, q + d))} /></p>

        <p>Variation:</p>
        <div className="vars">
          {VARIATIONS.map((v, i) => (
            <button key={v} className={variant === i ? "on" : ""} onClick={() => setVariant(i)}>{v}</button>
          ))}
        </div>

        <p>
          <button className="btn" onClick={() => addToCart(true)}>Buy Now!</button>{" "}
          <button className="btn o" onClick={() => addToCart(false)}>🛒 Add to cart</button>
        </p>

        <Tabs tabs={[["d", "Description"], ["s", "Specification"]]} active={tab} onChange={setTab} />
        <div className="box">
          {tab === "d"
            ? description.split("\n\n").map((t, i) => <p key={i}>{t}</p>)
            : (
              <table><tbody>
                <tr><td>Brand</td><td>{p.brand}</td></tr>
                <tr><td>Category</td><td>{p.category}</td></tr>
                <tr><td>Availability</td><td>In stock</td></tr>
                <tr><td>Setup</td><td>Inspected and play-tested before shipping</td></tr>
              </tbody></table>
            )}
        </div>
      </div>
    </div>
  );
}
