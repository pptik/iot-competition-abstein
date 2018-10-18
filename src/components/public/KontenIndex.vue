<template>
  <div class="ui grid stackable">
    <div class="eight wide column white-text">
      <h1>Selamat Datang</h1>
      <p>Silahkan masukan email dan sandi untuk melanjutkan.</p>
      <form class="ui form">
        <div class="required field">
          <input type="text" placeholder="Email" autocomplete="email" v-model="email"/>
        </div>
        <div class="required field">
          <input type="password" autocomplete="password" placeholder="Sandi" v-model="sandi"/>
        </div>
        <div class="required field">
          <button type="button"
                  style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                  v-on:click.prevent="masuk" class="huge ui button button-submit">Masuk</button>
          <a href="http://vidyanusa.id/public/atur_ulang_sandi" target="_blank" class="white-text">Lupa sandi? Atur ulang disini</a>
          <!-- <router-link to="" class="white-text">Belum punya akun? Daftar disini</router-link> -->
        </div>
      </form>
    </div>
    <div  class="eight wide column" align="center">      
      <div class="ui grid stackable">
        <div class="sixteen wide column" style="margin-top:2em;">
          <img src="/src/assets/images/product-carousel-2.png" class="ui image large"/>          
        </div>        
      </div>        
    </div>
    
  </div>
</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';
  import Swal from 'sweetalert2'
  import table_export from 'tableexport'

  export default {
    name: "konten",
    data(){
      return{
        email: '',
        sandi: ''
      }
    },
    created(){
      if(this.$session.get('access_token') != null){          
          this.$router.push('/dashboard')
        }
    },
    methods: {      
      masuk:function () {    
        let vue = this
        
        Swal({
        allowOutsideClick: false,
        text: 'Mohon tunggu permintaan Anda sedang diproses...',        
        onOpen: function () {
          Swal.showLoading()
                    
        vue.$http.post(global_json.general_url+'/masuk',{
          email: vue.email,
          sandi: vue.sandi
        }).then(function (data) {          
          if(data.body.success == true){//Login berhasil
            Swal.close()
            vue.$session.set('access_token',data.body.data.access_token)
            vue.$session.set('user_id',data.body.data.id_pengguna)
            vue.$session.set('username',data.body.data.username)
            vue.$session.set('nama_lengkap',data.body.data.nama_lengkap)
            vue.$session.set('user_role',data.body.data.peran)
            vue.$session.set('id_sekolah',data.body.data.id_sekolah)
            vue.$session.set('foto_profil',data.body.data.foto_profil)
            vue.$session.set('email',vue.email)
            
            //vue.$router.push({path:'/dashboard'})
            
            if(data.body.data.peran === 2 || data.body.data.peran === 3){
              vue.$router.push({path:'/dashboard'})
            }else{              
              Swal({title:'Maaf',
                text:'Hanya akun sebagai sekolah dan siswa yang dapat melanjutkan penggunaan platform Vidyanusa Absensi ini.',
                type:'error',
                allowOutsideClick: false});
            }
                        
          }else if(data.body.success == false){                        
              Swal({title:'Maaf',
              text:data.body.data.message,
              type:'error',
              allowOutsideClick: false});        
          }
          },function(err){
            //console.log("ERR message: "+JSON.stringify(err))
            Swal({title:'Maaf',
                text:'Telah terjadi gangguan koneksi ke server. Mohon cek kembali koneksi internet Anda atau hubungi Administrator.',
                type:'error',
                allowOutsideClick: false});
          });          
        }
      })

      }
      
    }
  }




</script>

<style scoped>

</style>
