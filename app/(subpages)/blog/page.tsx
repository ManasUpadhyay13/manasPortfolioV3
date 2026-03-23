import { Container } from '@/components/ui/Container';
import { BlogCard, type SanityPost } from '@/components/BlogCard';
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
    ? posts.filter((post: SanityPost) => post.tags?.includes(tag))
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
            {filteredPosts.map((post: SanityPost, i: number) => (
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
