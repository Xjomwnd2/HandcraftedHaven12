'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Settings, ShoppingBag, Heart, LogOut, Camera, X } from 'lucide-react';
import Link from 'next/link';

// Types
type UserProfile = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  joinedDate: string; // ISO date string
};

type AccountTab = 'profile' | 'orders' | 'wishlist' | 'settings';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulate fetching user data
    // Replace with actual API call to your backend
    setTimeout(() => {
      const userData = {
        id: 'usr_12345',
        name: 'Joel Ndiba Mwaura',
        email: 'joel.mwaura@example.com',
        profileImage: '/api/placeholder/150/150',
        joinedDate: new Date().toISOString(),
      };
      
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        setSaveMessage({
          type: 'error',
          text: 'Please select an image file (JPG, PNG, etc.)'
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSaveMessage({
          type: 'error',
          text: 'Image size should be less than 5MB'
        });
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      // Simulate API call to update user profile and upload image
      // Replace with actual API calls to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Image upload logic would go here
      // For example:
      /*
      if (selectedImage) {
        const formData = new FormData();
        formData.append('profileImage', selectedImage);
        const response = await fetch('/api/upload-profile-image', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        // Use the returned image URL
        const imageUrl = data.imageUrl;
      }
      */
      
      // Update local user state with form data
      if (user) {
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
          // In a real implementation, you'd use the imageUrl from the server
          profileImage: imagePreview || user.profileImage
        });
      }
      
      setSaveMessage({
        type: 'success',
        text: 'Changes saved successfully!'
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (error) {
      setSaveMessage({
        type: 'error',
        text: 'Failed to save changes. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Please log in to view your account</h1>
        <Link href="/login">
          <div className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Log In
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-3">
              {imagePreview || user.profileImage ? (
                <img 
                  src={imagePreview || user.profileImage} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={36} className="text-gray-500" />
                </div>
              )}
              <button 
                onClick={triggerImageUpload}
                className="absolute bottom-0 right-0 p-1 bg-indigo-600 text-white rounded-full"
                aria-label="Change profile picture"
              >
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">Member since {formatDate(user.joinedDate)}</p>
          </div>
          
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex w-full items-center space-x-2 p-2 rounded-md ${
                activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
              }`}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex w-full items-center space-x-2 p-2 rounded-md ${
                activeTab === 'orders' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
              }`}
            >
              <ShoppingBag size={18} />
              <span>Orders</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`flex w-full items-center space-x-2 p-2 rounded-md ${
                activeTab === 'wishlist' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
              }`}
            >
              <Heart size={18} />
              <span>Wishlist</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex w-full items-center space-x-2 p-2 rounded-md ${
                activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
              }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>
            
            <button 
              className="flex w-full items-center space-x-2 p-2 rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
              
              <form onSubmit={handleSaveChanges} className="space-y-4">
                {/* Hidden file input */}
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                
                {/* Profile Image Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Profile Image</label>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24">
                      {imagePreview || user.profileImage ? (
                        <img 
                          src={imagePreview || user.profileImage} 
                          alt="Profile preview" 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                          <User size={36} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <button 
                        type="button"
                        onClick={triggerImageUpload}
                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Upload New Image
                      </button>
                      
                      {imagePreview && (
                        <button 
                          type="button" 
                          onClick={removeSelectedImage}
                          className="px-3 py-1 bg-red-50 text-red-600 text-sm rounded-md hover:bg-red-100 transition-colors flex items-center justify-center"
                        >
                          <X size={14} className="mr-1" /> Remove
                        </button>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        JPG, PNG, or GIF. Max 5MB.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                {saveMessage && (
                  <div className={`p-3 rounded-md ${
                    saveMessage.type === 'success' 
                      ? 'bg-green-50 text-green-800' 
                      : 'bg-red-50 text-red-800'
                  }`}>
                    {saveMessage.text}
                  </div>
                )}
                
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${
                      isSaving ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Order History</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Order #HC12345</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Delivered</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Placed on April 5, 2025</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2 items • $124.95</span>
                    <button className="text-indigo-600 text-sm hover:underline">View Details</button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Order #HC12340</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Processing</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Placed on March 28, 2025</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">1 item • $79.99</span>
                    <button className="text-indigo-600 text-sm hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-md p-4 flex">
                  <img src="/api/placeholder/80/80" alt="Product" className="w-20 h-20 object-cover mr-4" />
                  <div className="flex-1">
                    <h3 className="font-medium">Hand-knitted Wool Scarf</h3>
                    <p className="text-sm text-gray-500 mb-2">$49.99</p>
                    <div className="flex space-x-2">
                      <button className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Add to Cart
                      </button>
                      <button className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-4 flex">
                  <img src="/api/placeholder/80/80" alt="Product" className="w-20 h-20 object-cover mr-4" />
                  <div className="flex-1">
                    <h3 className="font-medium">Ceramic Coffee Mug</h3>
                    <p className="text-sm text-gray-500 mb-2">$34.99</p>
                    <div className="flex space-x-2">
                      <button className="text-xs px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Add to Cart
                      </button>
                      <button className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Password</h3>
                  <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
                    Change Password
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="email-notifications" 
                        className="h-4 w-4 text-indigo-600 rounded"
                        defaultChecked
                      />
                      <label htmlFor="email-notifications" className="ml-2 text-sm">
                        Email notifications for orders and promotions
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="sms-notifications" 
                        className="h-4 w-4 text-indigo-600 rounded"
                      />
                      <label htmlFor="sms-notifications" className="ml-2 text-sm">
                        SMS notifications for orders
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Account Management</h3>
                  <button className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}