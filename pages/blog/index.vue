<template>
  <div>
    <div
      class="px-8 mx-auto mt-12 prose sm:px-6 md:px-4 lg:px-2 xl:px-0 xl:prose-xl lg:prose-lg md:prose-md"
    >
      <h1>Latest Stories</h1>
      <BlogPostList :posts="posts"></BlogPostList>
    </div>
  </div>
</template>

<script>
import { getBlogPosts } from '@/modules/getBlogPosts'

export default {
  async asyncData({ $content }) {
    const posts = await getBlogPosts($content)
    return {
      posts,
    }
  },
}
</script>
