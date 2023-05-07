import React from "react";
import Head from "next/head";

import { slugToTag } from "../../util/tags";
import { getAllBlogs, sortBlogs, getAllTags } from "../../util/blogs";
import BlogsList from "../../components/Blog/BlogsList";

function TagsPage({ tag, blogs }) {
  return (
    <>
      <Head>
        <title>{tag} | Tom Butterwith - butterwith.space</title>
      </Head>
      <h1 className="font-serif text-xl">Articles tagged with {tag}</h1>
      <BlogsList blogs={blogs} className="py-4" />
    </>
  );
}

export async function getStaticProps(context) {
  const tag = slugToTag(context.params.tag);
  const blogs = sortBlogs(getAllBlogs()).filter((blog) =>
    blog.tags.includes(tag)
  );

  return { props: { tag, blogs } };
}

export async function getStaticPaths(context) {
  const tags = getAllTags();

  return {
    paths: [...tags].map((tag) => ({ params: { tag } })),
    fallback: false,
  };
}

export default TagsPage;
