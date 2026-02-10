import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext.jsx";
import ProductCard from "./ProductCard.jsx";

function ProductList() {
  const { products, loading, error } = useContext(ProductContext);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <div className="error">❌ {error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
