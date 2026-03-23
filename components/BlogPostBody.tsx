import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { codeToHtml } from 'shiki';
import { urlFor } from '@/lib/sanity/image';
import type { PortableTextBlock } from '@portabletext/types';

async function CodeBlock({ value }: { value: { code: string; language?: string; filename?: string } }) {
  const html = await codeToHtml(value.code, {
    lang: value.language || 'text',
    theme: 'github-dark',
  });

  return (
    <div className="my-6 rounded-lg overflow-hidden">
      {value.filename && (
        <div className="bg-zinc-800 text-zinc-400 text-xs px-4 py-2 font-mono">
          {value.filename}
        </div>
      )}
      <div
        className="text-sm [&>pre]:p-4 [&>pre]:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
              unoptimized
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-medium mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => <CodeBlock value={value} />,
  },
  block: {
    h2: ({ children, value }) => {
      const slug = (value.children as Array<{ text?: string }>)
        ?.map((c) => c.text || '')
        .join('')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return (
        <h2 id={slug} className="text-2xl font-bold mt-12 mb-4 scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const slug = (value.children as Array<{ text?: string }>)
        ?.map((c) => c.text || '')
        .join('')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return (
        <h3 id={slug} className="text-xl font-bold mt-8 mb-3 scroll-mt-24">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }) => {
      const slug = (value.children as Array<{ text?: string }>)
        ?.map((c) => c.text || '')
        .join('')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      return (
        <h4 id={slug} className="text-lg font-semibold mt-6 mb-2 scroll-mt-24">
          {children}
        </h4>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-6 text-gray-medium italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-4 text-gray-700">{children}</p>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-gray-100 text-sm px-1.5 py-0.5 rounded font-mono">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4 decoration-gray-300 hover:decoration-foreground transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-foreground underline underline-offset-4 decoration-gray-300 hover:decoration-foreground transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700 leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-gray-700 leading-relaxed">{children}</li>,
  },
};

interface BlogPostBodyProps {
  body: PortableTextBlock[];
}

export function BlogPostBody({ body }: BlogPostBodyProps) {
  return (
    <div className="prose-custom">
      <PortableText value={body} components={components} />
    </div>
  );
}
