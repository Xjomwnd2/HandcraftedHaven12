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
  artisan: string;
  inStock: boolean;
  featured: boolean;
  materials: string[];
  dimensions: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name-asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: 500});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    // Simulate fetching products from an API
    const fetchProducts = async () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        const ceramicProducts = [
          {
            id: 1,
            name: "Rustic Stoneware Mug",
            price: 35.99,
            category: "Drinkware",
            description: "Hand-thrown stoneware mug with a natural finish and rustic glaze. Perfect for your morning coffee or tea.",
            image: "/rustic-mug.jpg",
            artisan: "Emma Chen",
            inStock: true,
            featured: true,
            materials: ["Stoneware clay", "Iron oxide glaze"],
            dimensions: "4\" H x 3.5\" Diameter"
          },
          {
            id: 2,
            name: "Minimalist Ceramic Vase",
            price: 89.50,
            category: "Vases",
            description: "Sleek minimalist vase with a matte finish. Elegant shape that complements any floral arrangement.",
            image: "/minimalist-vase.jpg",
            artisan: "David Torres",
            inStock: true,
            featured: true,
            materials: ["Porcelain", "Matte white glaze"],
            dimensions: "10\" H x 4\" W"
          },
          {
            id: 3,
            name: "Hand-painted Serving Bowl",
            price: 125.00,
            category: "Dinnerware",
            description: "Large ceramic serving bowl with hand-painted botanical designs. Food-safe and dishwasher-friendly.",
            image: "/serving-bowl.jpg",
            artisan: "Sarah Johnson",
            inStock: true,
            featured: false,
            materials: ["Earthenware", "Food-safe glazes"],
            dimensions: "4\" H x 12\" Diameter"
          },
          {
            id: 4,
            name: "Textured Ceramic Planter",
            price: 67.99,
            category: "Home Decor",
            description: "Textured ceramic planter with geometric patterns. Includes drainage hole and saucer.",
            image: "/ceramic-planter.jpg",
            artisan: "Miguel Sanchez",
            inStock: true,
            featured: false,
            materials: ["Stoneware clay", "Matte glaze"],
            dimensions: "6\" H x 7\" Diameter"
          },
          {
            id: 5,
            name: "Speckled Dinner Plates (Set of 4)",
            price: 159.00,
            category: "Dinnerware",
            description: "Set of four hand-thrown dinner plates with rustic speckled finish. Each plate is unique with slight variations.",
            image: "/dinner-plates.jpg",
            artisan: "Lisa Yamada",
            inStock: true,
            featured: true,
            materials: ["Stoneware clay", "Speckled glaze"],
            dimensions: "1\" H x 10.5\" Diameter each"
          },
          {
            id: 6,
            name: "Ceramic Wall Hanging",
            price: 215.00,
            category: "Home Decor",
            description: "Abstract ceramic wall art piece with textured surface and organic forms. Signed by the artist.",
            image: "/wall-hanging.jpg",
            artisan: "Jordan Williams",
            inStock: false,
            featured: true,
            materials: ["Porcelain", "Mixed glazes", "Leather cord"],
            dimensions: "18\" H x 12\" W x 1\" D"
          },
          {
            id: 7,
            name: "Small Trinket Dish",
            price: 28.50,
            category: "Home Decor",
            description: "Small handcrafted ceramic dish perfect for jewelry, keys, or trinkets. Features a gold rim detail.",
            image: "/trinket-dish.jpg",
            artisan: "Amara Patel",
            inStock: true,
            featured: false,
            materials: ["Porcelain", "22k gold luster"],
            dimensions: "1\" H x 4\" Diameter"
          },
          {
            id: 8,
            name: "Ceramic Oil Diffuser",
            price: 49.99,
            category: "Home Decor",
            description: "Handcrafted ceramic oil diffuser with pierced design that creates beautiful light patterns when lit.",
            image: "/oil-diffuser.jpg",
            artisan: "Thomas Lee",
            inStock: true,
            featured: false,
            materials: ["Porcelain", "Translucent glaze"],
            dimensions: "5\" H x 4\" Diameter"
          },
          {
            id: 9,
            name: "Handbuilt Teapot",
            price: 145.00,
            category: "Drinkware",
            description: "Sculptural handbuilt teapot with an ergonomic handle and smooth pouring spout. Holds approximately 24 oz.",
            image: "/teapot.jpg",
            artisan: "Rebecca Nguyen",
            inStock: true,
            featured: true,
            materials: ["Stoneware clay", "Celadon glaze"],
            dimensions: "6\" H x 9\" W x 5\" D"
          },
          {
            id: 10,
            name: "Ceramic Butter Dish",
            price: 42.50,
            category: "Dinnerware",
            description: "Practical and beautiful ceramic butter dish with lid. Keeps butter fresh and soft at room temperature.",
            image: "/butter-dish.jpg",
            artisan: "Carlos Mendez",
            inStock: true,
            featured: false,
            materials: ["Stoneware clay", "Food-safe glaze"],
            dimensions: "3\" H x 6\" L x 4\" W"
          },
          {
            id: 11,
            name: "Decorative Ceramic Tiles (Set of 4)",
            price: 78.00,
            category: "Home Decor",
            description: "Set of four handmade decorative tiles featuring traditional patterns. Can be displayed as wall art or used as coasters.",
            image: "/ceramic-tiles.jpg",
            artisan: "Isabella Romano",
            inStock: false,
            featured: false,
            materials: ["Earthenware", "Colored glazes"],
            dimensions: "4\" x 4\" each"
          },
          {
            id: 12,
            name: "Large Statement Vase",
            price: 289.00,
            category: "Vases",
            description: "Large statement vase with unique sculptural form. Each piece is one-of-a-kind and signed by the artist.",
            image: "/statement-vase.jpg",
            artisan: "Marcus King",
            inStock: true,
            featured: true,
            materials: ["Stoneware clay", "Custom mixed glazes"],
            dimensions: "18\" H x 8\" W"
          },
          {
            id: 13,
            name: "Ceramic Garlic Keeper",
            price: 39.99,
            category: "Kitchen",
            description: "Functional ceramic garlic keeper with ventilation holes to keep garlic fresh longer. Includes lid.",
            image: "/garlic-keeper.jpg",
            artisan: "Elena Fischer",
            inStock: true,
            featured: false,
            materials: ["Earthenware", "Satin glaze"],
            dimensions: "4\" H x 4\" Diameter"
          },
          {
            id: 14,
            name: "Hand-carved Ceramic Mug Set (Set of 2)",
            price: 74.50,
            category: "Drinkware",
            description: "Set of two mugs with intricate hand-carved patterns. Each mug holds 12 oz and is microwave and dishwasher safe.",
            image: "/carved-mugs.jpg",
            artisan: "Nia Jackson",
            inStock: true,
            featured: true,
            materials: ["Stoneware clay", "Matte finish"],
            dimensions: "4.5\" H x 3.5\" Diameter each"
          },
          {
            id: 15,
            name: "Ceramic Incense Holder",
            price: 32.00,
            category: "Home Decor",
            description: "Minimalist ceramic incense holder with clean lines. Catches ash and provides stable support for stick incense.",
            image: "/incense-holder.jpg",
            artisan: "Kai Zhang",
            inStock: true,
            featured: false,
            materials: ["Porcelain", "Unglazed finish"],
            dimensions: "1\" H x 8\" L x 2\" W"
          },
        ];
        
        setProducts(ceramicProducts);
        setFilteredProducts(ceramicProducts);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(ceramicProducts.map(product => product.category))];
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
    
    // Apply featured filter
    if (featuredOnly) {
      result = result.filter(product => product.featured);
    }
    
    // Apply in-stock filter
    if (inStockOnly) {
      result = result.filter(product => product.inStock);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.artisan.toLowerCase().includes(query)
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
  }, [products, selectedCategory, sortBy, searchQuery, priceRange, featuredOnly, inStockOnly]);

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
          <h1 className="text-2xl font-bold mb-4">Loading handcrafted treasures...</h1>
          <div className="animate-spin h-12 w-12 border-4 border-amber-600 rounded-full border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-amber-50 p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-serif font-bold text-amber-800 mb-2">Handcrafted Haven Ceramics</h1>
        <p className="text-amber-700">Discover our collection of handmade pottery crafted by talented artisans from around the world.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="w-full lg:w-64 space-y-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-amber-800">Filters</h2>
            
            <div className="mb-4">
              <label htmlFor="search" className="block text-gray-700 mb-2">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="mr-2 accent-amber-600"
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
                      className="mr-2 accent-amber-600"
                    />
                    <label htmlFor={`category-${category}`}>{category}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex items-center gap-2">
                <span>${priceRange.min}</span>
                <input 
                  type="range" 
                  min="0" 
                  max="300"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                  className="w-full accent-amber-600"
                />
                <span>${priceRange.max}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Product Status</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featuredOnly}
                    onChange={() => setFeaturedOnly(!featuredOnly)}
                    className="mr-2 accent-amber-600"
                  />
                  <label htmlFor="featured">Featured Items</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(!inStockOnly)}
                    className="mr-2 accent-amber-600"
                  />
                  <label htmlFor="inStock">In Stock Only</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">Our ceramics specialists are here to assist you in finding the perfect piece.</p>
            <Link 
              href="/contact" 
              className="text-amber-700 hover:text-amber-900 font-medium text-sm flex items-center"
            >
              Contact Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
            <>
              <p className="mb-4 text-gray-600">Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 bg-gray-100 relative">
                      {/* This would be an actual image in a real app */}
                      <div className="h-full w-full flex items-center justify-center text-3xl text-gray-400">
                        {product.name[0]}
                      </div>
                      
                      {product.featured && (
                        <div className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                      
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <span className="text-amber-700 font-bold">${product.price.toFixed(2)}</span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">by {product.artisan}</p>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="inline-block bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded">
                          {product.category}
                        </span>
                        
                        <div className="space-x-2">
                          <Link 
                            href={`/products/${product.id}`} 
                            className="text-amber-700 hover:text-amber-900 text-sm"
                          >
                            Details
                          </Link>
                          
                          <button
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                            className={`${
                              product.inStock 
                                ? "bg-amber-600 hover:bg-amber-700" 
                                : "bg-gray-300 cursor-not-allowed"
                            } text-white text-sm py-1 px-3 rounded transition-colors`}
                          >
                            {product.inStock ? "Add to Cart" : "Sold Out"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}