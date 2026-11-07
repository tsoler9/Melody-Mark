import { peso } from "../utils.js";
import ProductImage from "./ProductImage.jsx";
import Icon from "./Icon.jsx";

export default function ProductCard({ product: p }) {
  return (
    <a className="card" href={`#product-${p.id}`}>
      <ProductImage product={p} />
      <h4>{p.name}</h4>
      <b className="pr">{peso(p.price)}</b>
      <small className="ok">In Stock</small>
      <div className="st">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" className={i < p.rating ? "filled" : "empty"} />)}</div>
    </a>
  );
}
