import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getBlogPost, getBlogSlugs } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-prose mx-auto px-4 py-12">
      <p className="text-sm text-neutral-500 mb-2">
        <Link href="/blog" className="text-primary font-medium hover:underline">
          ← Blog
        </Link>
      </p>
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-2 leading-tight">
        {post.title}
      </h1>
      <p className="text-sm text-neutral-400 mb-10">{post.date}</p>
      <div className="prose prose-neutral prose-lg max-w-none leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
