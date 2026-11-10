import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import './ProductList.css';

function ProductList({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products'
        );

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
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
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} 
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