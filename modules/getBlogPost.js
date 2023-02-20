import { parsePost } from './parsePost'

export async function getBlogPost($content, slug) {
  return parsePost(await $content('blog', slug).fetch())
}
