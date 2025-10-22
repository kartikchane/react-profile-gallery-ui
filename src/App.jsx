import React from 'react'
import ProfileWidget from './components/ProfileWidget'
import GalleryWidget from './components/GalleryWidget'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c0f] via-[#0f1113] to-[#141619] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 relative z-10">
        {/* left empty pane - hidden on mobile, visible on desktop */}
        <div className="hidden lg:block lg:col-span-7 rounded-2xl lg:rounded-3xl border border-gray-800/50 bg-gradient-to-br from-gray-900/20 to-gray-800/10 backdrop-blur-sm p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />
          <div className="relative z-10 h-full flex items-center justify-center text-gray-600 text-base lg:text-lg">
            <div className="text-center">
              <div className="w-16 lg:w-20 h-16 lg:h-20 mx-auto mb-4 rounded-xl lg:rounded-2xl bg-gradient-to-br from-gray-700/30 to-gray-900/30 flex items-center justify-center border border-gray-600/20">
                <svg className="w-8 lg:w-10 h-8 lg:h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-medium">Empty Canvas</p>
              <p className="text-sm text-gray-500 mt-1">This space is intentionally left blank</p>
            </div>
          </div>
        </div>

        {/* right column - full width on mobile, col-span-5 on desktop */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 sm:gap-6 lg:gap-8">
          <ProfileWidget />
          <GalleryWidget />
        </div>
      </div>
    </div>
  )
}
