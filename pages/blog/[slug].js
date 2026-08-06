import React from "react";
import Seo, { siteUrl } from "../../components/Seo";

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
    ? `${siteUrl}${blog.image}`
    : null;
  const canonicalUrl = `${siteUrl}/blog/${blog.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.description,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      "@type": "Person",
      name: "Tom Butterwith",
      url: `${siteUrl}/about`,
      sameAs: ["https://www.linkedin.com/in/tbutterwith/"],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    ...(ogImage ? { image: ogImage } : {}),
    inLanguage: "en-GB",
  };

  return (
    <>
      <Seo
        title={`${blog.title} | Tom Butterwith - butterwith.space`}
        description={blog.description}
        canonicalPath={`/blog/${blog.slug}`}
        type="article"
        image={ogImage}
        publishedTime={blog.date}
        tags={blog.tags}
        jsonLd={articleJsonLd}
      />
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
