<template>
  <section class="ui container">
     <div class="ui stackable menu" style="margin-top:1em;">
      <div class="item">    
        <router-link  to="/dashboard">              
          <span class="grey-text">
            Dashboard
          </span>
        </router-link>
      </div>    
      <div class="item" style="background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)">
        <router-link  to="/kelas">        
            <span class="white-text">Pengolahan Data Absensi</span>
          </router-link>                    
      </div>
      <div class="right menu">         
          <a class="item" href="#" v-on:click="keluar()">        
            <span class="grey-text">Keluar</span>
          </a>                                     
      </div>
    </div>
    <section>
      <div class="ui equal width grid">        
        <div class="twelve wide column">
          <konten-utama></konten-utama>
        </div>        
        <div class="four wide column">
          <div class="ui card">
            <div class="image"><img v-bind:src="$session.get('foto_profil')"/></div>
            <div class="content"><a class="header">{{$session.get('username')}}</a>
              <div class="meta"><span class="date">{{$session.get('nama_lengkap')}}</span></div>              
            </div>            
          </div>
        </div>
      </div>
    </section>
    <br/>
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenKelas';

    import global_json from '../../../assets/js/globalVariable.json';

    export default {
        name: "index",
        created () {

          /* if(this.$session.get('user_role') != 4){//Peran mahasiswa
            alert("Anda tidak diizinkan untuk mengakses halaman yang dituju")
            this.$router.push({path:'/'})
          } */

          //Cek berlakunya session
          /* this.$http.post(global_json.general_url+'/cek_session',{
            access_token: this.$session.get('access_token')
          }).then(function (data) {
            if(data.body.success == true){
              if(data.body.data.data.status == 0){//Session tidak berlaku
                this.$session.destroy()
                alert("Session anda tidak berlaku atau sudah expired. Silahkan masuk kembali.")
                this.$router.push('/')
              }
            }else if(data.body.success == false){
              console.log(data.body.data.message)
            }
          }); */

          //Ambil profil pengguna
          /* this.$http.post(global_json.general_url+'/profil',{
            username: this.$session.get('username'),
            access_token: this.$session.get('access_token')
          }).then(function (data) {
            if(data.body.success == true){
              this.username = data.body.data.data[0].profil.username;
              this.namaLengkap = data.body.data.data[0].profil.nama_lengkap;
              this.fotoProfil = data.body.data.data[0].profil.foto_profil;
              this.bio = data.body.data.data[0].profil.bio;
            }else if(data.body.success == false){
              console.log(data.body.data.message)
            }
          }); */

          document.title = 'Vidyanusa Absensi | Per kelas';
        },
        data(){
          return{            
          }
        },
        methods: {
          keluar:function () {
            this.$session.destroy()
            this.$router.push('/')
          }
        },
        components: {
          //'navigasi' : Navigasi,
          'konten-utama' : KontenUtama
        }
    }
</script>

<style>
  @import '../../../assets/css/custom.css';

</style>
