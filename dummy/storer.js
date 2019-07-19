// check if article exists
const articleExists = await db.Article.findOne({ link: article.link });
if (articleExists) {
  // if exists check if author exists
  if (!articleExists.author) {
    const articleAuthor = await db.Author.findOne({ name: author.name });

    const existAuthor = await db.Article.findOneAndUpdate(
      { link: articleExists.link },
      { author: articleAuthor.name }
    );
    if (existAuthor) {
      return res.status(200).json({
        message: "Author for existing article updated successfully"
      });
    }
  }
} else {
  // if doesn't exist create
  const newArticle = await db.Article.create({
    title,
    image,
    link,
    summary: content
  });

  return res.status(201).json(newArticle);
}
