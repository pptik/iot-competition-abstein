<template>
  <nav class="ui secondary pointing menu">
    <router-link to="/" class="item">
      <span v-bind:class="{primarytext:highlight1}">Vidyanusa Absensi</span>
    </router-link>
    <!-- <router-link to="#" class="item">
      <span v-bind:class="{primarytext:highlight2}">Lihat Judul</span>
    </router-link> -->
   <!--  <div class="right menu">
      <router-link to="/tentang" class="item grey-text">
        <aside>
          <span v-bind:class="{primarytext:highlight3}">Tentang
          </span>
        </aside>
      </router-link>
      <router-link to="/masuk" class="item grey-text">
        <aside>
          <span v-bind:class="{primarytext:highlight4}">Masuk</span>
        </aside>
      </router-link>
      <router-link to="/daftar" class="item grey-text">
        <aside>
          <span v-bind:class="{primarytext:highlight5}">Daftar</span>
        </aside>
      </router-link>
    </div> -->
  </nav>
</template>

<script>
  export default {
    props: {
      highlight1: {
        type: Boolean,
        required: true
      },
      /* highlight2: {
        type: Boolean,
        required: true
      }, */
      highlight3: {
        type: Boolean,
        required: true
      },
      highlight4: {
        type: Boolean,
        required: true
      },
      highlight5: {
        type: Boolean,
        required: true
      }
    },
   data (){
     return{
      //highlight:false
     }
   }
  }
</script>

<style scoped>

</style>
