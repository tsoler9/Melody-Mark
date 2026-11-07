import { useEffect, useRef, useState } from "react";
import Prefs from "./Prefs.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAccount } from "../context/AccountContext.jsx";
import { navigate } from "../hooks.js";
import Icon from "./Icon.jsx";
import { PRODUCTS } from "../data/products.js";
import { imgSrc, peso } from "../utils.js";

const LINKS = ["home", "shop", "about"];

export default function Header({ route, query, onSearch }) {
  const { count } = useCart();
  const { t } = useAccount();
  const [draft, setDraft] = useState(query);
  const [open, setOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const box = useRef(null);
  const searchBox = useRef(null);

  useEffect(() => setDraft(query), [query]);
  useEffect(() => setOpen(false), [route.name]);
  useEffect(() => {
    setSuggestionsOpen(false);
    setActiveSuggestion(-1);
  }, [route.name, route.id]);
  useEffect(() => {
    if (!suggestionsOpen) return;
    const closeOnOutsideClick = (event) => {
      if (!searchBox.current?.contains(event.target)) setSuggestionsOpen(false);
    };
    addEventListener("mousedown", closeOnOutsideClick);
    return () => removeEventListener("mousedown", closeOnOutsideClick);
  }, [suggestionsOpen]);
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === "Escape" || (e.type === "mousedown" && !box.current?.contains(e.target))) setOpen(false); };
    addEventListener("mousedown", h);
    addEventListener("keydown", h);
    return () => { removeEventListener("mousedown", h); removeEventListener("keydown", h); };
  }, [open]);

  const normalizedQuery = draft.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const categoryMatches = normalizedQuery.length >= 2
    ? PRODUCTS.filter((product) => product.category.toLowerCase().startsWith(normalizedQuery))
    : [];
  const matches = normalizedQuery.length >= 2
    ? (categoryMatches.length
      ? categoryMatches
      : PRODUCTS.filter((product) =>
        `${product.name} ${product.brand} ${product.category}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, " ")
          .includes(normalizedQuery)))
    : [];
  const suggestions = matches.slice(0, 5);
  const showSuggestions = suggestionsOpen && normalizedQuery.length >= 2;

  const selectSuggestion = (product) => {
    setSuggestionsOpen(false);
    setActiveSuggestion(-1);
    navigate(`product-${product.id}`);
  };

  const submitSearch = () => {
    onSearch(draft.trim());
    setSuggestionsOpen(false);
    setActiveSuggestion(-1);
    navigate("shop");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" && showSuggestions && suggestions.length) {
      e.preventDefault();
      setActiveSuggestion((index) => (index + 1) % suggestions.length);
    } else if (e.key === "ArrowUp" && showSuggestions && suggestions.length) {
      e.preventDefault();
      setActiveSuggestion((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (e.key === "Escape") {
      setSuggestionsOpen(false);
      setActiveSuggestion(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (showSuggestions && activeSuggestion >= 0) selectSuggestion(suggestions[activeSuggestion]);
      else submitSearch();
    }
  };

  return (
    <header>
      <a className="logo" href="#home"><i>MM</i>Melody Mark</a>
      <nav>
        {LINKS.map((r) => (
          <a key={r} href={`#${r}`} className={route.name === r || (route.name === "product" && r === "shop") ? "on" : ""}>{t(r)}</a>
        ))}
      </nav>
      <div className="search-wrap" ref={searchBox}>
        <div className="sr">
          <Icon name="search" />
          <input
            placeholder={t("search")}
            aria-label={t("search")}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded={showSuggestions}
            aria-controls={suggestions.length ? "search-suggestions" : undefined}
            aria-activedescendant={activeSuggestion >= 0 ? `search-result-${suggestions[activeSuggestion].id}` : undefined}
            value={draft}
            onFocus={() => setSuggestionsOpen(true)}
            onChange={(e) => { setDraft(e.target.value); setActiveSuggestion(-1); setSuggestionsOpen(true); }}
            onKeyDown={onKeyDown}
          />
        </div>
        {showSuggestions && (
          <div className="search-suggestions">
            {suggestions.length ? (
              <>
                {categoryMatches.length > 0 && <div className="suggestion-heading">{categoryMatches[0].category} instruments</div>}
                <div id="search-suggestions" role="listbox" aria-label="Instrument suggestions">
                  {suggestions.map((product, index) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={activeSuggestion === index}
                      id={`search-result-${product.id}`}
                      className={`search-result${activeSuggestion === index ? " active" : ""}`}
                      key={product.id}
                      onMouseEnter={() => setActiveSuggestion(index)}
                      onClick={() => selectSuggestion(product)}
                    >
                      <img src={imgSrc(product.id)} alt="" />
                      <span className="search-result-copy">
                        <b>{product.name}</b>
                        <small>{product.brand} · {product.category}</small>
                      </span>
                      <strong>{peso(product.price)}</strong>
                    </button>
                  ))}
                </div>
                {matches.length > suggestions.length && (
                  <button type="button" className="search-all" onClick={submitSearch}>
                    See all {matches.length} matches
                  </button>
                )}
              </>
            ) : (
              <p className="search-empty" role="status">No instruments found for “{draft.trim()}”</p>
            )}
          </div>
        )}
      </div>
      <button className={"ic" + (route.name === "cart" ? " on" : "")} aria-label={t("myCart")} onClick={() => navigate("cart")}><Icon name="cart" /><em>{count}</em></button>
      <button className={"ic" + (route.name === "profile" || route.name === "orders" ? " on" : "")} aria-label={t("myProfile")} onClick={() => navigate("profile")}><Icon name="user" /></button>
      <div className="pw" ref={box}>
        <button className={"ic" + (open ? " on" : "")} aria-label={t("prefs")} aria-expanded={open} onClick={() => setOpen((o) => !o)}><Icon name="settings" /></button>
        {open && <Prefs close={() => setOpen(false)} />}
      </div>
    </header>
  );
}
