<template>
  <div class="ui grid stackable">
    <div class="eight wide column grey-text" align="center">
      <img src="/src/assets/images/carousel-2.png" class="ui image medium"/>
    </div>
    <div class="eight wide column grey-text">
      <h2 class="primary-color">Daftar sebagai Dosen</h2><br/>
      <form method="post" action="/public/daftar/dosen" class="ui form">        
        <div class="field">
        <label>Institusi Pendidikan</label>
          <select v-model="select_universitas" class="ui dropdown">
            <option>Pilih Institusi Pendidikan</option>
            <option v-for="universitas in daftar_universitas" :value="universitas._id">{{universitas.profil.nama_lengkap}}</option>
          </select>
        </div>
        <div class="field">
          <button v-on:click.prevent="daftarSebagaiDosen" type="submit" style="color: white; background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);" class="ui button">Kirim</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    created(){
      this.daftarUniversitas()
    },
    data(){
      return{
        email: '',
        username: '',
        sandi: '',
        select_universitas: '',                
        daftar_universitas: []        
      }
    },
    methods:{
      daftarSebagaiDosen:function () {
        this.$http.post(global_json.general_url+'/daftar/proses/dosen',{
          email: this.email,
          username: this.username,
          sandi: this.sandi,
          institusi: this.select_universitas
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
      }
    }
  }




</script>

<style scoped>

</style>
