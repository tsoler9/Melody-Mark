import { useState } from "react";
import Title from "../components/Title.jsx";
import ProductImage from "../components/ProductImage.jsx";
import Qty from "../components/Qty.jsx";
import { VARIATIONS, getProduct } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useAccount } from "../context/AccountContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";
import { peso } from "../utils.js";

export default function Cart() {
  const cart = useCart();
  const toast = useToast();
  const acc = useAccount();
  const { t } = acc;
  const [code, setCode] = useState(cart.promoApplied ? cart.promoCode : "");

  if (!cart.count) {
    return (
      <div className="wrap">
        <Title text={t("myCart")} />
        <p className="mut">Your cart is empty. Add an instrument to get started.</p>
        <button className="btn" onClick={() => navigate("shop")}>Continue shopping</button>
      </div>
    );
  }

  const applyPromo = () => {
    const ok = cart.applyPromo(code);
    toast(ok ? `${cart.promoCode} applied: 10% off` : "That promo code isn’t valid");
  };

  const addr = acc.addresses.find((a) => a.id === acc.sel);
  const checkout = () => {
    if (!addr) { toast("Add a delivery address first"); navigate("profile"); return; }
    const id = acc.placeOrder(cart.items.map(({ id, qty }) => ({ id, qty })), addr, cart.total);
    cart.clear();
    toast(`Order ${id} placed`);
    navigate("orders");
  };

  return (
    <div className="wrap">
      <Title text={t("myCart")} />
      <p className="mut" style={{ textAlign: "right" }}>{cart.count} {cart.count > 1 ? t("itemsReady") : t("itemReady")}</p>

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

        <div>
        <div className="box">
          <div className="bh"><h3 className="ac">{t("delivery")}</h3><small className="mut">{t("choose")}</small></div>
          {acc.addresses.map((a) => (
            <label key={a.id} className={"ad" + (acc.sel === a.id ? " on" : "")}>
              <input type="radio" name="addr" checked={acc.sel === a.id} onChange={() => acc.setSel(a.id)} />
              <span><b>{a.name}</b>{a.def ? <em className="badge">{t("def")}</em> : ` · ${a.label}`}<br /><small>{a.street}<br />{a.city}<br />{a.phone}</small></span>
              <button type="button" className="linkbtn ac" onClick={(e) => { e.preventDefault(); navigate("profile"); }}>{t("edit")}</button>
            </label>
          ))}
          <button className="add" onClick={() => navigate("profile")}>{t("addAddr")}</button>
        </div>
        <div className="box sum">
          <h3 className="ac">{t("summary")}</h3>
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
          <button className="btn" style={{ width: "100%" }} onClick={checkout}>🔒 {t("checkout")}</button>
          <p className="mut"><small>✔ Free setup and 30-day returns<br />🚚 Insured shipping, packed by our workshop</small></p>
          {addr && <p className="mut"><small>{t("deliveringTo")} <b>{addr.name}</b></small></p>}
        </div>
        </div>
      </div>
    </div>
  );
}
