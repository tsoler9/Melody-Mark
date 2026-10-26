import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { navigate } from "../hooks.js";

const LINKS = [["home", "Home"], ["shop", "Shop"], ["about", "About Us"]];

export default function Header({ route, query, onSearch, onToggleTheme }) {
  const { count } = useCart();
  const toast = useToast();
  const [draft, setDraft] = useState(query);

  // Keep the box in sync when filters clear the search elsewhere.
  useEffect(() => setDraft(query), [query]);

  const onKeyDown = (e) => {
    if (e.key !== "Enter") return;
    onSearch(draft.trim());
    navigate("shop");
  };

  return (
    <header>
      <a className="logo" href="#home"><i>MM</i>Melody Mark</a>
      <nav>
        {LINKS.map(([r, label]) => (
          <a key={r} href={`#${r}`} className={route.name === r || (route.name === "product" && r === "shop") ? "on" : ""}>
            {label}
          </a>
        ))}
      </nav>
      <div className="sr">
        🔍
        <input
          placeholder="Search"
          aria-label="Search instruments"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
      <button className="ic" aria-label="Cart" onClick={() => navigate("cart")}>🛒<em>{count}</em></button>
      <button className="ic" aria-label="Account" onClick={() => toast("Login is not connected yet")}>👤</button>
      <button className="ic" aria-label="Toggle light or dark theme" onClick={onToggleTheme}>⚙</button>
    </header>
  );
}
