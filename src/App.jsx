import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { useRoute, useShopFilters, useTheme } from "./hooks.js";

export default function App() {
  const route = useRoute();
  const shop = useShopFilters();
  const toggleTheme = useTheme();

  useEffect(() => { scrollTo(0, 0); }, [route.name, route.id]);

  return (
    <ToastProvider>
      <CartProvider>
        <Header route={route} query={shop.query} onSearch={shop.search} onToggleTheme={toggleTheme} />
        <main>
          {route.name === "home" && <Home />}
          {route.name === "shop" && <Shop shop={shop} />}
          {route.name === "product" && <Product key={route.id} id={route.id} />}
          {route.name === "about" && <About />}
          {route.name === "cart" && <Cart />}
        </main>
        <Footer />
      </CartProvider>
    </ToastProvider>
  );
}
