
// app/products/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching products from an API
    const fetchProducts = async () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        const dummyProducts = [
          {
            id: 1,
            name: "Laptop Pro 2025",
            price: 1299.99,
            category: "Electronics",
            description: "Powerful laptop with the latest processor and high-resolution display.",
            image: "/laptop.jpg"
          },
          {
            id: 2,
            name: "Smartphone Ultra",
            price: 899.99,
            category: "Electronics",
            description: "Advanced smartphone with top-tier camera and all-day battery life.",
            image: "/smartphone.jpg"
          },
          {
            id: 3,
            name: "Smart Watch",
            price: 249.99,
            category: "Electronics",
            description: "Track your fitness and stay connected with this stylish smart watch.",
            image: "/smartwatch.jpg"
          },
          {
            id: 4,
            name: "Wireless Headphones",
            price: 159.99,
            category: "Audio",
            description: "Premium sound quality with noise cancellation technology.",
            image: "/headphones.jpg"
          },
          {
            id: 5,
            name: "Bluetooth Speaker",
            price: 79.99,
            category: "Audio",
            description: "Portable speaker with rich sound and water resistance.",
            image: "/speaker.jpg"
          },
          {
            id: 6,
            name: "Coffee Maker",
            price: 129.99,
            category: "Home",
            description: "Programmable coffee maker for the perfect cup every morning.",
            image: "/coffeemaker.jpg"
          },
          {
            id: 7,
            name: "Air Purifier",
            price: 199.99,
            category: "Home",
            description: "Clean the air in your home with this efficient purifier.",
            image: "/purifier.jpg"
          },
          {
            id: 8,
            name: "Fitness Tracker",
            price: 89.99,
            category: "Fitness",
            description: "Monitor your activity levels and improve your health.",
            image: "/tracker.jpg"
          },
           // New Ceramic Products
        {
          id: 9,
          name: "Ceramic Cup",
          price: 15.99,
          category: "Ceramics",
          description: "A beautifully crafted ceramic cup for your morning coffee.",
          image: "/ceramic-cup.jpg"
        },
        {
          id: 10,
          name: "Ceramic Plate",
          price: 25.99,
          category: "Ceramics",
          description: "Elegant ceramic plate for dining and display.",
          image: "/ceramic-plate.jpg"
        },
        {
          id: 11,
          name: "Ceramic Pot",
          price: 35.99,
          category: "Ceramics",
          description: "Handmade ceramic pot for your home or garden.",
          image: "/ceramic-pot.jpg"
        }
        ];
        
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(dummyProducts.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter and sort products whenever filters, sort, or search changes
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, searchQuery]);

  const addToCart = (product: Product) => {
    // In a real application, this would likely dispatch to a state manager or call an API
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Increment quantity if product already exists
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new product to cart
      cartItems.push({
        ...product,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert(`${product.name} added to cart!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading products...</h1>
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Search</h2>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="category-all"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => setSelectedCategory('all')}
                  className="mr-2"
                />
                <label htmlFor="category-all">All Categories</label>
              </div>
              
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="radio"
                    id={`category-${category}`}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category}`}>{category}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">Sort By</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
          
          <div>
            <Link href="/cart" className="flex items-center text-blue-600 hover:underline">
              <span>View Cart</span>
            </Link>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">No products found</h2>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {/* This would be an actual image in a real app */}
                    <div className="text-4xl text-gray-400">{product.name[0]}</div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-blue-600 font-bold mb-2">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                        {product.category}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
