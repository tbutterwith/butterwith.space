const tagToSlug = (tag) => tag.toLowerCase().replace(" ", "-");

const slugToTag = (slug) =>
  slug
    .replace("-", " ")
    .replaceAll(/\b([a-z])/g, (match) => match.toUpperCase());

const tags = { tagToSlug, slugToTag };

export { tagToSlug, slugToTag };
export default tags;
