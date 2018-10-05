<template>
  <div>
    <ul>
      <li v-for="blogCategory in blogCategories" v-on:click="blogCategory.show = !blogCategory.show">
        <h3>{{blogCategory.name}}</h3>
        <h4 v-show="blogCategory.show">{{blogCategory.description}}</h4>
      </li>
    </ul>
    <button v-on:click="deleteBlogCategory">Hapus kategori blog</button>
  </div>
</template>

<script>
  export default {
    props: {
      blogCategories: {
        type: Array,
        required: true
      }
    },
    data () {
      return {

      }
    },
    methods: {
      deleteBlogCategory: function () {
        this.blogCategories.pop();
      }
    }
  }
</script>

<style scoped>

</style>
