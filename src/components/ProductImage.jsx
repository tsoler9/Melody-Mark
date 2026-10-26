import { imgSrc } from "../utils.js";

export default function ProductImage({ product, className = "", imgStyle }) {
  return (
    <div className={`pic ${className}`.trim()}>
      <img src={imgSrc(product.id)} alt={product.name} loading="lazy" style={imgStyle} />
    </div>
  );
}
