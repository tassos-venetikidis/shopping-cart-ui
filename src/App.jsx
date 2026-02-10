import { useState, useEffect } from "react";
import ProductList from "./components/ProductList.jsx";

function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("http://localhost:8000/products");
        if (!res.ok) throw new Error("Failed to fetch products...");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Product Catalogue</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">❌ {error}</div>}
      {!loading && !error && <ProductList products={products} />}
    </div>
  );
}

export default App;
