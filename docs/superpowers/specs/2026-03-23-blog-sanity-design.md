# Blog Section with Sanity CMS — Design Spec

## Overview

Add a full-featured blog section to the portfolio, powered by Sanity CMS. The blog is a core section of the site — prominent in navigation, with a featured post hero and recent posts on the homepage.

## Content Requirements

- Mix of technical articles/tutorials and personal reflections
- Full-featured posts: title, body (rich text), cover image, code syntax highlighting, tags, table of contents, estimated reading time, related posts

## Sanity Schema

### Post

| Field          | Type                          | Notes                                              |
| -------------- | ----------------------------- | -------------------------------------------------- |
| `title`        | `string` (required)           | Post title                                         |
| `slug`         | `slug`                        | Auto-generated from title                          |
| `coverImage`   | `image`                       | Stored in Sanity CDN, with `alt` text field        |
| `excerpt`      | `text`                        | Short summary for cards and SEO                    |
| `body`         | Portable Text                 | Rich text with code blocks, images, links, embeds  |
| `author`       | `string`                      | Just the author name (no separate document)        |
| `publishedAt`  | `datetime`                    | Publish date                                       |
| `tags`         | `array` of `string`           | e.g. "React", "Career", "Next.js"                  |
| `featured`     | `boolean`                     | Marks post to display as homepage hero              |
| `relatedPosts` | `array` of references to Post | Manually curated related posts                     |

No separate category schema — tags cover it.

## Routing & Pages

| Route                      | Purpose                                            |
| -------------------------- | -------------------------------------------------- |
| `/blog`                    | Blog listing page (all posts, filterable by tag)   |
| `/blog/[slug]`             | Individual blog post page                          |
| `/studio/[[...tool]]`      | Embedded Sanity Studio                             |

- Blog pages use the `(subpages)` route group layout (StickyHeader + Contact + Footer)
- "Blog" added to Navbar alongside existing links

## Data Fetching Strategy

- **Static Generation (SSG) with ISR** — `revalidate: 300` (5 minutes)
- `generateStaticParams` for `/blog/[slug]` pages
- `generateMetadata` for SEO on each post page
- GROQ queries via `@sanity/client`

## Page Layouts

### Homepage Blog Section

Position: after Experience, before Contact.

**Layout: Wide Featured Banner + Grid Below**

- Full-width horizontal card for the featured post (image left, content right)
- If multiple posts are marked `featured`, use the most recently published one. If none are featured, use the most recent post.
- 2 recent posts in a grid row underneath
- "View all posts →" link at the bottom
- **Mobile:** stacks vertically — featured post on top, recent posts below

### Blog Listing Page (`/blog`)

- Header with "Blog" title and subtitle
- Tag filter bar — clickable tag pills ("All", "React", "Career", etc.)
- Grid of post cards (title, excerpt, tag, date, reading time)
- No pagination initially — load all posts

### Blog Post Page (`/blog/[slug]`)

**Layout: Sidebar TOC + Content**

- Full-width cover image at top
- Two-column layout below:
  - **Left sidebar (sticky):** Table of contents (generated from headings), post metadata (date, reading time), tags
  - **Right main column:** Post title, author, Portable Text body with custom renderers
- Related posts section at the bottom
- **Mobile:** sidebar collapses — TOC becomes a sticky top bar or expandable drawer

## Sanity Integration

### Directory Structure

```
lib/sanity/
├── client.ts          # Sanity client configuration
├── image.ts           # Image URL builder helper
└── queries.ts         # Reusable GROQ queries

sanity/
├── schemas/
│   └── post.ts        # Post schema definition
└── schema.ts          # Schema index

app/
├── studio/
│   └── [[...tool]]/
│       └── page.tsx   # Embedded Sanity Studio
├── blog/
│   ├── page.tsx       # Blog listing page
│   └── [slug]/
│       └── page.tsx   # Individual post page
└── page.tsx           # Homepage (add blog section)

components/
├── BlogSection.tsx        # Homepage featured + recent posts
├── BlogCard.tsx           # Reusable post card
├── BlogPostBody.tsx       # Portable Text renderer with custom serializers
├── TableOfContents.tsx    # Sidebar TOC component
└── TagFilter.tsx          # Tag filter bar for listing page
```

### Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` — Dataset name (e.g. "production")
- `SANITY_API_TOKEN` — API token for server-side data fetching (studio uses cookie-based auth via Sanity dashboard)

### Dependencies

- `sanity` — Sanity Studio framework
- `@sanity/client` — GROQ query client
- `@sanity/image-url` — Image CDN URL builder
- `@sanity/vision` — GROQ query playground (studio plugin)
- `@portabletext/react` — Portable Text renderer
- `shiki` — Server-side syntax highlighting for code blocks

## Portable Text Custom Serializers

- **Code blocks:** Rendered with `shiki` for syntax highlighting (server-side, no client JS cost)
- **Images:** Sanity CDN images with `next/image` optimization, or external URLs
- **Links:** External links open in new tab, internal links use Next.js `Link`
- **Blockquotes:** Styled blockquote component

## Computed Values

- **Reading time:** Calculated from Portable Text word count via a small utility function (not a library)
- **Table of contents:** Extracted from heading blocks in Portable Text at render time, passed to sidebar

## Responsive Behavior

- **Homepage blog section:** Stacks vertically on mobile
- **Blog listing grid:** 2 columns → 1 column on mobile
- **Post sidebar TOC:** Collapses to an expandable drawer on mobile
- **Cover images:** Full-width on all breakpoints
