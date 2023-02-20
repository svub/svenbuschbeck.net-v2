import { parsePost } from './parsePost'

export async function getBlogPosts($content) {
  return (await $content('blog').fetch())
    .map(parsePost)
    .sort((a, b) => b.parsedDate - a.parsedDate)
}
