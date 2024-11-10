import type { Metadata } from 'next';
import PageTitle from '../components/PageTitle';
import BlogPostItem from './components/BlogPostItem';
import { fetchPages } from '@/utils/notion';

export const metadata: Metadata = {
  title: 'Amixtra | Blog',
  openGraph: {
    title: 'Amixtra | Blog',
    url: '/blog',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const posts: any = await fetchPages();

  const amixtraPosts = posts.results.filter((post: any) =>
    post.properties.Tags.multi_select.some((tag: any) => tag.name === "Amixtra")
  );
  
  const algebrainPosts = posts.results.filter((post: any) =>
    post.properties.Tags.multi_select.some((tag: any) => tag.name === "Algebrain")
  );

  const alphraPosts = posts.results.filter((post: any) =>
    post.properties.Tags.multi_select.some((tag: any) => tag.name === "Alphra")
  );

  return (
    <>
      <PageTitle title="Blogs" />

      {amixtraPosts.length > 0 && (
        <>
          <h1 className="text-6xl mb-6">For Amixtra</h1>
          <ul className="grid grid-cols-1 gap-3 md:mb-5">
            {amixtraPosts.map((post: any) => (
              <li key={post.id}>
                <BlogPostItem post={post} />
              </li>
            ))}
          </ul>
        </>
      )}

      {algebrainPosts.length > 0 && (
        <>
          <h1 className="text-6xl mb-6">For Algebrain</h1>
          <ul className="grid grid-cols-1 gap-3 md:mb-5">
            {algebrainPosts.map((post: any) => (
              <li key={post.id}>
                <BlogPostItem post={post} />
              </li>
            ))}
          </ul>
        </>
      )}

      {alphraPosts.length > 0 && (
        <>
          <h1 className="text-6xl mb-6">For Alphra</h1>
          <ul className="grid grid-cols-1 gap-3 md:mb-5">
            {alphraPosts.map((post: any) => (
              <li key={post.id}>
                <BlogPostItem post={post} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
