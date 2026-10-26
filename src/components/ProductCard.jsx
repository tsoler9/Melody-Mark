import { peso, stars } from "../utils.js";
import ProductImage from "./ProductImage.jsx";

export default function ProductCard({ product: p }) {
  return (
    <a className="card" href={`#product-${p.id}`}>
      <ProductImage product={p} />
      <h4>{p.name}</h4>
      <b className="pr">{peso(p.price)}</b>
      <small className="ok">In Stock</small>
      <div className="st">{stars(p.rating)}</div>
    </a>
  );
}
