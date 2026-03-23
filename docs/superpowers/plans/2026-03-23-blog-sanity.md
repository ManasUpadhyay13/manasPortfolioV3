# Blog Section with Sanity CMS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-featured blog section powered by Sanity CMS to the portfolio, with a homepage featured post section, listing page, and individual post pages with sidebar TOC.

**Architecture:** Sanity Studio embedded at `/studio` with content fetched via GROQ queries using `@sanity/client`. Pages are statically generated with ISR (5-minute revalidation). Portable Text rendered with custom serializers for code blocks (shiki), images, and links.

**Tech Stack:** Next.js 16 (App Router), Sanity v3, @sanity/client, @portabletext/react, shiki, Tailwind CSS v4, Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-23-blog-sanity-design.md`

---

## File Map

### New files

```
sanity.config.ts                          # Sanity Studio configuration (project ID, dataset, plugins, schema)
sanity/env.ts                             # Sanity environment variable accessors
sanity/schemas/post.ts                    # Post document schema
sanity/schemas/index.ts                   # Schema barrel export

lib/sanity/client.ts                      # Sanity client instance
lib/sanity/image.ts                       # Image URL builder helper
lib/sanity/queries.ts                     # Reusable GROQ queries
lib/sanity/utils.ts                       # readingTime() and extractHeadings() utilities

app/studio/[[...tool]]/page.tsx           # Embedded Sanity Studio page
app/studio/layout.tsx                     # Studio layout (no portfolio chrome)

app/(subpages)/blog/page.tsx              # Blog listing page
app/(subpages)/blog/[slug]/page.tsx       # Individual blog post page

components/BlogSection.tsx                # Homepage: featured post banner + recent posts grid
components/BlogCard.tsx                   # Reusable post card (used on homepage + listing)
components/BlogPostBody.tsx               # Portable Text renderer with custom serializers
components/TableOfContents.tsx            # Sidebar TOC component (sticky, with mobile drawer)
components/TagFilter.tsx                  # Tag filter pill bar for blog listing
```

### Modified files

```
package.json                              # Add Sanity + blog dependencies
next.config.ts                            # Add Sanity image hostname to images.remotePatterns
app/page.tsx                              # Add <BlogSection /> between Experience and Contact
components/Navbar.tsx                     # Add "Blog" link to navigation
.env.local                                # Add Sanity env vars (user creates manually)
.gitignore                                # Add .superpowers/
```

---

## Task 1: Install Dependencies and Configure Environment

**Files:**
- Modify: `package.json`
- Create: `.env.local.example`
- Modify: `.gitignore`

- [ ] **Step 1: Install Sanity and blog dependencies**

```bash
npm install sanity @sanity/client @sanity/image-url @sanity/vision @portabletext/react shiki next-sanity
```

- [ ] **Step 2: Create `.env.local.example` with required variables**

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

- [ ] **Step 3: Add `.superpowers/` to `.gitignore`**

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.local.example .gitignore
git commit -m "chore: add Sanity and blog dependencies"
```

---

## Task 2: Sanity Environment and Client Setup

**Files:**
- Create: `sanity/env.ts`
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/image.ts`

- [ ] **Step 1: Create `sanity/env.ts`**

```typescript
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = '2024-01-01';
```

- [ ] **Step 2: Create `lib/sanity/client.ts`**

```typescript
import { createClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from '@/sanity/env';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
```

- [ ] **Step 3: Create `lib/sanity/image.ts`**

```typescript
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] **Step 4: Commit**

```bash
git add sanity/env.ts lib/sanity/client.ts lib/sanity/image.ts
git commit -m "feat: add Sanity client and image URL builder"
```

---

## Task 3: Sanity Post Schema

**Files:**
- Create: `sanity/schemas/post.ts`
- Create: `sanity/schemas/index.ts`

- [ ] **Step 1: Create `sanity/schemas/post.ts`**

```typescript
import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            withFilename: true,
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Manas Upadhyay',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : 'Draft',
      };
    },
  },
});
```

Note: The `code` type requires the `@sanity/code-input` plugin. Install it:

```bash
npm install @sanity/code-input
```

- [ ] **Step 2: Create `sanity/schemas/index.ts`**

```typescript
import { post } from './post';

export const schemaTypes = [post];
```

- [ ] **Step 3: Commit**

```bash
git add sanity/schemas/post.ts sanity/schemas/index.ts package.json package-lock.json
git commit -m "feat: add Sanity post schema with code block support"
```

---

## Task 4: Sanity Studio Embedded at `/studio`

**Files:**
- Create: `sanity.config.ts`
- Create: `app/studio/[[...tool]]/page.tsx`
- Create: `app/studio/layout.tsx`

- [ ] **Step 1: Create `sanity.config.ts` at project root**

```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './sanity/schemas';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  name: 'portfolio-blog',
  title: 'Portfolio Blog',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: { types: schemaTypes },
});
```

- [ ] **Step 2: Create `app/studio/layout.tsx`**

The studio needs its own layout without the portfolio shell (no StickyHeader, no Footer).

```typescript
export const metadata = {
  title: 'Sanity Studio',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create `app/studio/[[...tool]]/page.tsx`**

```typescript
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

- [ ] **Step 4: Verify studio loads**

Run `npm run dev` and navigate to `http://localhost:3000/studio`. The Sanity Studio should load with the Post schema visible in the left sidebar. You'll need valid `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`.

- [ ] **Step 5: Commit**

```bash
git add sanity.config.ts app/studio/
git commit -m "feat: embed Sanity Studio at /studio"
```

---

## Task 5: GROQ Queries and Utility Functions

**Files:**
- Create: `lib/sanity/queries.ts`
- Create: `lib/sanity/utils.ts`

- [ ] **Step 1: Create `lib/sanity/queries.ts`**

```typescript
import { groq } from 'next-sanity';

// Fields shared across all post queries
const postFields = groq`
  _id,
  title,
  slug,
  coverImage,
  excerpt,
  author,
  publishedAt,
  tags,
  featured,
  "readingTime": round(length(pt::text(body)) / 200)
`;

// All posts for listing page (sorted by date, no body)
export const allPostsQuery = groq`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    ${postFields}
  }
`;

// Featured post for homepage (most recent featured, or most recent overall)
export const featuredPostQuery = groq`
  *[_type == "post" && defined(publishedAt) && featured == true] | order(publishedAt desc) [0] {
    ${postFields}
  }
`;

// Recent posts for homepage (exclude featured, limit 2)
export const recentPostsQuery = groq`
  *[_type == "post" && defined(publishedAt) && _id != $excludeId] | order(publishedAt desc) [0...2] {
    ${postFields}
  }
`;

// Single post by slug (full content + related posts)
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body,
    "relatedPosts": relatedPosts[]->{
      ${postFields}
    }
  }
`;

// All slugs for generateStaticParams
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`;

// All unique tags for filter bar
export const allTagsQuery = groq`
  array::unique(*[_type == "post" && defined(publishedAt)].tags[])
`;
```

- [ ] **Step 2: Create `lib/sanity/utils.ts`**

```typescript
import type { PortableTextBlock } from '@portabletext/types';

/**
 * Estimate reading time from Portable Text blocks.
 * Returns minutes (minimum 1).
 */
export function calculateReadingTime(body: PortableTextBlock[]): number {
  if (!body) return 1;
  const text = body
    .filter((block) => block._type === 'block')
    .map((block) =>
      (block.children as Array<{ text?: string }>)
        ?.map((child) => child.text || '')
        .join('') || ''
    )
    .join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Extract headings from Portable Text for table of contents.
 * Returns array of { text, slug, level }.
 */
export function extractHeadings(
  body: PortableTextBlock[]
): Array<{ text: string; slug: string; level: number }> {
  if (!body) return [];
  return body
    .filter((block) => /^h[2-4]$/.test(block.style || ''))
    .map((block) => {
      const text =
        (block.children as Array<{ text?: string }>)
          ?.map((child) => child.text || '')
          .join('') || '';
      const slug = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const level = parseInt((block.style || 'h2').replace('h', ''), 10);
      return { text, slug, level };
    });
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/sanity/queries.ts lib/sanity/utils.ts
git commit -m "feat: add GROQ queries and reading time/TOC utilities"
```

---

## Task 6: Update Next.js Config for Sanity Images

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add Sanity CDN to image remote patterns**

Update `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "feat: allow Sanity CDN images in next/image"
```

---

## Task 7: BlogCard Component

**Files:**
- Create: `components/BlogCard.tsx`

- [ ] **Step 1: Create `components/BlogCard.tsx`**

This is reused on the homepage section and the listing page.

```typescript
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

interface BlogCardProps {
  post: {
    title: string;
    slug: { current: string };
    excerpt?: string;
    coverImage?: { asset: { _ref: string }; alt?: string };
    tags?: string[];
    publishedAt: string;
    readingTime?: number;
  };
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href={`/blog/${post.slug.current}`}
          className="group grid md:grid-cols-2 gap-0 bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
        >
          {post.coverImage && (
            <div className="relative aspect-[16/10] md:aspect-auto">
              <Image
                src={urlFor(post.coverImage).width(800).height(500).url()}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-medium px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-gray-medium text-sm leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <p className="text-xs text-gray-400">
              {date} · {post.readingTime || 1} min read
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug.current}`}
        className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors h-full"
      >
        {post.coverImage && (
          <div className="relative aspect-[16/10]">
            <Image
              src={urlFor(post.coverImage).width(600).height(375).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-5">
          <p className="text-xs text-gray-400 mb-2">
            {post.tags?.[0] && <span>{post.tags[0]} · </span>}
            {post.readingTime || 1} min read
          </p>
          <h3 className="font-bold text-base mb-1 group-hover:text-gray-600 transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-gray-medium text-sm line-clamp-2">{post.excerpt}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/BlogCard.tsx
git commit -m "feat: add BlogCard component for post cards"
```

---

## Task 8: BlogSection Homepage Component

**Files:**
- Create: `components/BlogSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/BlogSection.tsx`**

```typescript
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { BlogCard } from '@/components/BlogCard';
import { sanityClient } from '@/lib/sanity/client';
import { featuredPostQuery, recentPostsQuery } from '@/lib/sanity/queries';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export async function BlogSection() {
  const featuredPost = await sanityClient.fetch(featuredPostQuery);

  if (!featuredPost) return null;

  const recentPosts = await sanityClient.fetch(recentPostsQuery, {
    excludeId: featuredPost._id,
  });

  return (
    <Section id="blog">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          From the Blog
        </h2>

        {/* Featured post — wide banner */}
        <BlogCard post={featuredPost} featured />

        {/* Recent posts grid */}
        {recentPosts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {recentPosts.map((post: any, i: number) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* View all link */}
        <div className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-medium hover:text-foreground transition-colors"
          >
            View all posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Add BlogSection to homepage**

Modify `app/page.tsx` — add `<BlogSection />` between `<Experience />` and `<Contact />`:

```typescript
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Experience } from '@/components/Experience';
import { BlogSection } from '@/components/BlogSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-gray-200">
            <Navbar />
            <Hero />
            <Experience />
            <BlogSection />
            <Contact />
            <Footer />
        </main>
    );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/BlogSection.tsx app/page.tsx
git commit -m "feat: add blog section to homepage with featured + recent posts"
```

---

## Task 9: TagFilter Component

**Files:**
- Create: `components/TagFilter.tsx`

- [ ] **Step 1: Create `components/TagFilter.tsx`**

```typescript
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface TagFilterProps {
  tags: string[];
}

export function TagFilter({ tags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  function handleTagClick(tag: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    router.push(`/blog?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleTagClick(null)}
        className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !activeTag
            ? 'bg-foreground text-background'
            : 'bg-gray-100 text-gray-medium hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTag === tag
              ? 'bg-foreground text-background'
              : 'bg-gray-100 text-gray-medium hover:bg-gray-200'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/TagFilter.tsx
git commit -m "feat: add TagFilter component for blog listing"
```

---

## Task 10: Blog Listing Page

**Files:**
- Create: `app/(subpages)/blog/page.tsx`

- [ ] **Step 1: Create `app/(subpages)/blog/page.tsx`**

```typescript
import { Container } from '@/components/ui/Container';
import { BlogCard } from '@/components/BlogCard';
import { TagFilter } from '@/components/TagFilter';
import { sanityClient } from '@/lib/sanity/client';
import { allPostsQuery, allTagsQuery } from '@/lib/sanity/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Manas Upadhyay',
  description: 'Articles on software engineering, React, Next.js, and career reflections.',
};

export const revalidate = 300;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [posts, tags] = await Promise.all([
    sanityClient.fetch(allPostsQuery),
    sanityClient.fetch(allTagsQuery),
  ]);

  const filteredPosts = tag
    ? posts.filter((post: any) => post.tags?.includes(tag))
    : posts;

  return (
    <div className="py-16 md:py-24">
      <Container>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-gray-medium text-lg mb-10">
          Thoughts on software engineering, building products, and everything in between.
        </p>

        {tags.length > 0 && (
          <div className="mb-10">
            <TagFilter tags={tags} />
          </div>
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post: any, i: number) => (
              <BlogCard key={post._id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-gray-medium text-center py-20">No posts found.</p>
        )}
      </Container>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(subpages\)/blog/page.tsx
git commit -m "feat: add blog listing page with tag filtering"
```

---

## Task 11: Portable Text Body Renderer

**Files:**
- Create: `components/BlogPostBody.tsx`

- [ ] **Step 1: Create `components/BlogPostBody.tsx`**

This is a server component that renders Portable Text with custom serializers for code (shiki), images, links, and blockquotes.

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/BlogPostBody.tsx
git commit -m "feat: add Portable Text renderer with shiki code highlighting"
```

---

## Task 12: Table of Contents Component

**Files:**
- Create: `components/TableOfContents.tsx`

- [ ] **Step 1: Create `components/TableOfContents.tsx`**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add components/TableOfContents.tsx
git commit -m "feat: add TableOfContents with active heading tracking and mobile drawer"
```

---

## Task 13: Blog Post Page

**Files:**
- Create: `app/(subpages)/blog/[slug]/page.tsx`

- [ ] **Step 1: Create `app/(subpages)/blog/[slug]/page.tsx`**

```typescript
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { BlogPostBody } from '@/components/BlogPostBody';
import { BlogCard } from '@/components/BlogCard';
import { TableOfContents } from '@/components/TableOfContents';
import { sanityClient } from '@/lib/sanity/client';
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { extractHeadings, calculateReadingTime } from '@/lib/sanity/utils';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs: string[] = await sanityClient.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityClient.fetch(postBySlugQuery, { slug });
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Manas Upadhyay`,
    description: post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.publishedAt,
      ...(post.coverImage && {
        images: [urlFor(post.coverImage).width(1200).height(630).url()],
      }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityClient.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const readingTime = calculateReadingTime(post.body);
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="py-16 md:py-24">
      {/* Cover image — full width */}
      {post.coverImage && (
        <Container>
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-10">
            <Image
              src={urlFor(post.coverImage).width(1400).height(600).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </Container>
      )}

      <Container>
        {/* Mobile TOC */}
        <TableOfContents headings={headings} />

        {/* Two-column layout */}
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              {/* Metadata */}
              <div className="mb-8">
                <p className="text-sm text-gray-medium">{date}</p>
                <p className="text-sm text-gray-medium">{readingTime} min read</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="text-xs bg-gray-100 text-gray-medium px-2 py-0.5 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* TOC */}
              <TableOfContents headings={headings} />
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0">
            {/* Post header */}
            <header className="mb-10">
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-4 lg:hidden">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-medium px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-medium">
                <span>{post.author}</span>
                <span className="lg:hidden">·</span>
                <span className="lg:hidden">{date}</span>
                <span className="lg:hidden">·</span>
                <span className="lg:hidden">{readingTime} min read</span>
              </div>
            </header>

            {/* Body */}
            <BlogPostBody body={post.body} />

            {/* Related posts */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <section className="mt-16 pt-10 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-6">Related Posts</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {post.relatedPosts.map((related: any, i: number) => (
                    <BlogCard key={related._id} post={related} index={i} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(subpages\)/blog/\[slug\]/page.tsx
git commit -m "feat: add blog post page with sidebar TOC and related posts"
```

---

## Task 14: Update Navbar with Blog Link

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Add Blog link to Navbar**

Update `components/Navbar.tsx` to add a Blog link:

```typescript
'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export function Navbar() {
    return (
        <header className="py-4">
            <Container className="flex items-center justify-between">
                <Link href={'/'}>
                    <span className="text-3xl font-bold italic tracking-tight font-sans cursor-pointer">
                        Manas
                    </span>
                </Link>
                <nav>
                    <Link
                        href="/blog"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                    >
                        Blog
                    </Link>
                </nav>
            </Container>
        </header>
    );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Blog link to navbar"
```

---

## Task 15: Final Verification

- [ ] **Step 1: Run build to check for type errors**

```bash
npm run build
```

Expected: Build should succeed with no TypeScript errors. Note: pages that fetch from Sanity will fail at build time if env vars are not set — this is expected. The code should have no type errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No lint errors.

- [ ] **Step 3: Manual smoke test**

With valid `.env.local` values:
1. `npm run dev`
2. Visit `/studio` — Sanity Studio loads, can create posts
3. Create a test post with title, cover image, body (including a code block), tags, mark as featured
4. Visit `/` — homepage shows blog section with featured post + recent posts
5. Visit `/blog` — listing page shows all posts, tag filter works
6. Click a post — post page loads with sidebar TOC, code highlighting, related posts
7. Test mobile viewport — TOC collapses to drawer, layouts stack

- [ ] **Step 4: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: address build/lint issues from blog integration"
```
