import { Skeleton } from "@/components/ui/skeleton"

export function EmployeeDashboardSkeletonLoader() {
  return (
    <div className="relative w-full min-h-screen">
      <div className="relative z-10">
        {/* Header Skeleton */}
        <div className="h-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="w-10 h-10 rounded-lg" />
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page header */}
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Form Skeleton */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
                <Skeleton className="h-6 w-48" />

                <div className="space-y-6">
                  {/* Date selector */}
                  <div>
                    <Skeleton className="h-4 w-20 mb-3" />
                    <div className="flex gap-3">
                      <Skeleton className="flex-1 h-10" />
                      <Skeleton className="flex-1 h-10" />
                    </div>
                  </div>

                  {/* Textarea */}
                  <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-32 w-full" />
                  </div>

                  {/* File upload */}
                  <div>
                    <Skeleton className="h-4 w-32 mb-3" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                  </div>

                  {/* Submit button */}
                  <Skeleton className="h-11 w-full" />
                </div>
              </div>
            </div>

            {/* Recent Reports Skeleton */}
            <div className="glass rounded-2xl p-6 space-y-6">
              <Skeleton className="h-6 w-40" />

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>

              {/* Search bar */}
              <Skeleton className="h-10 w-full rounded-lg" />

              {/* Filter buttons */}
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20" />
                ))}
              </div>

              {/* Reports list */}
              <div className="space-y-3 max-h-96">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-lg border border-white/10 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
