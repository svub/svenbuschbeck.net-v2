<template>
  <div>
    <Hero
      :heading="post.title"
      :subheading="post.subheading"
      :image="`/img/${post.image}`"
    />
    <div
      class="px-8 mx-auto mt-12 prose sm:px-6 md:px-4 lg:px-2 xl:px-0 xl:prose-xl lg:prose-lg md:prose-md"
    >
      <p>Posted {{ post.parsedDate.toLocaleDateString() }}</p>
      <nuxt-content :document="post" />
      <h3>Tags</h3>
      <ul>
        <li v-for="(tag, index) in post.tags" :key="index">
          <nuxt-link :to="`/tags/${tag}`">
            {{ tag }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBlogPost } from '@/modules/getBlogPost'

export default {
  async asyncData({ $content, params: { slug } }) {
    const post = await getBlogPost($content, slug)
    return {
      post,
    }
  },
}
</script>
