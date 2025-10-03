import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./home/home";
import { ProductDetails } from "./productdetails/productdetails";
import { CartList } from "./cart/cartlist";
import { FavoriteList } from "./favoriteList/favoriteList";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "./loadingContext/loadingContext";
import { GlobalSpinner } from "./globalSpinner/globalSpinner";

function App() {
  return (
    <LoadingProvider>
      {/* Global Spinner */}
      <GlobalSpinner />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            maxWidth: "90vw",
            padding: "12px 16px",
            fontSize: "14px",
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          success: {
            style: { background: "#4caf50", color: "#fff" },
          },
          error: {
            style: { background: "#f44336", color: "#fff" },
          },
        }}
      />

      {/* App Routes */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/cartlist" element={<CartList />} />
          <Route path="/favoriteList" element={<FavoriteList />} />
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
