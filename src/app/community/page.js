"use client"
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8 bg-emerald-50">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-emerald-800 font-bold mb-4 text-center">PG Cooking Community</h1>
          <button 
            onClick={() => document.getElementById('communityMembers').classList.toggle('hidden')}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors mb-8"
          >
            My Community
          </button>

          {/* Community Members Popup */}
          <div id="communityMembers" className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-emerald-800">Community Members</h2>
                <button 
                  onClick={() => document.getElementById('communityMembers').classList.add('hidden')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center p-2 bg-emerald-50 rounded">
                  <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3 text-green-900">PS</span>
                  <span className="text-emerald-900">Priya Sharma</span>
                </div>
                <div className="flex items-center p-2 bg-emerald-50 rounded">
                  <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3 text-green-900">AP</span>
                  <span className="text-emerald-900">Amit Patel</span>
                </div>
                <div className="flex items-center p-2 bg-emerald-50 rounded">
                  <span className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center mr-3 text-green-900">SK</span>
                  <span className="text-emerald-900">Sarah Khan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Today's Cook and Dish Section */}
        <div className="bg-yellow-50 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Today's Kitchen Schedule</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-lg border-emerald-900">
              <h3 className="text-xl font-medium mb-2 text-emerald-900">Today's Chef</h3>
              <p className="text-lg text-blue-600">Rahul Kumar</p>
              <p className="text-gray-600 mt-2">Cooking Time: 7:00 PM</p>
            </div>
            <div className="border p-4 rounded-lg border-emerald-900">
              <h3 className="text-xl font-medium mb-2 text-emerald-900 ">Today's Special</h3>
              <p className="text-lg text-green-600">Butter Chicken</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Recipe
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-yellow-50 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Cooking Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-emerald-200">
                  <th className="px-4 py-2 text-emerald-900">Rank</th>
                  <th className="px-4 py-2 text-emerald-900">Name</th>
                  <th className="px-4 py-2 text-emerald-900">Average Rating</th>
                  <th className="px-4 py-2 text-emerald-900">Total Dishes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 text-center text-emerald-700">1</td>
                  <td className="px-4 py-2 text-emerald-700">Priya Sharma</td>
                  <td className="px-4 py-2 text-center text-emerald-700">4.8</td>
                  <td className="px-4 py-2 text-center text-emerald-700">15</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-center text-emerald-700">2</td>
                  <td className="px-4 py-2 text-emerald-700">Amit Patel</td>
                  <td className="px-4 py-2 text-center text-emerald-700">4.6</td>
                  <td className="px-4 py-2 text-center text-emerald-700">12</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-center text-emerald-700">3</td>
                  <td className="px-4 py-2 text-emerald-700">Sarah Khan</td>
                  <td className="px-4 py-2 text-center text-emerald-700">4.5</td>
                  <td className="px-4 py-2 text-center text-emerald-700">18</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-yellow-50 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Rate Today's Meal</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg text-emerald-900">Rating:</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-2xl text-yellow-400 hover:text-yellow-500"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Add your feedback (optional)"
            ></textarea>
            <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full md:w-auto">
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
