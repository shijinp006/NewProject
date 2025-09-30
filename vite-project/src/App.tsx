import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./home/home";
import { ProductDetails } from "./productdetails/productdetails";
import { CartList } from "./cart/cartlist";
import { FavoriteList } from "./favoriteList/favoriteList";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000, // 2000ms = 2 seconds
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/cartlist" element={<CartList />} />
          <Route path="/favoriteList" element={<FavoriteList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
