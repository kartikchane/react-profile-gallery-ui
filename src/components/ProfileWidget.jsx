import React, { useState } from 'react'

const tabs = ['About Me', 'Experiences', 'Recommended']

export default function ProfileWidget() {
  const [active, setActive] = useState(0)

  return (
    <div className="bg-gradient-to-br from-[#1e2328] to-[#181c20] rounded-2xl lg:rounded-3xl p-4 sm:p-6 shadow-neu border border-gray-800/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg lg:rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-300 shadow-inner border border-gray-600/30">
            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-white font-semibold text-base sm:text-lg">Profile</div>
        </div>
      </div>

      <div>
        <div className="flex gap-1 sm:gap-2 bg-[#0f1215] p-1 sm:p-1.5 rounded-xl lg:rounded-2xl overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`relative px-3 sm:px-6 py-2 sm:py-3 rounded-lg lg:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 transform whitespace-nowrap ${
                active === i
                  ? 'bg-gradient-to-r from-[#2a2f35] to-[#1e2328] text-white shadow-lg scale-105 border border-gray-600/30'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
              }`}
            >
              {active === i && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg lg:rounded-xl" />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-gray-300 leading-relaxed text-sm sm:text-sm bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-4 sm:p-6 rounded-xl lg:rounded-2xl border border-gray-700/30 backdrop-blur-sm min-h-[100px] sm:min-h-[120px] overflow-hidden">
          {active === 0 && (
            <p>
              Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this
              awesome company for 3 years now. I was born and raised in Albany, NY & have been
              living in Santa Carla for the past 10 years with my wife Tiffany and my 4 year old
              twin daughters—Emma and Ella.
            </p>
          )}
          {active === 1 && (
            <p>
              Experience: 8 years in enterprise sales, handled multiple accounts with strong
              retention. Skilled in consultative selling and relationship building.
            </p>
          )}
          {active === 2 && (
            <p>
              Recommended: Top performing quarterly rep, recommended reading includes books
              on negotiation and leadership.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
