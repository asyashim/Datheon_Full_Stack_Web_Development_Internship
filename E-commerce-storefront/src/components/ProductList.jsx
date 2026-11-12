import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import './ProductList.css';

function ProductList({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // New states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          'https://fakestoreapi.com/products'
        );

        // Check whether the API request was successful
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="product-list" id="products">

        {/* Loading State */}
        {loading && <p className="status-message">Loading products...</p>}

        {/* Error State */}
        {!loading && error && (
          <p className="status-message error-message">{error}</p>
        )}

        {/* Empty Results */}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="status-message">No products found.</p>
        )}

        {/* Product List */}
        {!loading && !error && filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
          />
        ))}

      </div>
    </>
  );
}

export default ProductList;