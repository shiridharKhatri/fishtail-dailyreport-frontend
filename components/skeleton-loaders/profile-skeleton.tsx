import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeletonLoader() {
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

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <div className="mb-8">
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Title */}
          <div className="mb-8">
            <Skeleton className="h-9 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Profile Card */}
          <div className="glass rounded-2xl p-8 space-y-8">
            {/* Profile Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div className="flex items-center gap-4">
                <Skeleton className="w-20 h-20 rounded-full" />
                <div>
                  <Skeleton className="h-7 w-40 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Profile Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>

            {/* Permissions Section */}
            <div className="pt-6 border-t border-border space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="pt-6 border-t border-border space-y-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
