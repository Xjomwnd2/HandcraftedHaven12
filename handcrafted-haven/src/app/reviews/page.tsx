// app/reviews/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Review = {
  id: number;
  productId: number;
  productName: string;
  userId: number;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpfulVotes: number;
  verified: boolean;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<{id: number, name: string}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [currentReview, setCurrentReview] = useState<{
    productId: string;
    rating: number;
    title: string;
    content: string;
  }>({
    productId: '',
    rating: 5,
    title: '',
    content: '',
  });

  useEffect(() => {
    // Simulate fetching reviews from an API
    const fetchReviews = async () => {
      // In a real application, this would be an API call
      setTimeout(() => {
        const dummyProducts = [
          { id: 1, name: "Laptop Pro 2025" },
          { id: 2, name: "Smartphone Ultra" },
          { id: 3, name: "Smart Watch" },
          { id: 4, name: "Wireless Headphones" },
          { id: 5, name: "Bluetooth Speaker" },
        ];
        
        const dummyReviews = [
          {
            id: 1,
            productId: 1,
            productName: "Laptop Pro 2025",
            userId: 101,
            userName: "Alex Johnson",
            rating: 5,
            title: "Best laptop I've ever owned",
            content: "This laptop exceeds all expectations. The performance is outstanding, and the battery life lasts all day. The display is crystal clear and the keyboard is comfortable to type on for long periods. Highly recommend for both work and personal use!",
            date: "2025-03-20",
            helpfulVotes: 24,
            verified: true
          },
          {
            id: 2,
            productId: 1,
            productName: "Laptop Pro 2025",
            userId: 102,
            userName: "Sam Wilson",
            rating: 4,
            title: "Great performance, slightly heavy",
            content: "This laptop has amazing speed and handles all my programming tasks with ease. My only complaint is that it's a bit heavier than I expected, which makes it less convenient for travel. Still, the performance makes up for it.",
            date: "2025-03-15",
            helpfulVotes: 18,
            verified: true
          },
          {
            id: 3,
            productId: 2,
            productName: "Smartphone Ultra",
            userId: 103,
            userName: "Jamie Lee",
            rating: 5,
            title: "Amazing camera and battery life",
            content: "I'm really impressed with this phone. The camera quality is incredible, especially in low light conditions. The battery easily lasts all day even with heavy use. The screen is vibrant and the phone feels premium in hand.",
            date: "2025-03-18",
            helpfulVotes: 32,
            verified: true
          },
          {
            id: 4,
            productId: 2,
            productName: "Smartphone Ultra",
            userId: 104,
            userName: "Taylor Smith",
            rating: 3,
            title: "Good phone but overpriced",
            content: "The phone works well and has good features, but I don't think it's worth the high price tag. There are competitors offering similar specs for less. The camera is excellent though, and the build quality is top-notch.",
            date: "2025-03-12",
            helpfulVotes: 15,
            verified: true
          },
          {
            id: 5,
            productId: 3,
            productName: "Smart Watch",
            userId: 105,
            userName: "Jordan Rivers",
            rating: 5,
            title: "Perfect fitness companion",
            content: "This smart watch has transformed my fitness routine. The tracking features are accurate, and the battery lasts for days. The interface is intuitive, and it pairs seamlessly with my phone. The sleep tracking feature has been particularly insightful.",
            date: "2025-03-17",
            helpfulVotes: 27,
            verified: true
          },
          {
            id: 6,
            productId: 4,
            productName: "Wireless Headphones",
            userId: 106,
            userName: "Casey Morgan",
            rating: 4,
            title: "Great sound quality, comfortable fit",
            content: "These headphones deliver excellent sound quality across all ranges. The noise cancellation is impressive and effectively blocks out ambient noise. They're comfortable to wear for extended periods, though they can get a bit warm after several hours. Battery life is solid at around 25 hours.",
            date: "2025-03-14",
            helpfulVotes: 19,
            verified: true
          },
          {
            id: 7,
            productId: 4,
            productName: "Wireless Headphones",
            userId: 107,
            userName: "Riley Thompson",
            rating: 2,
            title: "Connectivity issues",
            content: "While the sound quality is good, I've had persistent connectivity issues with these headphones. They frequently disconnect from my device, which is frustrating during calls or while watching videos. The comfort and battery life are good, but the connection problems are a deal-breaker for me.",
            date: "2025-03-10",
            helpfulVotes: 8,
            verified: true
          },
          {
            id: 8,
            productId: 5,
            productName: "Bluetooth Speaker",
            userId: 108,
            userName: "Morgan Lee",
            rating: 5,
            title: "Impressive sound for the size",
            content: "This speaker packs a punch! The sound quality is excellent with deep bass and clear highs. It's surprisingly loud for its compact size. The waterproof feature works well, and I've used it at the beach without issues. Battery life is great at about 12 hours of playback.",
            date: "2025-03-19",
            helpfulVotes: 21,
            verified: true
          }
        ];
        
        setProducts(dummyProducts);
        setReviews(dummyReviews);
        setFilteredReviews(dummyReviews);
        setIsLoading(false);
      }, 1000);
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    // Filter and sort reviews whenever filters or sort options change
    let result = [...reviews];
    
    // Apply product filter
    if (selectedProduct !== 'all') {
      const productId = parseInt(selectedProduct);
      result = result.filter(review => review.productId === productId);
    }
    
    // Apply rating filter
    if (ratingFilter !== 'all') {
      const rating = parseInt(ratingFilter);
      result = result.filter(review => review.rating === rating);
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating-asc':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'helpful-desc':
        result.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        break;
      default:
        break;
    }
    
    setFilteredReviews(result);
  }, [reviews, selectedProduct, sortBy, ratingFilter]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentReview.productId || !currentReview.title || !currentReview.content) {
      alert('Please fill in all fields');
      return;
    }
    
    // In a real application, this would be an API call to submit the review
    const newReview: Review = {
      id: reviews.length + 1,
      productId: parseInt(currentReview.productId),
      productName: products.find(p => p.id === parseInt(currentReview.productId))?.name || '',
      userId: 999, // This would come from auth context in a real app
      userName: 'Current User', // This would come from auth context in a real app
      rating: currentReview.rating,
      title: currentReview.title,
      content: currentReview.content,
      date: new Date().toISOString().split('T')[0],
      helpfulVotes: 0,
      verified: true
    };
    
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews);
    
    // Reset form
    setCurrentReview({
      productId: '',
      rating: 5,
      title: '',
      content: '',
    });
    
    setShowReviewForm(false);
    alert('Review submitted successfully!');
  };

  const markHelpful = (reviewId: number) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId ? { ...review, helpfulVotes: review.helpfulVotes + 1 } : review
    );
    
    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading reviews...</h1>
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Reviews</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="w-full lg:w-64 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Filter Reviews</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Products</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="rating-desc">Highest Rating</option>
                <option value="rating-asc">Lowest Rating</option>
                <option value="helpful-desc">Most Helpful</option>
              </select>
            </div>
          </div>
          
          <div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>
          
          <div>
            <Link href="/products" className="text-blue-600 hover:underline block">
              Back to Products
            </Link>
          </div>
        </div>
        
        {/* Reviews List and Form */}
        <div className="flex-1">
          {showReviewForm && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Product</label>
                  <select
                    value={currentReview.productId}
                    onChange={(e) => setCurrentReview({...currentReview, productId: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCurrentReview({...currentReview, rating: star})}
                        className="text-2xl"
                      >
                        {star <= currentReview.rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={currentReview.title}
                    onChange={(e) => setCurrentReview({...currentReview, title: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Summarize your experience"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Review</label>
                  <textarea
                    value={currentReview.content}
                    onChange={(e) => setCurrentReview({...currentReview, content: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    placeholder="Share your experience with this product"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div className="space-y-6">
            {filteredReviews.length === 0 ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">No reviews found</h2>
                <p className="text-gray-600">
                  {selectedProduct === 'all' 
                    ? 'Be the first to review our products!' 
                    : 'Be the first to review this product!'}
                </p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Write a Review
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white shadow rounded-lg p-4">
                  <p className="text-gray-600">
                    Showing {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                {filteredReviews.map((review) => (
                  <div key={review.id} className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{review.title}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <span className="ml-2 text-gray-500">{review.rating}/5</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <Link href={`/products/${review.productId}`}>
                          {review.productName}
                        </Link>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{review.content}</p>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>{review.userName}</span>
                        {review.verified && (
                          <span className="text-green-600 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <button 
                        onClick={() => markHelpful(review.id)}
                        className="text-sm text-gray-600 hover:text-blue-600"
                      >
                        {review.helpfulVotes} {review.helpfulVotes === 1 ? 'person' : 'people'} found this helpful | Mark as helpful
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}