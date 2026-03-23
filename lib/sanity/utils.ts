import type { PortableTextBlock } from '@portabletext/types';

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
