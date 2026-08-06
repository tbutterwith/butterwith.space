const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), '_posts');
const photosDirectory = path.join(process.cwd(), '_photos');
const publicDirectory = path.join(process.cwd(), 'public');

function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: fileName.replace(/\.md$/, ''),
        date: data.date,
        title: data.title,
        description: data.description || '',
        path: `/blog/${fileName.replace(/\.md$/, '')}`,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

function getPhotos() {
  const fileNames = fs.readdirSync(photosDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(photosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: fileName.replace(/\.md$/, ''),
        date: data.date,
        path: `/photos/${fileName.replace(/\.md$/, '')}`,
      };
    });
}

function generateSitemap(posts, photos) {
  const baseUrl = 'https://butterwith.space';
  const contentPages = [...posts, ...photos].sort((a, b) => (a.date < b.date ? 1 : -1));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${contentPages
    .map(({ path: contentPath, date }) => {
      return `
  <url>
    <loc>${baseUrl}${contentPath}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), sitemap);
  console.log('sitemap.xml generated');
}

function generateRss(posts) {
  const baseUrl = 'https://butterwith.space';
  
  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'\""]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  };

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Tom Butterwith</title>
    <link>${baseUrl}</link>
    <description>Thoughts on software engineering, management, and life.</description>
    <language>en</language>
    ${posts
      .map(({ slug, title, date, description }) => {
        return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${baseUrl}/blog/${slug}</link>
      <guid>${baseUrl}/blog/${slug}</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(publicDirectory, 'rss.xml'), rss);
  console.log('rss.xml generated');
}

try {
    const posts = getPosts();
    const photos = getPhotos();
    generateSitemap(posts, photos);
    generateRss(posts);
} catch (e) {
    console.error("Failed to generate sitemap/rss", e);
    process.exit(1);
}
