import React from "react";
import Link from "next/link";
import { getAllBlogs, sortBlogs } from "../util/blogs";
import Header from "../components/Homepage/blog-header";

import SectionHeading from "../components/Homepage/section-heading";
import BlogsList from "../components/Blog/BlogsList";

function Homepage({ blogs }) {
  return (
    <>
      <Header />
      <SectionHeading>Apps</SectionHeading>
      <ol>
        <li className="px-5 py-1">
          <Link href="/word-wheel">Word Wheel</Link>
        </li>
        <li className="px-5 py-1">
          <a href="https://github.com/tbutterwith/Tomodoro" target="_blank">
            Tomodoro: a Pomodoro timer for mac
          </a>
        </li>
        <li className="px-5 py-1">
          <a href="https://github.com/tbutterwith/bosun-vscode" target="_blank">
            Bosun VS Code Plugin
          </a>
        </li>
        <li className="px-5 py-1">
          <a
            href="https://github.com/tbutterwith/pyjamas-theme"
            target="_blank"
          >
            Pyjamas VS Code Theme
          </a>
        </li>
        <li className="px-5 py-1">
          <a
            href="https://github.com/tbutterwith/react-components"
            target="_blank"
          >
            React Components Library
          </a>
        </li>
      </ol>
      <SectionHeading>Writing</SectionHeading>
      <BlogsList blogs={blogs} />
    </>
  );
}

export default Homepage;

// This function gets called at build time on server-side.
export async function getStaticProps() {
  const blogs = getAllBlogs();
  const sortedBlogs = sortBlogs(blogs);

  return {
    props: { blogs: sortedBlogs },
  };
}
