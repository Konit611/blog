'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted before rendering theme toggle to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold">
          My Blog
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Blog
          </Link>
          <Link href="/portfolio" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Portfolio
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">
            About
          </Link>
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-sm font-medium text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
