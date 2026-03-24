import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pet care guides",
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-neutral-900 mb-2">Pet care guides</h1>
      <p className="text-neutral-600 mb-10">Editorial, local, and blunt — no generic SEO filler.</p>
      <ul className="space-y-4">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <h2 className="font-display text-xl font-semibold text-neutral-900 group-hover:text-primary">
                {post.title}
              </h2>
              <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{post.description}</p>
              <p className="text-xs text-neutral-400 mt-3">{post.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
