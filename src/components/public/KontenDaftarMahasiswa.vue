<template>
  <div class="ui grid stackable">
    <div class="eight wide column grey-text">
      <h2 class="primary-color">Form Registrasi Pengguna</h2><br/>
      <form class="ui form">
        <div class="field">
          <div>Username</div>
          <input type="text" name="username" placeholder="Buat username Anda" v-model="username"/>
        </div>
        <div class="field">
          <div>Sandi</div>
          <input type="password" name="sandi" placeholder="Sandi Anda untuk login" v-model="sandi"/>
        </div>                
        <div class="field">
          <div>Nama Lengkap</div>
          <input type="text" name="nama_lengkap" placeholder="Tulis Nama Lengkap Anda" v-model="nama_lengkap"/>
        </div>
        <button v-on:click.prevent="daftarSebagaiMahasiswa" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);" class="ui button">Kirim</button>
      </form>
    </div>
    <div class="eight wide column grey-text" align="center">
      <div class="ui grid stackable">
        <div class="eight wide column">
          <img src="/src/assets/images/itb.png" class="ui image medium"/>          
        </div>
        <div class="eight wide column">
          <img src="/src/assets/images/upi.png" class="ui image medium"/>          
        </div>
      </div>   
    </div>
  </div>

</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data(){
      return{
        email: '',
        username: '',
        sandi: '',
        select_universitas: '',        
        select_jenjang: '',
        select_prodi: '',
        nim: '',
        nama_lengkap: '',
        daftar_universitas: [],
        daftar_jenjang: [],
        daftar_prodi: []
      }
    },
    created(){
      this.daftarUniversitas()
    },
    methods: {
      daftarSebagaiMahasiswa:function () {
        this.$http.post(global_json.general_url+'/daftar/proses/mahasiswa',{
          email: this.email,
          username: this.username,
          sandi: this.sandi,
          institusi: this.select_universitas,
          jenjang: this.select_jenjang,
          prodi: this.select_prodi,
          nim: this.nim
        }).then(function (data) {
          if(data.body.success == true){
            this.$session.set('access_token',data.body.data.data.access_token)
            this.$session.set('user_id',data.body.data.data.user_id)
            this.$session.set('user_role',data.body.data.data.user_role)
            this.$session.set('username',data.body.data.data.username)

            this.$router.push({path:'/dashboard'})
          }else if(data.body.success == false){
            var pesan = '';
            //console.log('Kembalian: '+data.body.data.length)
            for(let a=0;a<data.body.data.length;a++){
              pesan += JSON.stringify(data.body.data[a].msg)+', ';
            }
            alert(pesan);
          }
        });
      },
      daftarUniversitas: function(){
        this.$http.post(global_json.general_url+ '/institusi/daftar/no_token', {          
        }).then(function (data) {
          if (data.body.success == true) {            
            data.body.data.data.forEach(element => {
              this.daftar_universitas.push(element)
            });            
          } else if (data.body.success == false) {
            console.error('M: Gagal mengembalikan daftar universitas yang terdaftar dalam platform TADJ')
          }
        });
      },
      daftarJenjang: function(){
        this.$http.post(global_json.general_url + '/jenjang/daftar/no_token', {          
          universitas: this.select_universitas
        }).then(function (data) {
          if (data.body.success == true) {
            this.daftar_jenjang.length = 0            
            for(let counter=0;counter<data.body.data.data[0].akademik.jenjang.length;counter++){
               console.log("JNJNG ke["+counter+"]: "+JSON.stringify(data.body.data.data[0].akademik.jenjang[counter].nama))
               this.daftar_jenjang.push(data.body.data.data[0].akademik.jenjang[counter]) 
            }

          } else if (data.body.success == false) {
            console.log('M: Gagal mengembalikan daftar jenjang pada universitas dalam platform TADJ')
          }
        });
      },
      daftarProdi: function(){
        this.$http.post(global_json.general_url + '/jenjang/prodi/no_token', {          
          jenjang: this.select_jenjang
        }).then(function (data) {
          if (data.body.success == true) {
            this.daftar_prodi.length = 0            
            for(let counter=0;counter<data.body.data.data[0].prodi.length;counter++){
               this.daftar_prodi.push(data.body.data.data[0].prodi[counter]) 
            }                      
          } else if (data.body.success == false) {
            console.log('M: Gagal mengembalikan daftar prodi pada platform TADJ')
          }
        });
      }
    }
  }




</script>

<style scoped>

</style>
