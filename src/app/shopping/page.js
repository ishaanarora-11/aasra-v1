"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingCart, Check, Package } from 'lucide-react';
import { Heart, UserCircle } from 'lucide-react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'



const GroceryChecklist = () => {
  const [groceryItems, setGroceryItems] = useState({
    Staples: [
      { name: 'Bread', price: 45, qty: 2, checked: false, image: 'https://www.bhg.com/thmb/ov2S31znAvSCXqrpgJQ8rwBgzp8=/2250x0/filters:no_upscale():strip_icc()/BHG-milk-bread-4CdeIL1uKGyB5ryU8J_EED-aaa76729c86a413ca7500029edba79f0.jpg'},
      { name: 'Rice (1 kg)', price: 75, qty: 1, checked: false, image: 'https://media.istockphoto.com/id/153737841/photo/rice.jpg?s=612x612&w=0&k=20&c=lfO7iLT0UsDDzra0uBOsN1rvr2d5OEtrG2uwbts33_c=' },
      { name: 'Atta (1 kg)', price: 65, qty: 2, checked: false, image: 'https://sudhantira.com/cdn/shop/files/wheat-flour-chakki-atta-1000x1000.jpg?v=1716794054' },
      { name: 'Cooking Oil (1 L)', price: 180, qty: 1, checked: false, image: 'https://media.post.rvohealth.io/wp-content/uploads/2023/09/woman-holding-cooking-oil-bottle-1296x728-header.jpg' },
      { name: 'Sugar (1 kg)', price: 55, qty: 1, checked: false, image: 'https://www.tasteofhome.com/wp-content/uploads/2019/11/sugar-shutterstock_615908132.jpg' }
    ],
    Dairy: [
      { name: 'Milk (1 liter)', price: 62, qty: 2, checked: false, image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/004-soymilk.jpg' },
      { name: 'Eggs (dozen)', price: 84, qty: 1, checked: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Fried_Egg_2.jpg/1200px-Fried_Egg_2.jpg' }
    ],
    Protein: [
      { name: 'Chicken (1 kg)', price: 220, qty: 1, checked: false, image: 'https://www.simplyrecipes.com/thmb/Sw2rWO2l615LjOnmUyDIWjAMDKg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2007__04__honey-glazed-roast-chicken-horiz-a-1800-2057270028084ff2bdb54fcb0f2d3227.jpg' },
      { name: 'Dal (1 kg)', price: 140, qty: 1, checked: false, image: 'https://ooofarms.com/cdn/shop/products/OOO_Farms_Unpolished_Masoor_Dal.jpg?v=1719233061&width=1500' }
    ],
    Produce: [
      { name: 'Bananas (dozen)', price: 60, qty: 1, checked: false, image: 'https://www.bigbasket.com/media/uploads/p/xxl/10000027_32-fresho-banana-robusta.jpg' },
      { name: 'Apples (1 kg)', price: 120, qty: 1, checked: false, image: 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/07/what_to_know_apples_green_red_1296x728_header-1024x575.jpg?w=1155&h=1528' },
      { name: 'Potatoes (1 kg)', price: 40, qty: 1, checked: false, image: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg' },
      { name: 'Onions (1 kg)', price: 35, qty: 1, checked: false, image: 'https://www.jiomart.com/images/product/original/590003515/onion-1-kg-product-images-o590003515-p590003515-1-202408070949.jpg?im=Resize=(420,420)' },
      { name: 'Tomatoes (1 kg)', price: 45, qty: 1, checked: false, image: 'https://www.garden-products.co.uk/wp-content/uploads/2024/02/Tomatoes-scaled.jpeg' }
    ],
    Beverages: [
      { name: 'Tea Powder (250g)', price: 120, qty: 1, checked: false, image: 'https://munnarshop.com/wp-content/uploads/2023/03/Munnar-Dust-Tea-Powder-1.png' }
    ]
  });

  const categoryColors = {
    Staples: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
    Dairy: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    Protein: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    Produce: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    Beverages: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' }
  };

  const handleCheck = (category, itemIndex) => {
    setGroceryItems(prev => ({
      ...prev,
      [category]: prev[category].map((item, idx) => 
        idx === itemIndex ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const getProgress = () => {
    const totalItems = Object.values(groceryItems).flat().length;
    const checkedItems = Object.values(groceryItems).flat().filter(item => item.checked).length;
    return Math.round((checkedItems / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6 ">
      <nav className="fixed w-full z-50">
      {/* Blur effect background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-lg border-b border-gray-200" />

      {/* Navbar content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo as a button */}
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
          >
            <Heart className="w-8 h-8 text-rose-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
              Aasra
            </span>
          </button>

          {/* Dashboard and Profile */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-4 py-2 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              Dashboard
            </button>
            
              <SignedIn>
            <UserButton />
          </SignedIn>
            
          </div>
        </div>
      </div>
    </nav>
      <div className="max-w-4xl mx-auto my-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
            <ShoppingCart className="h-10 w-10 text-blue-600" />
            Shopping Checklist
          </h1>
          
          <div className="bg-white rounded-lg p-4 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-gray-700">Progress</span>
              <span className="text-lg font-bold text-blue-600">{getProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 rounded-full h-4 transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(groceryItems).map(([category, items]) => (
            <Card 
              key={category} 
              className={`shadow-lg ${categoryColors[category].bg} border-l-4 ${categoryColors[category].border}`}
            >
              <CardHeader>
                <CardTitle className={`text-xl ${categoryColors[category].text} flex items-center gap-2`}>
                  <Package className="h-6 w-6" />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm 
                        transition-all duration-300 hover:shadow-md
                        ${item.checked ? 'bg-gray-50' : ''}`}
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => handleCheck(category, index)}
                            className="h-5 w-5"
                          />
                          <span className={`font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {item.name}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          Quantity: {item.qty} • ₹{item.price}
                        </div>
                      </div>
                      {item.checked && (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total Items:</span>
            <span className="text-xl">
              {Object.values(groceryItems).flat().filter(item => item.checked).length} / {Object.values(groceryItems).flat().length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryChecklist;