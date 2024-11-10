import { fetchBySlug, fetchPageBlocks, fetchPages, notion } from "@/utils/notion";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import { notFound } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";

function isMultiSelectProperty(
  property: any
): property is { type: "multi_select"; multi_select: Array<{ name: string }> } {
  return property?.type === "multi_select";
}

const BlogDetailPage = async ({ params }: { params: { slug: string } }) => {
  const post = await fetchBySlug(params.slug);
  if (!post) {
    return notFound();
  }

  const blocks = await fetchPageBlocks(post.id);

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}));

  const html = await renderer.render(...blocks);

  const posts = await fetchPages();

  const filteredPosts = posts.results.filter((post: any) =>
    post.properties.slug.rich_text[0]?.plain_text === params.slug
  );

  const currentTags = isMultiSelectProperty(post.properties.Tags)
    ? post.properties.Tags.multi_select.map((tag: { name: string }) => tag.name)
    : [];

  const relatedPosts = posts.results
    .filter((relatedPost: any) => {
      if (relatedPost.properties.slug.rich_text[0]?.plain_text === params.slug) return false;
      if (!isMultiSelectProperty(relatedPost.properties.Tags)) return false;

      const relatedTags = relatedPost.properties.Tags.multi_select.map((tag: { name: string }) => tag.name);
      return relatedTags.some((tag: string) => currentTags.includes(tag));
    })
    .sort((a: any, b: any) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime())
    .slice(0, 3);

  console.log(post);

  const coverUrl =
    post.cover?.type === 'external'
      ? post.cover.external.url
      : post.cover?.type === 'file'
      ? post.cover.file.url
      : null;

  return (
    <div className="relative z-10 bg-neutral-50 p-3 pt-10 dark:bg-neutral-950/80 md:px-5 md:pb-10 lg:px-10 flex flex-col lg:flex-row gap-10">
      <main>
        <a
          href="/blog"
          className="mb-4 flex items-center text-sm font-semibold text-black dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </a>

        {filteredPosts.map((post: any) => {
          const formattedDate = format(new Date(post.created_time), "MMMM d, yyyy");
          const timeAgo = formatDistanceToNow(new Date(post.created_time), { addSuffix: true });

          return (
            <div key={post.id}>
              <h1 className="max-w-[650px] text-3xl font-bold tracking-tighter md:text-4xl xl:text-5xl">
                {post.properties.Name.title[0].plain_text}
              </h1>
              <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
                <p className="text-sm opacity-60">
                  {formattedDate} ({timeAgo})
                </p>
              </div>
              {coverUrl && (
                <img
                  src={coverUrl}
                  alt="Post cover"
                  className="mb-8 max-w-[650px] rounded-lg shadow-lg"
                />
              )}
              <article
                className="prose max-w-[650px] dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: html }}
              ></article>
            </div>
          );
        })}
      </main>

      <div className="w-full lg:w-1/4 p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Related Articles
        </h1>

        {relatedPosts.length > 0 ? (
          relatedPosts.map((relatedPost: any) => (
            <div key={relatedPost.id} className="mb-4">
              <Link
                href={`/blog/${relatedPost.properties.slug.rich_text[0]?.plain_text}`}
                className="block bg-white/50 px-3 py-5 backdrop-blur dark:bg-black/80 md:px-5 rounded-lg"
              >
                <h3 className="text-lg md:text-xl">
                  {relatedPost.properties.Name.title[0]?.plain_text}
                </h3>
                <p className="text-sm opacity-60 dark:text-neutral-400">
                  {format(new Date(relatedPost.created_time), "MMMM d, yyyy")}
                </p>
                <div className="flex items-center text-sm text-gray-400 mt-2">
                  <p>
                    {(relatedPost.properties.Tags as { type: "multi_select"; multi_select: Array<{ name: string }> }).multi_select[0]?.name}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No related articles available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;
