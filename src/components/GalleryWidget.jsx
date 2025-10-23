import React, { useState, useEffect, useRef } from 'react'

// Initial images that match the Figma design - dark geometric patterns
const initialImages = [
  { id: 1, type: 'figma-style' },
  { id: 2, type: 'figma-style' },
  { id: 3, type: 'figma-style' },
]

export default function GalleryWidget() {
  const [images, setImages] = useState(initialImages)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [newlyAddedId, setNewlyAddedId] = useState(null)
  const galleryRef = useRef(null)
  
  // Image dimensions for scroll calculation
  const imageWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 180 // Mobile vs Desktop
  const gap = typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 20 // Gap between images
  
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 2 : 3
    }
    return 3
  }
  
  const [visibleCount, setVisibleCount] = useState(getVisibleCount())
  
  // Update visible count on window resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleCount = getVisibleCount()
      setVisibleCount(newVisibleCount)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate scroll boundaries
  const maxScroll = Math.max(0, (images.length - visibleCount) * (imageWidth + gap))
  
  // Get currently visible images based on scroll position
  const getVisibleImages = () => {
    const startIndex = Math.floor(scrollPosition / (imageWidth + gap))
    const endIndex = Math.min(startIndex + visibleCount + 1, images.length) // +1 for partial visibility
    return images.slice(startIndex, endIndex)
  }

  function addImage() {
    // Add the same style image as shown in Figma
    const newImageId = Date.now()
    const newImage = { 
      id: newImageId, 
      type: 'figma-style'
    }
    
    // Set this as the newly added image for animation
    setNewlyAddedId(newImageId)
    
    // Add visual feedback - button animation
    const button = document.querySelector('.add-image-btn')
    if (button) {
      button.style.transform = 'scale(0.95)'
      setTimeout(() => {
        button.style.transform = ''
      }, 150)
    }
    
    setImages((prev) => {
      const newImages = [...prev, newImage]
      
      // Auto-scroll to show the new image
      setTimeout(() => {
        if (newImages.length > visibleCount) {
          const newMaxScroll = Math.max(0, (newImages.length - visibleCount) * (imageWidth + gap))
          setIsNavigating(true)
          setScrollPosition(newMaxScroll)
          setTimeout(() => setIsNavigating(false), 500)
        }
      }, 200)
      
      // Clear the newly added highlight after animation
      setTimeout(() => setNewlyAddedId(null), 2000)
      
      return newImages
    })
  }

  function goLeft() {
    const scrollAmount = imageWidth + gap
    const newPosition = Math.max(0, scrollPosition - scrollAmount)
    
    if (newPosition !== scrollPosition) {
      setIsNavigating(true)
      setNewlyAddedId(null) // Clear newly added highlight
      setScrollPosition(newPosition)
      setTimeout(() => setIsNavigating(false), 500)
    }
  }

  function goRight() {
    const scrollAmount = imageWidth + gap
    const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount)
    
    if (newPosition !== scrollPosition) {
      setIsNavigating(true)
      setNewlyAddedId(null) // Clear newly added highlight
      setScrollPosition(newPosition)
      setTimeout(() => setIsNavigating(false), 500)
    }
  }

  // Get the currently visible images
  const visibleImages = getVisibleImages()
  
  // Calculate current position for counter
  const currentStartIndex = Math.floor(scrollPosition / (imageWidth + gap)) + 1
  const currentEndIndex = Math.min(currentStartIndex + visibleCount - 1, images.length)

  return (
    <div className="bg-[#363C43] rounded-2xl lg:rounded-3xl p-4 sm:p-6 shadow-neu border border-gray-700/30 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#28292F] flex items-center justify-center text-gray-400 shadow-inner border border-gray-600/30">
            <span className="text-xs sm:text-sm font-bold">?</span>
          </div>
          <div className="text-white font-semibold text-base sm:text-lg">Gallery</div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <button 
            onClick={addImage} 
            className="add-image-btn w-full sm:w-auto bg-gradient-to-r from-[#2d3439] to-[#252a2f] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 hover:from-[#3d4449] hover:to-[#353a3f] transition-all duration-300 font-medium border border-gray-600/30 backdrop-blur-sm cursor-pointer active:scale-95"
          >
            <span className="flex items-center justify-center sm:justify-start gap-2">
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm sm:text-base">ADD IMAGE</span>
            </span>
          </button>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center">
            <button 
              onClick={goLeft}
              disabled={scrollPosition === 0}
              className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl lg:rounded-2xl transition-all duration-300 transform border flex items-center justify-center ${
                scrollPosition === 0
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
              disabled={scrollPosition >= maxScroll}
              className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl lg:rounded-2xl transition-all duration-300 transform border flex items-center justify-center ${
                scrollPosition >= maxScroll
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

      <div className={`mt-6 sm:mt-8 transition-all duration-500 ${isNavigating || newlyAddedId ? 'transform translate-x-2' : ''}`}>
        {/* Image counter indicator with smooth transitions */}
        <div className="flex justify-center mb-4 sm:mb-6 overflow-hidden">
          <div className={`bg-gradient-to-r from-gray-800/50 to-gray-700/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-gray-300 text-xs sm:text-sm font-medium border border-gray-600/30 backdrop-blur-sm transition-all duration-500 transform ${
            isNavigating || newlyAddedId ? 'scale-105 shadow-lg shadow-blue-500/20' : ''
          }`}>
            <span className={`inline-block transition-all duration-400 transform ${
              isNavigating ? 'animate-pulse scale-105' : newlyAddedId ? 'text-blue-300' : ''
            }`}>
              {currentStartIndex}-{currentEndIndex} of {images.length}
            </span>
            {images.length > visibleCount && (
              <span className="ml-2 text-blue-400 transition-all duration-300">
                <svg className={`w-3 h-3 inline transition-transform duration-300 ${
                  isNavigating ? 'animate-bounce' : 'animate-pulse'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-xl">
          <div 
            ref={galleryRef}
            className={`flex gap-3 sm:gap-4 lg:gap-5 transition-transform duration-500 ease-out ${
              isNavigating ? 'scale-98' : newlyAddedId ? 'scale-102' : 'scale-100'
            }`}
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              width: `${images.length * (imageWidth + (typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 20))}px`
            }}
          >
            {images.map((image, index) => {
              const isNewlyAdded = image.id === newlyAddedId
              
              return (
                <div 
                  key={image.id} 
                  className={`flex-shrink-0 aspect-square rounded-xl lg:rounded-2xl overflow-hidden bg-gradient-to-br from-gray-500 to-gray-700 relative shadow-lg sm:shadow-xl border border-gray-600/30 transform hover:scale-110 hover:shadow-2xl hover:border-gray-400/50 group cursor-pointer ${
                    isNewlyAdded 
                      ? 'animate-fadeIn border-blue-400/50 shadow-blue-500/20' 
                      : isNavigating 
                        ? 'transition-none' 
                        : 'transition-all duration-300'
                  }`}
                  style={{
                    width: `${imageWidth}px`,
                    height: `${imageWidth}px`,
                    ...(isNewlyAdded ? { 
                      animation: `fadeIn 0.6s ease-out forwards`
                    } : {})
                  }}
                  onClick={() => {
                    // Optional: Handle image click
                    console.log('Image clicked:', image.id)
                  }}
                >
              {/* Figma-accurate geometric pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 group-hover:from-gray-300 group-hover:to-gray-500 transition-all duration-500">
                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`bg-${image.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#666" />
                      <stop offset="50%" stopColor="#555" />
                      <stop offset="100%" stopColor="#444" />
                    </linearGradient>
                    <linearGradient id={`shimmer-${image.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Base background */}
                  <rect width="200" height="200" fill={`url(#bg-${image.id})`}/>
                  
                  {/* Diagonal lines pattern like Figma */}
                  <g stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" fill="none">
                    {Array.from({ length: 20 }, (_, i) => (
                      <g key={i}>
                        <line x1={i * 20 - 10} y1="0" x2={i * 20 + 50} y2="200" />
                        <line x1={i * 20 + 10} y1="0" x2={i * 20 - 50} y2="200" />
                      </g>
                    ))}
                  </g>
                  
                  {/* Flowing curved shapes like in Figma */}
                  <path d="M0,80 Q50,20 100,80 Q150,140 200,80 L200,200 Q150,140 100,120 Q50,140 0,120 Z" 
                        fill="rgba(0,0,0,0.3)" 
                        className="group-hover:opacity-50 transition-opacity duration-500"/>
                  
                  <path d="M0,0 Q50,60 100,0 Q150,-60 200,0 L200,40 Q150,100 100,40 Q50,100 0,40 Z" 
                        fill="rgba(255,255,255,0.08)" 
                        className="group-hover:opacity-15 transition-opacity duration-500"/>
                  
                  {/* Subtle overlay lines */}
                  <path d="M0,100 Q100,60 200,100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                  <path d="M0,120 Q100,80 200,120" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
                  
                  {/* Shimmer effect on hover */}
                  <rect width="200" height="200" fill={`url(#shimmer-${image.id})`} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </svg>
              </div>
              
              {/* Interactive overlay for depth and hover feedback */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 rounded-xl lg:rounded-2xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-300" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
