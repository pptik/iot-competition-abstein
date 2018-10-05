<template>
  <section class="ui container">
    <navigasi :highlight1="false" :highlight2="true" :highlight3="false" :highlight4="false" :highlight5="false"></navigasi>
    <section>
      <div class="ui equal width grid">
        <div class="column">
          <div class="ui segment" v-if="judul_ta != null">
            <div style="padding:1em;" class="ui middle aligned divided list grey-text">
              <span><i class="user outline icon"></i> Anggota Kelompok TA</span>
              <ul>
                <li v-for="anggota in anggota_kelompok">{{anggota.nim}} - {{anggota.username}} - {{anggota.email}}</li>                                
              </ul>
            </div>
          </div>
          <div class="ui segment" v-if="judul_ta != null">
            <div style="padding:1em 1em 0.5em 1em;" class="ui middle aligned divided list grey-text">
              <span><i class="user outline icon"></i> Dosen Pengusul TA</span>
              <ul>
                <li v-for="anggota in dosen_pengusul">{{anggota.nim}} - {{anggota.username}} - {{anggota.email}}</li>                                
              </ul>
            </div>
            <div style="padding:0.5em 1em 1em 1em;" class="ui middle aligned divided list grey-text">
              <span><i class="user outline icon"></i> Dosen Pembimbing TA</span>
              <ul>
                <li v-for="anggota in dosen_pembimbing">{{anggota.nim}} - {{anggota.username}} - {{anggota.email}}</li>                                
              </ul>
            </div>
          </div>
          
          <div class="ui segment" v-if="judul_ta == null">
            <div class="ui middle aligned divided list">              
              <div style="padding:1em;" class="item">
                <div class="content"><a href="#" class="grey-text"><i class="talk outline icon"></i>Forum</a></div>
              </div>             
            </div>
          </div>

        </div>
        <div class="eight wide column">
          <konten-utama></konten-utama>
        </div>
        <div class="column">
          <div class="ui card">
            <div class="image"><img v-bind:src="fotoProfil"/></div>
            <div class="content"><a class="header">{{username}}</a>
              <div class="meta"><span class="date">{{namaLengkap}}</span></div>
              <div class="description">{{bio}}</div>
            </div>
            <div class="extra content">
              <router-link to="/pengaturan">
                <i class="setting icon"></i>Pengaturan
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hak-cipta></hak-cipta>
  </section>
</template>

<script>
    import '../../../assets/js/slick.min.js'
    import Navigasi from './Navigasi';
    import KontenUtama from './KontenKelompokTADetail';

    import global_json from '../../../assets/js/globalVariable.json';

    export default {
        name: "index",
        data(){
          return{
            username: '',
            namaLengkap: '',
            fotoProfil: '',
            bio: '',
            no_kelompok: null,
            kelompok: null,
            anggota_kelompok: [],
            dosen_pembimbing: [],
            dosen_pengusul: [],
            judul_ta: null,
            universitas: null,
            bimbingan: [],
            ta: []
          }
        },
        created () {
          
          if(this.$session.get('user_role') != 4 && this.$session.get('user_role') != 3){//Bukan peran mahasiswa atau dosen
            alert("Anda tidak diizinkan untuk mengakses halaman yang dituju")
            this.$router.push({path:'/'})
          }

          //Cek berlakunya session
          this.$http.post(global_json.general_url+'/cek_session',{
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
          });

          //Ambil profil pengguna
          this.$http.post(global_json.general_url+'/profil',{
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
          });

          document.title = 'TADJ | Kelompok Tugas Akhir';

          this.ambil_detail_kelompok()
        },        
        components: {
          'navigasi' : Navigasi,
          'konten-utama' : KontenUtama
        },
        methods:{
          ambil_detail_kelompok: function () {
            console.log("Id kelompok d bungkuns detail:"+this.$route.params.kelompok)
            this.$http.post(global_json.general_url + '/mahasiswa/kelompok/detail', {
              access_token: this.$session.get('access_token'),
              kelompok: this.$route.params.kelompok
            }).then(function (data) {
              if (data.body.success) {
                this.kelompok = this.$route.params.kelompok
                this.no_kelompok = data.body.data.detail_kelompok[0].no_kelompok
                this.judul_ta = data.body.data.detail_kelompok[0].judul_ta
                this.universitas = data.body.data.detail_kelompok[0].universitas
                //ANGGOTA TA
                for(let counter=0;counter<data.body.data.detail_kelompok[0].anggota.length;counter++){
                  this.anggota_kelompok.push({username: data.body.data.detail_kelompok[0].anggota[counter].profil.username,
                  email: data.body.data.detail_kelompok[0].anggota[counter].email,
                  nim: data.body.data.detail_kelompok[0].anggota[counter].akademik.universitas_prodi[0].nim_nip})
                }  

                if(data.body.data.detail_kelompok[0].judul_ta != null){
                  //DOSEN PENGUSUL TA
                  for(let counter=0;counter<data.body.data.detail_kelompok[0].judul_ta.dosen_pengusul.length;counter++){
                    this.dosen_pengusul.push({username: data.body.data.detail_kelompok[0].judul_ta.dosen_pengusul[counter].profil.username,
                    email: data.body.data.detail_kelompok[0].judul_ta.dosen_pengusul[counter].email,
                    nim: data.body.data.detail_kelompok[0].judul_ta.dosen_pengusul[counter].akademik.universitas_prodi[0].nim_nip})
                  } 
                  //DOSEN PEMBIMBING TA
                  //console.log("BNYK DOSPEM: "+data.body.data.detail_kelompok[0].judul_ta.dosen_pembimbing.length)
                  for(let counter=0;counter<data.body.data.detail_kelompok[0].judul_ta.dosen_pembimbing.length;counter++){
                    this.dosen_pembimbing.push({username: data.body.data.detail_kelompok[0].judul_ta.dosen_pembimbing[counter].profil.username,
                    email: data.body.data.detail_kelompok[0].judul_ta.dosen_pembimbing[counter].email,
                    nim: data.body.data.detail_kelompok[0].judul_ta.dosen_pembimbing[counter].akademik.universitas_prodi[0].nim_nip})
                  } 
                  //BIMBINGAN
                  console.log("Banyak bimbngan: "+data.body.data.detail_kelompok[0].bimbingan.length)
                  for(let counter=0;counter<data.body.data.detail_kelompok[0].bimbingan.length;counter++){
                    this.bimbingan.push({username: data.body.data.detail_kelompok[0].bimbingan[counter].pengguna.profil.username,
                    teks: data.body.data.detail_kelompok[0].bimbingan[counter].teks,
                    created_at: data.body.data.detail_kelompok[0].bimbingan[counter].created_at,
                    peran: data.body.data.detail_kelompok[0].bimbingan[counter].peran})
                  }
                }
                this.daftar_ta()           
              } else if (data.body.success == false) {
                console.error('M: Gagal mengembalikan detail Kelompok.')
              }
            });
          },
          daftar_ta: function(){
            this.$http.post(global_json.general_url + '/institusi/ta/daftar', {
              access_token: this.$session.get('access_token'),
              universitas: this.universitas
            }).then(function (data) {
              if (data.body.success) {
                for(let counter=0;counter<data.body.data.data.length;counter++){
                  this.ta.push(data.body.data.data[counter])             
                }
                //console.log("Banyak TA: "+JSON.stringify(this.ta.length))
              } else if (data.body.success == false) {
                console.error('M: Gagal mengembalikan detail Kelompok.')
              }
            });
          }
        }
    }
</script>

<style>
  @import '../../../assets/css/custom.css';

</style>
