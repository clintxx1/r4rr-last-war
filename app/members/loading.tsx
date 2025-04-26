import { Flame, ArrowLeft, Users, Search, Filter, SortAsc } from "lucide-react"
import Link from "next/link"

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
            <Link href="/" className="flex items-center text-sm text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold flex items-center">
              <Users className="mr-3 h-7 w-7 text-red-500" />
              ALLIANCE MEMBERS
            </h1>
            <div className="h-4 w-64 bg-gray-800 rounded animate-pulse mt-2"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-10 w-32 bg-red-500/30 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Search and Filter Skeleton */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <div className="h-10 w-full bg-gray-800/50 rounded animate-pulse"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="h-10 w-[180px] bg-gray-800/50 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-gray-500" />
                <div className="h-10 w-[180px] bg-gray-800/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid Skeleton - 2 rows with 4 cards per row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Generate 8 skeleton cards (2 rows of 4 on desktop) */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden animate-pulse">
              {/* Image placeholder */}
              <div className="relative h-40 bg-gray-800/70"></div>

              {/* Content placeholder */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-800/70 rounded p-2 h-16"></div>
                  <div className="bg-gray-800/70 rounded p-2 h-16"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-gray-800/70 rounded"></div>
                  <div className="h-4 w-16 bg-gray-800/70 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gray-800/70 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-800/70 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-800/70 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-800/70 rounded animate-pulse"></div>
            <div className="h-10 w-10 bg-gray-800/70 rounded animate-pulse"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="h-4 w-64 bg-gray-800/70 rounded animate-pulse mx-auto"></div>
        </div>
      </footer>
    </div>
  )
}
