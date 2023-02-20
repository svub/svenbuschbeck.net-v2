<template>
  <div>
    <Hero
      :heading="page.title"
      :subheading="page.subheading"
      :image="`/img/${page.image}`"
    />
    <div
      class="px-8 mx-auto mt-12 prose sm:px-6 md:px-4 lg:px-2 xl:px-0 xl:prose-xl lg:prose-lg md:prose-md"
    >
      <nuxt-content :document="page" />
      <p>
        This page was last updated {{ page.parsedDate.toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params: { slug } }) {
    const page = await $content(slug).fetch()
    page.parsedDate = new Date(page.updatedAt)
    return {
      page,
    }
  },
}
</script>
