const { faker } = require("@faker-js/faker");

/**
 * Capitalizes the first letter of each word in 'str'
 * @param { string } str
 */
const capitalizeEachWord = (str) => {
  const words = str.split(" ");
  return words
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
};

/** Generate dummy entries for Article content-type */
async function seedArticleCollection() {
  const numberOfArticlesToCreate = 100;

  for (let i = 0; i < numberOfArticlesToCreate; i++) {
    // Create slug based on title
    let title = faker.lorem.words(5);
    const slug = encodeURIComponent(title.split(" ").join("-"));
    // Capitalize each word in title
    title = capitalizeEachWord(title);

    // Generate article content
    const paragraphCount = 7;
    const sentencesPerParagraph = 10;
    const content = Array.from({ length: paragraphCount }, () =>
      faker.lorem.paragraph(sentencesPerParagraph)
    ).join("\n\n");

    // Create article with dummy data
    const article = {
      title,
      slug,
      description: faker.lorem.paragraph(),
      content,
      // Automatically publish on creation
      publishedAt: new Date().toISOString(),

      // Optional fields excluded: splash, linkToOriginal
    };

    await strapi.entityService.create("api::article.article", {
      data: article,
    });

    console.log("Article: ", article);
  }

  console.log(`Added ${numberOfArticlesToCreate} records`);
}

module.exports = { seedArticleCollection };
