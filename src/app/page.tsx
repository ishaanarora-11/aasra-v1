import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://thumbs.dreamstime.com/z/salad-tomatoes-greens-dressing-oil-feta-cheese-blue-plate-white-wooden-background-top-view-banner-website-52717635.jpg" 
          alt="Food background"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Content */}
      
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4">
        <h1 className="text-6xl font-bold text-green-800 text-center mb-[40px] mt-[100px] gap-4">AASRA</h1>
        <h1 className="text-4xl font-bold text-green-800 text-center mb-4">
          Home is just a meal away.
        </h1>
        
        <p className="text-xl text-green-700 max-w-2xl text-center mb-8">
        Aasra is an AI-powered platform designed to assist PG students with healthy eating, emotional support, and managing food-related anxiety. It offers personalized meal plans, budgeting help, and comforting recipe narration. Aasra creates a supportive community environment, providing both nutritional guidance and emotional well-being for students balancing their academic and personal lives.
        </p>

        <button className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg">
          Get Started!
        </button>
      </div>
    </div>
  );
}
