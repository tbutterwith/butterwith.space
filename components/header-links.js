import Link from "next/link";
const HeaderLinks = () => (
  <div className="flex flex-wrap justify-between pb-10">
    <Link href={"/"} className="">
      🚀 butterwith.space
    </Link>
    <div className="inline-flex justify-end space-x-5">
      <Link href={"/about"}>About</Link>
      <Link href={"/blog"}>Blog</Link>
      <Link href="/rss.xml" target="_blank">
        RSS
      </Link>
      <a href="https://www.linkedin.com/in/tbutterwith/" target="_blank">
        LinkedIn
      </a>
    </div>
  </div>
);

export default HeaderLinks;
