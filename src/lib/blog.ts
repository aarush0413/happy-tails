import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { BLOG_POSTS } from "./blog-posts";

const blogDir = path.join(process.cwd(), "content/blog");

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getBlogPost(slug: string): {
  content: string;
  title: string;
  description: string;
  date: string;
} | null {
  const file = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    content,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
  };
}
