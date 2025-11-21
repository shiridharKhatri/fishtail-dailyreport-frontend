'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify1-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <div className="text-9xl font-bold bg-gradient-to-b from-primary to-primary/70 bg-clip-text text-transparent">
            404
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            onClick={() => router.push('/')}
            size="lg"
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>

        {/* Additional Help Text */}
        <p className="text-sm text-muted-foreground mt-8">
          If you think this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}
