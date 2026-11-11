import { useState } from "react";
import Tabs from "../components/Tabs.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductImage from "../components/ProductImage.jsx";
import { PRODUCTS, REVIEWS, getProduct } from "../data/products.js";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";
import Icon from "../components/Icon.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";

const BEST_TABS = [["Guitar", "Guitar"], ["Piano", "Piano"], ["Drums", "Drums"], ["Violin", "Violin"]];
const SPECIAL_TABS = [["pop", "Popular"], ["hot", "Hot Deals"], ["new", "New Arrival"], ["feat", "Featured"]];

export default function Home() {
  const toast = useToast();
  const [best, setBest] = useState("Guitar");
  const [special, setSpecial] = useState("pop");

  const bestSellers = PRODUCTS.filter((p) => p.bestSeller && p.category === best);
  const specials = PRODUCTS.filter((p) => p.tags.includes(special));

  return (
    <>
      <ScrollReveal as="section" className="hero">
        <div>
          <h1>Welcome to <b>Melody Mark</b> your reliable instrument shop</h1>
          <p>
            <b className="ac">Built to last. Made to perform.</b> Instruments you can rely on every time you play,
            designed to keep up with your musical journey every step of the way.
          </p>
          <button className="btn" onClick={() => navigate("shop")}>Browse the shop</button>
        </div>
        <div className="mos">
          {[1, 6, 5, 7].map((id) => <ProductImage key={id} product={getProduct(id)} />)}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" className="sec font-sans"><div className="wrap">
        <h2>BEST SELLER</h2>
        <Tabs tabs={BEST_TABS} active={best} onChange={setBest} />
        <div className="grid">{bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </div></ScrollReveal>

      <ScrollReveal as="section" className="sec font-sans"><div className="wrap">
        <h2>SPECIALS</h2>
        <Tabs tabs={SPECIAL_TABS} active={special} onChange={setSpecial} />
        <div className="grid">{specials.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </div></ScrollReveal>

      <ScrollReveal as="section" className="sec font-sans"><div className="wrap">
        <h2 style={{ textAlign: "center" }}>WHAT OUR CUSTOMER SAY:</h2>
        <div className="rv">
          {REVIEWS.map(([name, text]) => (
            <div key={name}><b><Icon name="user" size={18} /> {name}</b><div className="st">{[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" className="filled" />)}</div>“{text}”</div>
          ))}
        </div>
        <div className="cta">
          <span>What are you waiting for?</span>
          <button className="btn" onClick={() => navigate("shop")}>Get Started!</button>
          <button className="btn o" onClick={() => toast("Login is not connected yet")}>Login</button>
        </div>
      </div></ScrollReveal>
    </>
  );
}
