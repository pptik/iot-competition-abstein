<template>
  <span>
    <div align="center"
         style="background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);color:#FFFFFF;"
         class="ui segment grey-text"><i class="users icon"></i>Gabung kelompok Tugas Akhir</div>
    <div class="ui segment grey-text">  
      <form class="ui form">
        <div class="ui grid">
          <!-- <div class="eight wide column">
            <div class="field">
              <label>Tahun Ajaran Pendidikan</label>
              <select class="ui dropdown">
                <option>Filter Tahun Ajaran</option>                     
                <option value="2018/2019">2018/2019</option>
              </select>
            </div>
          </div>
          <div class="eight wide column">
            <div class="field">
              <label>Tahun Semester</label>
              <select class="ui dropdown">
                <option>Filter Semester</option>                     
                <option>Ganjil</option>                     
                <option>Genap</option>                     
              </select>
            </div>
          </div> -->
          <div class="sixteen wide column">
            <div class="field">
              <label>No Kelompok</label>
              <input type="text" placeholder="Filter Nomor Kelompok" v-model="search"/>
            </div>
          </div>
        </div>        
      </form>
      <table class="ui fixed single line celled table" style="font-size: 0.6rem">
        <thead>
          <tr>            
            <th>No Kelompok</th>
            <th>Tahun Ajaran</th>
            <th>Semester</th>          
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kelompok,index) in filteredKelompok">            
            <td>{{kelompok.no_kelompok}}</td>
            <td>{{kelompok.tahun_ajaran}}</td>
            <td>{{kelompok.semester}}</td>
            <td>
              <span v-if="kelompok.anggota.length >= kelompok.jumlah_anggota">
                Sudah memenuhi kuota
              </span>
              <span v-else-if="kelompok.anggota.length < kelompok.jumlah_anggota">
                <button type="button"
                    style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                    class="ui button mini" v-on:click.prevent="gabung_kelompok_ta_proses(kelompok._id)">Gabung</button>              
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data() {
      return {        
        search: '',
        daftar_universitas_kelompok: [],              
        universitas_prodi_mahasiswa_id: this.$route.params.universitas_prodi_mahasiswa_id,
        universitas_prodi_mahasiswa_universitas: this.$route.params.universitas_prodi_mahasiswa_universitas
      }
    },
    created() {
      this.ambil_daftar_kelompok()
    },
    methods: {      
      ambil_daftar_kelompok: function () {
        //console.log(this.$session.get('access_token'));         
        //console.log("univ prodi mahasiswa id: "+this.universitas_prodi_mahasiswa_id);         
        //console.log("univ prodi mahasiswa univ: "+this.universitas_prodi_mahasiswa_universitas);         
        this.$http.post(global_json.general_url + '/institusi/kelompok/daftar', {
          access_token: this.$session.get('access_token'),
          universitas: this.universitas_prodi_mahasiswa_universitas
        }).then(function (data) {
          if (data.body.success) {  
            let tahunAjaranTemp          
            for(let counter=0;counter<data.body.data.data.length;counter++){
              this.daftar_universitas_kelompok.push(data.body.data.data[counter])
              // Logika untuk dinamis daftar tahun ajaran 
              // if(this.daftar_tahun_ajaran.length == 0){
              //   this.daftar_tahun_ajaran = data.body.data.data[counter].tahun_ajaran
              //   tahunAjaranTemp = data.body.data.data[counter].tahun_ajaran
              //   console.log(data.body.data.data[counter].tahun_ajaran)
              // }else{
              //   if(!this.daftar_tahun_ajaran.includes(tahunAjaranTemp)){
              //     this.daftar_tahun_ajaran = data.body.data.data[counter].tahun_ajaran                  
              //   }
              // }
            }               
          } else{
            alert(JSON.stringify(data.body.data))
            this.$router.push({ path: '/' })
          }
        });
      },
      gabung_kelompok_ta_proses: function(kelompokParam){
        this.$http.post(global_json.general_url + '/mahasiswa/kelompok/ambil', {
          access_token: this.$session.get('access_token'),
          kelompok: kelompokParam,
          pengguna: this.$session.get('user_id'),
          universitas_prodi_id: this.universitas_prodi_mahasiswa_id,
          universitas: this.universitas_prodi_mahasiswa_universitas
        }).then(function (data) {
          if (data.body.success) {  
            alert(data.body.data.jumlah_anggota)
            this.$router.push({ path: '/kelompok_ta/mahasiswa' })               
          } else{
            alert(JSON.stringify(data.body.data))
            this.$router.push({ path: '/kelompok_ta/mahasiswa' })               
          }
        });
      }
    },
    computed: {
      filteredKelompok: function () {
        return this.daftar_universitas_kelompok.filter((kelompok) => {
          return kelompok.no_kelompok.match(this.search.toUpperCase());
        })
      }
    }
  }
</script>

<style scoped>

</style>
