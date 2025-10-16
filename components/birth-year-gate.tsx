"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Lock, Calendar } from "lucide-react"

const CORRECT_YEAR = 2004

export default function BirthYearGate({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [error, setError] = useState(false)
  const [showShake, setShowShake] = useState(false)

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
    setError(false)
  }

  const handleSubmit = () => {
    if (selectedYear === CORRECT_YEAR) {
      setIsUnlocked(true)
    } else {
      setError(true)
      setShowShake(true)
      setTimeout(() => setShowShake(false), 500)
    }
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-yellow-700">
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.6) 0%, transparent 70%)',
            animationDuration: '4s',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%)',
            animationDuration: '6s',
            animationDelay: '1s',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        
        {/* Sparkle effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-sparkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Card */}
      <Card 
        className={`relative z-10 w-full max-w-md mx-4 p-8 bg-white/95 backdrop-blur-xl border-2 border-white/20 shadow-2xl ${
          showShake ? 'animate-shake' : ''
        }`}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 mb-4 animate-float">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            🎉 Birthday Verification 🎉
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Unlock the celebration by selecting your birth year
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </p>
        </div>

        <div className="space-y-6">
          {/* Year Selector */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
              <Calendar className="w-4 h-4" />
              Select Your Birth Year
            </label>
            <div className="relative">
              <select
                value={selectedYear || ""}
                onChange={(e) => handleYearSelect(Number(e.target.value))}
                className="w-full px-4 py-3 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all cursor-pointer hover:border-purple-400"
              >
                <option value="">Choose a year...</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-in fade-in slide-in-from-top duration-300">
              <p className="text-red-700 text-center font-medium">
                ❌ Oops! That's not the right year. Try again!
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedYear}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Unlock Celebration
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Hint: Think about when this special person was born 🎂
        </p>
      </Card>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
