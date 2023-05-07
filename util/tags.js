const tagToSlug = (tag) => tag.toLowerCase().replace(" ", "-");

const slugToTag = (slug) =>
  slug
    .replace("-", " ")
    .replaceAll(/\b([a-z])/g, (match) => match.toUpperCase());

export { tagToSlug, slugToTag };
export default { tagToSlug, slugToTag };
