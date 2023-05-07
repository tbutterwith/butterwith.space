import parse from "date-fns/parse";
import isAfter from "date-fns/isAfter";
import { tagToSlug } from "./tags";

const getAllBlogs = () => {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/_posts`, "utf-8");

  const blogs = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/_posts/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    });

  return blogs;
};

const sortBlogs = (blogs) => {
  const sortedBlogs = [].concat(blogs).sort((x, y) => {
    const xDate = parse(x.date, "yyyy-MM-dd", new Date());
    const yDate = parse(y.date, "yyyy-MM-dd", new Date());
    return isAfter(xDate, yDate) ? -1 : 1;
  });

  return sortedBlogs;
};

const getAllTags = () => {
  const blogs = getAllBlogs();
  const tags = new Set();

  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => tags.add(tagToSlug(tag)));
  });

  return [...tags];
};

export { getAllBlogs, sortBlogs, getAllTags };
export default { getAllBlogs, sortBlogs, getAllTags };
