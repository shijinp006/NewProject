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
        position="bottom-center" // better for mobile
        reverseOrder={false}
        toastOptions={{
          duration: 2000, // slightly longer so users can read
          style: {
            maxWidth: "90vw", // responsive width
            padding: "12px 16px",
            fontSize: "14px",
            borderRadius: "10px",
            background: "#333", // dark background for visibility
            color: "#fff",
          },
          success: {
            style: {
              background: "#4caf50", // green for success
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#f44336", // red for error
              color: "#fff",
            },
          },
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
