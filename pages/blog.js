import Link from "next/link";
import { tagToSlug } from "../util/tags";
import { getAllBlogs, sortBlogs } from "../util/blogs";
import BlogsList from "../components/Blog/BlogsList";

const BlogPage = ({ blogs }) => {
  const tagsDict = {};

  const thoughts = blogs.filter((blog) => blog.tags.includes("Thoughts"));
  const articles = blogs.filter((blog) => !blog.tags.includes("Thoughts"));

  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      if (tagsDict[tag] != undefined) {
        tagsDict[tag] = tagsDict[tag] + 1;
      } else {
        tagsDict[tag] = 1;
      }
    });
  });

  const tags = Object.entries(tagsDict).map(([tag, count]) => [tag, count]);
  tags.sort(([tag1, count1], [tag2, count2]) => {
    // Descending order by count
    if (count1 > count2) return -1;

    // Alphabetised if matching
    if (count1 === count2) return tag1 > tag2 ? 1 : -1;

    return 1;
  });

  return (
    <>
      <h1 className="font-serif text-3xl">Writing</h1>
      <div className="flex flex-row flex-wrap pt-4">
        <div className="basis-3/4">
          <h2 className="font-serif text-xl">Articles</h2>
          <BlogsList blogs={articles} className="py-4" />
          <h2 className="font-serif text-xl">Thoughts</h2>
          <BlogsList blogs={thoughts} className="py-4" />
        </div>
        <div className="md:basis-1/4">
          <h2 className="py-4 font-serif text-xl">Tags</h2>
          {tags.map(([tag, val], id) => (
            <>
              <Link href={`/tag/${tagToSlug(tag)}`} key={id}>
                {tag} ({val})
              </Link>
              <br />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;

export async function getStaticProps() {
  const blogs = getAllBlogs();
  const sortedBlogs = sortBlogs(blogs);

  return {
    props: { blogs: sortedBlogs },
  };
}
