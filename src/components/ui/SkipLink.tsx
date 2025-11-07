import React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * SkipLink component for accessibility keyboard navigation.
 *
 * Provides a visually hidden link that becomes visible when focused,
 * allowing keyboard users to skip to main content areas.
 */
export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:text-blue-600 focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-blue-500 focus:z-50 focus:outline-none"
    >
      {children}
    </a>
  );
}