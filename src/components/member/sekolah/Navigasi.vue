<template>  
  <div class="ui stackable menu" style="margin-top:1em;">
  <div class="item" style="background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)">    
    <router-link  to="/dashboard">              
      <span class="white-text">
        Dashboard
      </span>
    </router-link>
  </div>    
  <div class="item">
    <router-link  to="/kelas">        
        <span class="grey-text">Rekapitulasi &amp; Visualisasi Data Absensi</span>
      </router-link>                    
  </div>
  <div class="right menu">         
      <a class="item" href="#" v-on:click="keluar()">        
        <span class="grey-text">Keluar</span>
      </a>                                     
  </div>
</div>
</template>

<script>
  export default {
    props: {
      
    },
    methods: {
      keluar:function () {
        this.$session.destroy()
        this.$router.push('/')
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
