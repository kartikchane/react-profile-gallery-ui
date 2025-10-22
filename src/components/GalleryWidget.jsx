import React, { useState } from 'react'

// Initial images that match the Figma design - dark geometric patterns
const initialImages = [
  { id: 1, type: 'figma-style' },
  { id: 2, type: 'figma-style' },
  { id: 3, type: 'figma-style' },
]

export default function GalleryWidget() {
  const [images, setImages] = useState(initialImages)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Show 3 images at a time
  const imagesPerView = 3

  function addImage() {
    // Add the same style image as shown in Figma
    const newImage = { 
      id: Date.now(), 
      type: 'figma-style'
    }
    setImages((prev) => [...prev, newImage])
  }

  function goLeft() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  function goRight() {
    if (currentIndex < images.length - imagesPerView) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Get the currently visible images
  const visibleImages = images.slice(currentIndex, currentIndex + imagesPerView)

  return (
    <div className="bg-gradient-to-br from-[#1e2328] to-[#181c20] rounded-2xl lg:rounded-3xl p-4 sm:p-6 shadow-neu border border-gray-800/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg lg:rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-300 shadow-inner border border-gray-600/30">
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-white font-semibold text-base sm:text-lg">Gallery</div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <button 
            onClick={addImage} 
            className="w-full sm:w-auto bg-gradient-to-r from-[#2d3439] to-[#252a2f] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium border border-gray-600/30 backdrop-blur-sm"
          >
            <span className="flex items-center justify-center sm:justify-start gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm sm:text-base">ADD IMAGE</span>
            </span>
          </button>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center">
            <button 
              onClick={goLeft}
              disabled={currentIndex === 0}
              className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl lg:rounded-2xl transition-all duration-300 transform border flex items-center justify-center ${
                currentIndex === 0 
                  ? 'bg-[#1a1e22] text-gray-600 cursor-not-allowed border-gray-800' 
                  : 'bg-gradient-to-br from-[#2d3439] to-[#252a2f] text-white hover:shadow-lg hover:scale-105 border-gray-600/30 shadow-md'
              }`}
            >
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={goRight}
              disabled={currentIndex >= images.length - imagesPerView}
              className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl lg:rounded-2xl transition-all duration-300 transform border flex items-center justify-center ${
                currentIndex >= images.length - imagesPerView
                  ? 'bg-[#1a1e22] text-gray-600 cursor-not-allowed border-gray-800' 
                  : 'bg-gradient-to-br from-[#2d3439] to-[#252a2f] text-white hover:shadow-lg hover:scale-105 border-gray-600/30 shadow-md'
              }`}
            >
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        {/* Image counter indicator */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-gray-300 text-xs sm:text-sm font-medium border border-gray-600/30 backdrop-blur-sm">
            {currentIndex + 1}-{Math.min(currentIndex + imagesPerView, images.length)} of {images.length}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {visibleImages.map((image, index) => (
            <div 
              key={image.id} 
              className="w-full aspect-square rounded-xl lg:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-500 to-gray-700 relative shadow-lg sm:shadow-xl border border-gray-600/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Enhanced geometric pattern with animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 group-hover:from-gray-300 group-hover:to-gray-500 transition-all duration-500">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id={`lines-${image.id}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="10" y2="10" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
                      <line x1="10" y1="0" x2="0" y2="10" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"/>
                    </pattern>
                    <linearGradient id={`shimmer-${image.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                  <rect width="100" height="100" fill={`url(#lines-${image.id})`}/>
                  {/* Enhanced curved geometric shapes */}
                  <path d="M0,50 Q25,0 50,50 T100,50 L100,100 L0,100 Z" fill="rgba(0,0,0,0.4)" className="group-hover:opacity-60 transition-opacity duration-500"/>
                  <path d="M0,0 Q50,25 100,0 L100,30 Q50,55 0,30 Z" fill="rgba(255,255,255,0.15)" className="group-hover:opacity-25 transition-opacity duration-500"/>
                  {/* Shimmer effect on hover */}
                  <rect width="100" height="100" fill={`url(#shimmer-${image.id})`} className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </svg>
              </div>
              
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
