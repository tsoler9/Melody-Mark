import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AccountProvider } from "./context/AccountContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { useRoute, useShopFilters } from "./hooks.js";

export default function App() {
  const route = useRoute();
  const shop = useShopFilters();

  useEffect(() => { scrollTo(0, 0); }, [route.name, route.id]);

  return (
    <ToastProvider>
      <AccountProvider>
        <CartProvider>
          <Header route={route} query={shop.query} onSearch={shop.search} />
          <main>
            {route.name === "home" && <Home />}
            {route.name === "shop" && <Shop shop={shop} />}
            {route.name === "product" && <Product key={route.id} id={route.id} />}
            {route.name === "about" && <About />}
            {route.name === "cart" && <Cart />}
            {route.name === "orders" && <Orders />}
            {route.name === "profile" && <Profile />}
          </main>
          <Footer />
        </CartProvider>
      </AccountProvider>
    </ToastProvider>
  );
}
