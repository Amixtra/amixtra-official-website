'use client'

import type { IPost } from '@/types';
import React from 'react';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';

const BlogPostItem: React.FC<{ post: any }> = ({ post }) => {
  const createdDate = new Date(post.created_time);
  const formattedDate = format(createdDate, "MMMM d, yyyy");
  const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });

  return (
    <Link
      href={`/blog/${post.properties.slug.rich_text[0]?.plain_text ?? ''}`}
      className="block bg-white/50 px-3 py-5 backdrop-blur dark:bg-black/80 md:px-5"
    >
      <h3 className="text-lg md:text-xl">
        {post.properties.Name.title[0]?.plain_text ?? 'Untitled'}
      </h3>
      <p className="text-sm opacity-60 dark:text-neutral-400">
        {formattedDate} ({timeAgo})
      </p>
    </Link>
  );
};

export default BlogPostItem;
