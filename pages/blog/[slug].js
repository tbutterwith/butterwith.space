import React from "react";
import Head from "next/head";

const fs = require("fs");
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import matter from "gray-matter";

import "highlight.js/styles/github.css";

function BlogPostPage({ blog }) {
  const ogImage = blog.image
    ? `https://butterwith.space${blog.image}`
    : "https://butterwith.space/assets/icons/android-chrome-512x512.png";

  return (
    <>
      <Head>
        <title>{blog.title} | Tom Butterwith - butterwith.space</title>
        <meta name="description" content={blog.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://butterwith.space/blog/${blog.slug}`}
        />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://butterwith.space/blog/${blog.slug}`}
        />
        <meta property="twitter:title" content={blog.title} />
        <meta property="twitter:description" content={blog.description} />
        <meta property="twitter:image" content={ogImage} />
      </Head>
      <div className="container flex justify-center">
        <div
          className="max-w-full font-serif leading-relaxed md:max-w-prose"
          id="blog-post"
        >
          <h1 className="pb-6 font-serif text-7xl md:text-9xl">{blog.title}</h1>
          <div className="text-slate-400">{blog.tags.sort().join(", ")}</div>
          <section
            className="markdown"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></section>
          <div className="mt-5 flex justify-end  text-slate-400">
            Tom - {blog.date}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const path = `${process.cwd()}/_posts/${slug}.md`;

  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  const { data, content } = matter(rawContent);

  // 1. Image fallback if missing in frontmatter
  let image = data.image;
  if (!image) {
    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (imageMatch) {
      image = imageMatch[1];
    }
  }

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight) // highlight code block
    .use(rehypeStringify)
    .process(content); // pass content to process

  return {
    props: {
      blog: {
        ...data,
        content: result.toString(),
        description: data.description || "",
        image: image || null,
      },
    },
  };
}

export async function getStaticPaths(context) {
  const fs = require("fs");

  const path = `${process.cwd()}/_posts`;
  const files = fs.readdirSync(path, "utf-8");

  const markdownFileNames = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => fn.replace(".md", ""));

  return {
    paths: markdownFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName,
        },
      };
    }),
    fallback: false,
  };
}

export default BlogPostPage;
