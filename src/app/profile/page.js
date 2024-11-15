"use"
import React from 'react'
import Link from 'next/link'
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'


const page = () => {
  return (
    <div>
        <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Home */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-green-800">AASRA</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-green-800 transition-colors">
                Dashboard
              </Link>
              
              {/* Profile Icon/Button */}
              <div className="ml-4">
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                {/* <SignedOut>
                  <SignInButton mode="modal">
                    <button className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-green-100 to-pink-100">
        <form className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl m-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Profile Details</h2>
          
          <div className="mb-5">
            <label htmlFor="height" className="block text-gray-700 font-medium mb-2">Height (cm)</label>
            <input 
              type="number" 
              id="height"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="Enter your height in cm"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">Weight (kg)</label>
            <input 
              type="number"
              id="weight" 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="Enter your weight in kg"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">Diet Preference</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all">
              <option value="">Select preference</option>
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="origin" className="block text-gray-700 font-medium mb-2">State of Origin</label>
            <select
              id="origin"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              required
            >
              <option value="">Select your state</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="pgLocation" className="block text-gray-700 font-medium mb-2">PG Location</label>
            <input 
              type="text"
              id="pgLocation"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="Enter your PG location"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="dietaryRestrictions" className="block text-gray-700 font-medium mb-2">Dietary Restrictions</label>
            <textarea
              id="dietaryRestrictions"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
              placeholder="Enter any dietary restrictions or allergies"
              rows="3"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-pink-400 text-white py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default page