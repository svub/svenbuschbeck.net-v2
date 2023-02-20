export function parsePost(post) {
  // console.log('parse post', { date: new Date(post.date), ...post })
  return { parsedDate: new Date(post.date), ...post }
}
