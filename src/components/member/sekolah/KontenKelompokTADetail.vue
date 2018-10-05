<template>
  <span>
    <div align="center"
         style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;"
         class="ui segment grey-text">{{this.$parent.no_kelompok}}</div>
    <div class="ui segment grey-text">
      <section v-if="this.$parent.judul_ta != null">
          <form method="post" action="/public/daftar/dosen" class="ui form">
            <div class="field">                        
              <textarea placeholder="Tulis bimbingan disini" style="resize: none;" v-model="konten_bimbingan"></textarea>
            </div>
            <div class="field">
              <button v-on:click.prevent="tambahBimbingan" type="button" style="color: white; background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);" class="ui button">
                Kirim
              </button>
            </div>
          </form>
      </section>
      <section v-else-if="this.$parent.judul_ta == null">        
        <b>Keterangan:</b>
        <br/>
           Pengambilan Tugas Akhir dapat dilakukan oleh setiap anggota kelompok TA.
           Satu anggota mengambil Tugas Akhir maka otomatis satu kelompok tersebut memiliki Tugas Akhir
           yang diambil.
        <br/>
        <br/>
        Silahkan ambil Tugas Akhir yang tersedia di bawah ini:
        <br/>
        <table class="ui fixed single line celled table" style="font-size: 0.6rem">
        <thead>
          <tr>            
            <th>Deskripsi Masalah</th>
            <th>Alternatif Solusi</th>
            <th>Constraint</th>          
            <th>Dosen Pengusul</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ta in this.$parent.ta"> 
            <td>{{ta.deskripsi_masalah}}</td>
            <td>{{ta.alternatif_solusi}}</td>
            <td>{{ta.constraint}}</td>
            <td>
              <ol>
                <li v-for="dp in ta.dosen_pengusul">
                  {{dp.email}}
                </li>
              </ol>
            </td>
            <td>
              <a v-if="ta.kelompok == null" href="#" style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                    class="ui button mini" v-on:click.prevent="ambil_ta(ta._id)">Ambil TA</a> 
              <span v-else-if="ta.kelompok != null">TA sudah diambil</span> 
            </td>
          </tr>
        </tbody>
      </table>        
      </section>      
    </div>
    <div class="ui segment grey-text" v-for="bimbingan in this.$parent.bimbingan.slice().reverse()">    
      {{bimbingan.username}}, {{bimbingan.created_at | moment}} <a v-if="bimbingan.peran == 3" class="ui blue label">Dosen</a>
      <br/>
      <br/>
      <span style="font-weight:lighter;font-size:x-large;">
      "{{bimbingan.teks}}"
      </span>
    </div>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';
  import 'semantic-ui/dist/semantic.min.js'
  import moment from 'moment/moment'

  export default {
    name: "konten",
    data() {
      return {       
        konten_bimbingan: null
      }
    },
    created() {      
      console.log("Kelompok:"+this.$route.params.kelompok)
      
    },
    methods: {           
      ambil_ta: function (taParam) {
        
        this.$http.post(global_json.general_url + '/mahasiswa/ta/ambil', {
          access_token: this.$session.get('access_token'),
          kelompok: this.$route.params.kelompok,
          ta: taParam
        }).then(function (data) {
          if (data.body.success) {  
            alert(JSON.stringify(data.body.data.message))
            this.$router.push({ path: '/'})
          } else{
            alert(JSON.stringify(data.body.data))
            this.$router.push({ path: '/'})
          }
        });

      },
      tambahBimbingan: function(){
        this.$http.post(global_json.general_url + '/mahasiswa/kelompok/bimbingan/tambah', {
          access_token: this.$session.get('access_token'),
          pengguna: this.$session.get('user_id'),
          kelompok: this.$route.params.kelompok,
          peran: this.$session.get('user_role'),
          teks: this.konten_bimbingan
        }).then(function (data) {
          if (data.body.success) {  
            //alert(JSON.stringify(data.body.data.message))            
            this.$parent.bimbingan.push({username: this.$parent.username,
                    teks: this.konten_bimbingan,
                    created_at: new Date(Date.now()).toISOString()})
            this.konten_bimbingan = null
          } else{
            alert(JSON.stringify(data.body.data))            
          }
        });
      }
    },
    filters: {
      moment: function (date) {
        return moment(date).fromNow();
      }
    }
  }
  
</script>

<style scoped>

</style>
