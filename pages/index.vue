<template>
  <div>
    <Hero
      :heading="page.heading"
      :subheading="page.subheading"
      :image="page.image"
    />
    <div
      class="px-8 mx-auto mt-12 prose sm:px-6 md:px-4 lg:px-2 xl:px-0 xl:prose-xl lg:prose-lg md:prose-md"
    >
      <h2>
        {{ page.title }}
      </h2>
      <div class="flex items-center space-x-6">
        <img
          class="block mx-auto h-24 w-24 rounded-full sm:mx-0 sm:shrink-0"
          :src="page.intro.image"
        />
        <p>
          {{ page.intro.text }}
        </p>
      </div>
      <nuxt-content :document="page" />
      <h3>Skills</h3>
      <div class="lg:grid lg:grid-cols-2 lg:gap-8">
        <Box
          v-for="(skill, index) in page.skills"
          :key="index"
          :title="skill.title"
          :html="skill.text"
          :image="skill.image"
        ></Box>
      </div>
      <h2>Latest stories</h2>
      <BlogPostList :posts="posts"></BlogPostList>
      <p class="text-center">
        <nuxt-link
          to="/blog"
          class="inline-flex items-center px-6 py-3 text-base font-medium leading-6 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md text-sbnet hover:text-orange-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
        >
          Read more
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { getBlogPosts } from '@/modules/getBlogPosts'

export default {
  async asyncData({ $content }) {
    const page = await $content('index').fetch()
    const posts = (await getBlogPosts($content)).slice(0, 10)

    return {
      page,
      posts,
    }
  },
}
</script>
