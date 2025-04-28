import Link from "next/link"
import { ArrowLeft, Flame, BarChart3, Heart, Swords, Gift, Trophy } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-red-500" />
              <span className="text-xl font-bold tracking-tight">R4RR</span>
            </Link>
            <Link href="/members" className="flex items-center text-sm text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Members
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Profile Header Skeleton */}
        <div className="relative mb-8">
          <div className="h-48 md:h-64 rounded-lg overflow-hidden bg-gray-800 animate-pulse"></div>

          <div className="container relative z-20 -mt-24">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Profile Image Skeleton */}
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-gray-800 border-4 border-red-500/30 animate-pulse"></div>

              <div className="flex-grow pt-4 md:pt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    {/* Name Skeleton */}
                    <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-2"></div>
                    {/* Position Skeleton */}
                    <div className="h-5 w-32 bg-gray-800 rounded animate-pulse mb-2"></div>
                    {/* Join Date Skeleton */}
                    <div className="h-4 w-40 bg-gray-800 rounded animate-pulse"></div>
                  </div>

                  <div className="flex gap-3">
                    {/* Action Buttons Skeleton */}
                    <div className="h-9 w-20 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-9 w-20 bg-gray-800 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 flex flex-col items-center"
            >
              <div className="bg-red-500/10 p-2 rounded-full mb-2">
                {index === 0 && <BarChart3 className="h-6 w-6 text-red-500/50" />}
                {index === 1 && <Flame className="h-6 w-6 text-red-500/50" />}
                {index === 2 && <Swords className="h-6 w-6 text-red-500/50" />}
                {index === 3 && <Heart className="h-6 w-6 text-red-500/50" />}
              </div>
              <div className="h-8 w-16 bg-gray-800 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Gift Level Skeleton */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-500/10 p-2 rounded-full">
                <Gift className="h-6 w-6 text-red-500/50" />
              </div>
              <div>
                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-40 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-gray-700 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="h-2 w-full bg-gray-800 rounded animate-pulse"></div>
          <div className="flex justify-end mt-1">
            <div className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Additional Information Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio Section Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mb-8">
              <div className="h-6 w-24 bg-gray-800 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Recent Activity Skeleton */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-red-500/50" />
                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
              </div>
              <div className="space-y-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0">
                    <div className="bg-gray-800 p-2 rounded-full h-8 w-8"></div>
                    <div className="flex-grow">
                      <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2"></div>
                      <div className="h-3 w-20 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Skeleton */}
          <div className="space-y-8">
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-red-500/50" />
                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
              </div>
              <div className="space-y-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0">
                    <div className="bg-red-500/20 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-red-400/50" />
                    </div>
                    <div className="flex-grow">
                      <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="h-9 w-full bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="h-4 w-64 bg-gray-800 rounded animate-pulse mx-auto"></div>
        </div>
      </footer>
    </div>
  )
}
