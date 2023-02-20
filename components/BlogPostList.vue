<template>
  <div class="lg:grid lg:grid-cols-2 lg:gap-8">
    <BlogPostBox
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
    ></BlogPostBox>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => [
        {
          title: 'Missing blog posts!',
        },
      ],
      required: true,
    },
  },
}
</script>
