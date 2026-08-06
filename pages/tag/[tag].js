import React from "react";
import Seo from "../../components/Seo";

import { tagToSlug } from "../../util/tags";
import { getAllBlogs, sortBlogs, getAllTags } from "../../util/blogs";
import BlogsList from "../../components/Blog/BlogsList";

function TagsPage({ tag, blogs }) {
  return (
    <>
      <Seo
        title={`${tag} articles | Tom Butterwith - butterwith.space`}
        description={`Articles by Tom Butterwith tagged with ${tag}.`}
        canonicalPath={`/tag/${tagToSlug(tag)}`}
      />
      <h1 className="font-serif text-xl">Articles tagged with {tag}</h1>
      <BlogsList blogs={blogs} className="py-4" />
    </>
  );
}

export async function getStaticProps(context) {
  const allBlogs = getAllBlogs();
  const tag = allBlogs
    .flatMap((blog) => blog.tags)
    .find((value) => tagToSlug(value) === context.params.tag);

  if (!tag) {
    return { notFound: true };
  }

  const blogs = sortBlogs(allBlogs).filter((blog) => blog.tags.includes(tag));

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
