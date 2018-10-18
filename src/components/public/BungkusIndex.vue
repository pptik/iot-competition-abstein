<template>
  <section class="ui container">
    <navigasi :highlight1="true" :highlight3="false" :highlight4="false" :highlight5="false"></navigasi>
    <main style="padding: 3em 4em 3em 4em;background:linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)" class="ui segment">
        <konten-utama></konten-utama>
    </main>
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenIndex';

    export default {
        name: "index",
        data(){
          return{

          }
        },
        created () {
          document.title = 'Vidyanusa | Absensi';
          /* if(this.$session.get('user_role') != null){//Mencek apakah pengguna mengakses sebagai member
            this.$router.push({path:'/dashboard'})
          } */
        },
        components: {
          'navigasi' : Navigasi,
          'konten-utama' : KontenUtama
        }
    }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
