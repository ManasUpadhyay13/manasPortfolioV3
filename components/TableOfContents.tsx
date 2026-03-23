'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Heading {
  text: string;
  slug: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeSlug, setActiveSlug] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block">
        <p className="text-xs font-semibold text-gray-medium uppercase tracking-wider mb-3">
          On this page
        </p>
        <ul className="space-y-1 border-l-2 border-gray-100">
          {headings.map(({ text, slug, level }) => (
            <li key={slug}>
              <a
                href={`#${slug}`}
                className={`block text-sm py-1 transition-colors ${
                  level === 3 ? 'pl-6' : level === 4 ? 'pl-8' : 'pl-4'
                } ${
                  activeSlug === slug
                    ? 'text-foreground border-l-2 border-foreground -ml-[2px]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: expandable drawer */}
      <div className="lg:hidden mb-8 border border-gray-200 rounded-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-medium"
        >
          On this page
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <ul className="px-4 pb-3 space-y-1 border-t border-gray-100">
            {headings.map(({ text, slug, level }) => (
              <li key={slug}>
                <a
                  href={`#${slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm py-1 text-gray-medium hover:text-foreground transition-colors ${
                    level === 3 ? 'pl-4' : level === 4 ? 'pl-8' : ''
                  }`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
