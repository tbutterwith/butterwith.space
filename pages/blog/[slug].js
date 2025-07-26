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
  return (
    <>
      <Head>
        <title>{blog.title} | Tom Butterwith - butterwith.space</title>
      </Head>
      <div className="container flex justify-center">
        <div className="max-w-full font-serif leading-relaxed md:max-w-prose" id="blog-post">
          <h1 className="font-serif text-7xl md:text-9xl pb-6">{blog.title}</h1>
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
