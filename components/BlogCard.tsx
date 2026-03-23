'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
  tags?: string[];
  publishedAt: string;
  readingTime?: number;
}

interface BlogCardProps {
  post: SanityPost;
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
                unoptimized
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
              unoptimized
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
