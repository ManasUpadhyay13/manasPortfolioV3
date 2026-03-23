import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { BlogCard, type SanityPost } from '@/components/BlogCard';
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
            {recentPosts.map((post: SanityPost, i: number) => (
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
