import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { BlogPostBody } from '@/components/BlogPostBody';
import { BlogCard, type SanityPost } from '@/components/BlogCard';
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
              unoptimized
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
                  {post.relatedPosts.map((related: SanityPost, i: number) => (
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
