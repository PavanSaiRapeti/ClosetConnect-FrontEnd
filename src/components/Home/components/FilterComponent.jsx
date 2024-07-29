import React from 'react';

const FilterComponent = ({ filters, handleFilterChange }) => {
  const { type, category, size, priceRange, shipping, condition, availability, description, clothingItemSize, name, gender, status } = filters;

  const handleFilterSelection = (e) => {
    const { name, value } = e.target;
    handleFilterChange(name, value);
  };

  return (
    <div className="filter-section">
      <h3 className="text-lg font-semibold mb-2">Filter</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <input id="description" name="description" className="border rounded-lg p-2 w-full" value={description} onChange={handleFilterSelection} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
          <select id="type" name="type" className="border rounded-lg p-2 w-full" value={type} onChange={handleFilterSelection}>
            <option value="TOPS">Tops</option>
            <option value="BOTTOMS">Bottoms</option>
            <option value="ACCESSORIES">Accessories</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="clothingItemSize">Clothing Item Size</label>
          <input id="clothingItemSize" name="clothingItemSize" className="border rounded-lg p-2 w-full" value={clothingItemSize} onChange={handleFilterSelection} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input id="name" name="name" className="border rounded-lg p-2 w-full" value={name} onChange={handleFilterSelection} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
          <input id="gender" name="gender" className="border rounded-lg p-2 w-full" value={gender} onChange={handleFilterSelection} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">Status</label>
          <input id="status" name="status" className="border rounded-lg p-2 w-full" value={status} onChange={handleFilterSelection} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
          <select id="category" name="category" className="border rounded-lg p-2 w-full" value={category} onChange={handleFilterSelection}>
            <option value="All Categories">All Categories</option>
            <option value="Tops">Tops</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="size">Size</label>
          <select id="size" name="size" className="border rounded-lg p-2 w-full" value={size} onChange={handleFilterSelection}>
            <option value="All Sizes">All Sizes</option>
            <option value="My Size">My Size</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="priceRange">Price</label>
          <select id="priceRange" name="priceRange" className="border rounded-lg p-2 w-full" value={priceRange} onChange={handleFilterSelection}>
            <option value="All Prices">All Prices</option>
            <option value="Under C$25">Under C$25</option>
            <option value="C$25 - C$50">C$25 - C$50</option>
            <option value="C$50 - C$100">C$50 - C$100</option>
            <option value="C$100 - C$250">C$100 - C$250</option>
            <option value="C$250 - C$500">C$250 - C$500</option>
            <option value="Over C$500">Over C$500</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="shipping">Shipping</label>
          <select id="shipping" name="shipping" className="border rounded-lg p-2 w-full" value={shipping} onChange={handleFilterSelection}>
            <option value="All Items">All Items</option>
            <option value="Free">Free</option>
            <option value="Discounted + Free">Discounted + Free</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="condition">Condition</label>
          <select id="condition" name="condition" className="border rounded-lg p-2 w-full" value={condition} onChange={handleFilterSelection}>
            <option value="All Conditions">All Conditions</option>
            <option value="New With Tags">New With Tags</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="availability">Availability</label>
          <select id="availability" name="availability" className="border rounded-lg p-2 w-full" value={availability} onChange={handleFilterSelection}>
            <option value="All Items">All Items</option>
            <option value="Available Items">Available Items</option>
            <option value="Available + Dropping Soon Items">Available + Dropping Soon Items</option>
            <option value="Dropping Soon Items">Dropping Soon Items</option>
            <option value="Sold Items">Sold Items</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;