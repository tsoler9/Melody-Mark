import { useState } from "react";
import ProductImage from "../components/ProductImage.jsx";
import Qty from "../components/Qty.jsx";
import { VARIATIONS, getProduct } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";
import { peso } from "../utils.js";

export default function Cart() {
  const cart = useCart();
  const toast = useToast();
  const [code, setCode] = useState(cart.promoApplied ? cart.promoCode : "");

  if (!cart.count) {
    return (
      <div className="wrap">
        <h1>Your <span className="ac">cart</span></h1>
        <p className="mut">Your cart is empty. Add an instrument to get started.</p>
        <button className="btn" onClick={() => navigate("shop")}>Continue shopping</button>
      </div>
    );
  }

  const applyPromo = () => {
    const ok = cart.applyPromo(code);
    toast(ok ? `${cart.promoCode} applied: 10% off` : "That promo code isn’t valid");
  };

  return (
    <div className="wrap">
      <h1>Your <span className="ac">cart</span></h1>
      <p className="mut" style={{ textAlign: "right" }}>{cart.count} item{cart.count > 1 ? "s" : ""} ready to check out</p>

      <div className="cart">
        <div className="box" style={{ padding: 0 }}>
          {cart.items.map((x) => {
            const p = getProduct(x.id);
            return (
              <div className="line" key={x.key}>
                <ProductImage product={p} />
                <div>
                  <small className="mut">{p.brand} · {p.category}</small>
                  <div>{p.name}</div>
                  <small className="mut">{peso(p.price)} each{x.variant ? " · " + VARIATIONS[x.variant] : ""}</small>
                  <div><Qty value={x.qty} onChange={(d) => cart.changeQty(x.key, d)} /></div>
                </div>
                <b className="pr">{peso(p.price * x.qty)}</b>
                <button className="x" aria-label="Remove" onClick={() => cart.remove(x.key)}>🗑</button>
              </div>
            );
          })}
          <p style={{ display: "flex", justifyContent: "space-between", padding: 12 }}>
            <button className="linkbtn" onClick={() => navigate("shop")}>← Continue Shopping</button>
            <button className="linkbtn" onClick={cart.clear}>Clear cart</button>
          </p>
        </div>

        <div className="box sum">
          <h3 className="ac">Order summary</h3>
          <small className="mut">Promo code</small>
          <input placeholder="Try MELODY10" aria-label="Promo code" value={code} onChange={(e) => setCode(e.target.value)} />
          <button className="btn o" onClick={applyPromo}>Apply</button>
          <hr style={{ borderColor: "var(--line)" }} />
          <p><span className="mut">Subtotal</span><span>{peso(cart.subtotal)}</span></p>
          {cart.discount > 0 && <p><span className="mut">Promo (10%)</span><span>−{peso(cart.discount)}</span></p>}
          <p><span className="mut">Shipping</span><span>Free</span></p>
          <p><span className="mut">Tax (11%)</span><span>{peso(cart.tax)}</span></p>
          <hr style={{ borderColor: "var(--line)" }} />
          <p><b>Total</b><b className="pr" style={{ fontSize: "1.3rem" }}>{peso(cart.total)}</b></p>
          <button className="btn" style={{ width: "100%" }} onClick={() => toast("Checkout is a demo: connect a payment gateway")}>🔒 Checkout securely</button>
          <p className="mut"><small>✔ Free setup and 30-day returns<br />🚚 Insured shipping, packed by our workshop</small></p>
        </div>
      </div>
    </div>
  );
}
