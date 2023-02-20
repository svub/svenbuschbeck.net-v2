<template>
  <div
    class="flex flex-col justify-top border rounded-lg overflow-hidden shadow my-6"
  >
    <div
      class="header flex justify-center relative"
      :class="{ 'background-image': !!image }"
    >
      <nuxt-img
        v-if="!!image"
        :src="`/img/${image}`"
        class="object-cover w-full"
        sizes="sm:100vw md:50vw lg:400px"
      />
      <!-- :style="`background-image: url(${image ? `/img/${image}` : ''}`" -->
      <div class="title flex flex-row items-end justify-center">
        <h3 class="px-6">
          <nuxt-link v-if="!!link" :to="link">{{ title }}</nuxt-link>
          <template v-else>{{ title }}</template>
          <div v-if="!!subheading" class="subheading text-sm font-light mt-2">
            {{ subheading }}
          </div>
        </h3>
      </div>
    </div>
    <div class="content px-6">
      <p v-if="!!html" v-html="html"></p>
      <p v-else>
        {{ text }}
      </p>
      <p v-if="!!link">
        <nuxt-link :to="link">Read more</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Missing title!',
      required: true,
    },
    subheading: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: '',
    },
    html: {
      type: String,
      default: undefined,
    },
    link: {
      type: String,
      default: undefined,
    },
    image: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.background-image,
.background-image .title {
  height: 10em;
}
.background-image img {
  margin: 0;
}
.background-image .title {
  position: absolute;
}
.background-image .title * {
  /* color: white; */
  /* background: inherit;
  background-clip: text;
  color: transparent;
  filter: invert(1);
  text-shadow: 0 0 9px rgba(0 0 0 / 70%); */
  @apply text-white bg-sbnet;
  text-decoration: none;
}
</style>
