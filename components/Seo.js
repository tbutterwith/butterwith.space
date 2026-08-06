import Head from "next/head";

const siteUrl = "https://butterwith.space";

const Seo = ({
  title,
  description,
  canonicalPath,
  type = "website",
  image,
  publishedTime,
  tags = [],
  jsonLd,
}) => {
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const serializedJsonLd = jsonLd
    ? JSON.stringify(jsonLd).replace(/</g, "\\u003c")
    : null;

  return (
    <Head>
      <title key="title">{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="butterwith.space" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      {image && <meta name="twitter:image" content={image} />}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {tags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
      {serializedJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializedJsonLd }}
        />
      )}
    </Head>
  );
};

export { siteUrl };
export default Seo;
