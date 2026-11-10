import './CategoryFilter.css';

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Jewelry', value: 'jewelery' },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" }
  ];

  return (
    <div className="category-filter" id="categories">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={
            selectedCategory === category.value ? 'active' : ''
          }
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;