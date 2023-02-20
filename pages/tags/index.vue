<template>
  <div
    class="px-8 mx-auto mt-12 prose sm:px-6 md:px-4 lg:px-2 xl:px-0 xl:prose-xl lg:prose-lg md:prose-md"
  >
    <h1>Tags</h1>
    <ul>
      <li v-for="tag in tags" :key="tag.label">
        <nuxt-link :to="`/tags/${tag.label}`">
          {{ tag.label }} ({{ tag.count }})
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('blog').fetch()

    const tagMap = {}

    posts.forEach(({ slug, tags: postTags }) => {
      postTags.forEach((tag) => {
        const index = tag.toLowerCase()
        if (typeof tagMap[index] === 'undefined')
          tagMap[index] = {
            label: tag,
            count: 0,
          }
        tagMap[index].count++
      })
    })

    const tags = Object.values(tagMap).sort((a, b) => b.count - a.count)

    return {
      tags,
      posts,
    }
  },
}
</script>
