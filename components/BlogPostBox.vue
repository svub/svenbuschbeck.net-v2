<template>
  <Box
    :title="post.title"
    :subheading="`Posted ${post.parsedDate.toLocaleDateString()}`"
    :text="post.description"
    :link="`/blog/${post.slug}`"
    :image="post.image"
  ></Box>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({
        title: 'Missing blog post!',
      }),
      required: true,
    },
  },
}
</script>
