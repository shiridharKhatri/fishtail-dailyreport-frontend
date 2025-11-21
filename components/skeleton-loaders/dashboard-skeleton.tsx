import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeletonLoader() {
  return (
    <div className="relative w-full min-h-screen">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="h-6 w-32 hidden sm:block" />
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="w-40 h-10 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page header */}
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-3 w-20 mb-2" />
                    <Skeleton className="h-7 w-12" />
                  </div>
                  <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
                </div>
                <Skeleton className="h-3 w-32 mt-4" />
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 glass rounded-2xl p-6">
              <Skeleton className="h-6 w-48 mb-6" />
              <Skeleton className="h-80" />
            </div>
            <div className="glass rounded-2xl p-6">
              <Skeleton className="h-6 w-32 mb-6" />
              <Skeleton className="h-64 rounded-full" />
            </div>
          </div>

          {/* Reports List */}
          <div className="glass rounded-2xl p-6">
            <Skeleton className="h-6 w-48 mb-6" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 rounded-lg border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
