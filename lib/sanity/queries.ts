import { groq } from 'next-sanity';

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

export const allPostsQuery = groq`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    ${postFields}
  }
`;

export const featuredPostQuery = groq`
  *[_type == "post" && defined(publishedAt) && featured == true] | order(publishedAt desc) [0] {
    ${postFields}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post" && defined(publishedAt) && _id != $excludeId] | order(publishedAt desc) [0...2] {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body,
    "relatedPosts": relatedPosts[]->{
      ${postFields}
    }
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`;

export const allTagsQuery = groq`
  array::unique(*[_type == "post" && defined(publishedAt)].tags[])
`;
