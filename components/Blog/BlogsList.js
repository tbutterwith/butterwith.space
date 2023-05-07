import Link from "next/link";

import { tagToSlug } from "../../util/tags";

const isLastElement = (id, array) => id < array.length - 1;

const BlogsList = ({ blogs, className }) => (
  <ol className={className}>
    {blogs.map((blog) => {
      return (
        <>
          <li key={blog.id} className="py-1">
            <Link
              href={`/blog/${blog.slug}`}
              className="sm:max-md:flex sm:max-md:flex-col"
            >
              {blog.title}
              <div className="text-slate-400 md:inline md:pl-5">
                {blog.date}
              </div>
            </Link>
            <div className="text-sm text-slate-400">
              {blog.tags.sort().map((tag, id) => (
                <Link href={`/tag/${tagToSlug(tag)}`} key={id}>
                  {tag}
                  {isLastElement(id, blog.tags) ? ", " : ""}
                </Link>
              ))}
            </div>
          </li>
        </>
      );
    })}
  </ol>
);

export default BlogsList;
