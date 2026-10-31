import { useState } from "react";
import ProductImage from "../components/ProductImage.jsx";
import Title from "../components/Title.jsx";
import { getProduct } from "../data/products.js";
import { useAccount } from "../context/AccountContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";
import { peso } from "../utils.js";

const GROUP = { inspected: "processing", shipped: "shipped", delivered: "delivered", cancelled: "cancelled" };
const STEP = { inspected: 2, shipped: 3, delivered: 4, cancelled: 0 };
const FILTERS = ["all", "processing", "shipped", "delivered", "cancelled"];
const STEPS = ["Placed", "Packed", "Shipped", "Delivered"];

function downloadInvoice(o) {
  const lines = [
    `Melody Mark - Invoice ${o.id}`, `Date: ${o.date}`, `Ship to: ${o.addr.name}, ${o.addr.city}`, `Payment: ${o.pay}`, "",
    ...o.items.map((i) => { const p = getProduct(i.id); return `${p.name} x${i.qty}  ${peso(p.price * i.qty)}`; }),
    "", `Total (incl. 11% tax, free shipping): ${peso(o.total)}`,
  ];
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain" }));
  a.download = `${o.id}.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export default function Orders() {
  const { orders, t, cancelOrder } = useAccount();
  const cart = useCart();
  const toast = useToast();
  const [f, setF] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  const list = orders.filter((o) =>
    (f === "all" || GROUP[o.status] === f) &&
    (o.id + " " + o.items.map((i) => getProduct(i.id).name).join(" ")).toLowerCase().includes(q.trim().toLowerCase())
  );
  const again = (o) => { o.items.forEach((i) => cart.add(i.id, 0, i.qty)); toast("Added to cart"); navigate("cart"); };
  const toggle = (id) => setOpen(open === id ? null : id);
  const actions = (o) => ({
    shipped: [["btn", t("track"), () => toast("Package tracking is a demo")], ["btn o", t("invoice"), () => downloadInvoice(o)]],
    inspected: [["btn", t("viewBtn"), () => toggle(o.id)], ["btn o", t("cancel"), () => { cancelOrder(o.id); toast(`Order ${o.id} cancelled`); }]],
    delivered: [["btn", t("buyAgain"), () => again(o)], ["btn o", t("review"), () => toast("Reviews open soon")]],
    cancelled: [["btn", t("buyAgain"), () => again(o)]],
  }[o.status]);

  return (
    <div className="wrap">
      <div className="bh"><Title text={t("myOrders")} /><button className="btn o" onClick={() => navigate("cart")}>← {t("myCart")}</button></div>
      <p className="mut">{t("ordersHint").replace("{n}", orders.length)}</p>
      <div className="bh" style={{ gap: 12, flexWrap: "wrap" }}>
        <div className="chips">
          {FILTERS.map((k) => <button key={k} className={f === k ? "on" : ""} onClick={() => setF(k)}>{t(k)}</button>)}
        </div>
        <input className="srch" placeholder={t("searchOrders")} aria-label={t("searchOrders")} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {list.map((o) => (
        <section className="od" key={o.id}>
          <div className="oh">
            <div><small>{t("order")}</small>{o.id}</div>
            <div><small>{t("placed")}</small>{o.date}</div>
            <div><small>{t("total")}</small><b className="pr">{peso(o.total)}</b></div>
            <div><small>{t("shipTo")}</small>{o.addr.name}, {o.addr.city}</div>
            <div className="rt">
              <span className={`pill s-${o.status}`}>{t(o.status)}</span>
              <button className="linkbtn ac" onClick={() => toggle(o.id)}>{t("details")}</button>
            </div>
          </div>
          <div className="ob">
            <div>
              {o.items.map((i) => {
                const p = getProduct(i.id);
                return (
                  <div className="oi" key={i.id}>
                    <ProductImage product={p} />
                    <div><small className="mut">{p.brand}</small><div>{p.name}</div></div>
                    <div style={{ textAlign: "right" }}><b className="pr">{peso(p.price * i.qty)}</b><br /><small className="mut">Qty {i.qty}</small></div>
                  </div>
                );
              })}
            </div>
            <div>
              <b>{o.note.startsWith("Refund") ? o.note : o.note}</b>
              {o.status === "cancelled" && <p className="mut"><small>Refund processed. Allow 3–5 days to appear on your statement.</small></p>}
              {o.status !== "cancelled" && (
                <>
                  <div className={"prog" + (o.status === "delivered" ? " g" : "")}>{STEPS.map((s, n) => <i key={s} className={n < STEP[o.status] ? "f" : ""} />)}</div>
                  <div className="pl">{STEPS.map((s) => <span key={s}>{s}</span>)}</div>
                </>
              )}
              {actions(o).map(([cls, label, fn]) => <button key={label} className={cls} onClick={fn}>{label}</button>)}
            </div>
          </div>
          <div className="ofoot">
            {o.status === "cancelled" ? `Refunded to ${o.pay}` : `Payment: ${o.pay} · Free shipping`}
            {open === o.id && <div>{t("shipTo")}: {o.addr.name}, {o.addr.city} · {t("total")}: {peso(o.total)} (incl. 11% tax)</div>}
          </div>
        </section>
      ))}
      {!list.length && <p className="mut">No orders match.</p>}
    </div>
  );
}
