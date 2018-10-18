<template>
  <span>
    <!-- <div align="center" style="background: linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);color:#FFFFFF;" class="ui segment grey-text">      
      Absensi Hari Ini
    </div> -->
    <div class="grey-text" style="font-size:xx-large;font-weight:300;margin-top:0.3em;">      
      Absensi Hari Ini, {{this_date}} {{this_month}} {{this_year}}
    </div>
    <div class="ui form" style="margin-top:1.5em;">
      <div class="ui icon input" style="width:100%">        
        <input type="text" placeholder="Pencarian berdasarkan Nama Siswa" v-model="pencarian_nama_siswa">
        <i class="search icon"></i>
      </div>
    </div>
    <div class="ui-segment" style="margin-top:2em;">
      <a href="#" v-on:click.prevent="export_tabel"> <i class="download icon"></i> Unduh Data Absensi</a>      
      <table class="ui celled table grey-text" id="absensi-harian">
        <!-- <caption>Absensi {{this_full_date}}</caption> -->
        <thead>
          <tr>
          <th style="text-align:center">No</th>          
          <th style="text-align:center">Nama Siswa</th>
          <th style="text-align:center">Kelas</th>
          <th style="text-align:center">Waktu</th>
          <th style="text-align:center">Status</th>
          <th v-if="$session.get('user_role') ===2" style="text-align:center">Aksi</th>
        </tr></thead>
        <tbody>
          <tr v-for="harian,index in filteredSekolahHarian">
            <td style="text-align:center">{{index+1}}</td>
            <td>{{harian.nama_lengkap}}</td>
            <td>{{harian.nama_kelas}}</td>
            <td>
              Datang:
              <span v-if="harian.waktu_datang == 0" bgcolor="red" style="text-align:center">
                    <a class="ui red large label">Alpa</a>
              </span>  
              <span v-if="harian.waktu_datang != 0" bgcolor="green" style="text-align:center">                
                <a class="ui green large label">{{harian.waktu_datang}}</a>
              </span>
              <br/>
              <br/>
              Pulang:
              <span v-if="harian.waktu_pulang == 0" bgcolor="red" style="text-align:center">
                    <a class="ui red large label">Alpa</a>
              </span>  
              <span v-if="harian.waktu_pulang != 0" bgcolor="green" style="text-align:center">
                <a class="ui green large label">{{harian.waktu_pulang}}</a>                
              </span>
            </td>                           
            <td v-if="harian.waktu_datang == 0 && harian.waktu_pulang == 0 " bgcolor="red" style="text-align:center"> 
              <span class="white-text">Alpa</span>            
            </td>
            <td v-if="harian.waktu_datang != 0 && harian.waktu_pulang != 0" bgcolor="green" style="text-align:center">  
              <span class="white-text">Hadir</span>            
            </td>            
            <td v-if="harian.status == 2" bgcolor="orange" style="text-align:center">  
              <span class="white-text">Izin</span>
            </td>
            <td v-if="harian.status == 3" bgcolor="purple" style="text-align:center">
              <span class="white-text">Sakit</span>
            </td>
            <td v-if="harian.waktu_datang != 0 && harian.waktu_pulang == 0" bgcolor="grey" style="text-align:center">                                                        
              <span class="white-text">Tidak Lengkap</span>  
            </td>
            <td style="text-align:center" v-if="$session.get('user_role') ===2"> 
              <a href="#" v-if="harian.rfid != 0" v-on:click="show_update_form_absent(harian.nama_lengkap,harian.waktu_datang,harian.waktu_pulang,harian.rfid)">Ubah Status</a>              
              <span v-else-if="harian.rfid == 0">RFID belum terdaftar</span>                            
            </td>
          </tr>          
        </tbody>
      </table>
    </div>       
    <modal name="form-update-absensi">            
        <p style="font-size:150%;padding:1em 1em 0em 1em">
          Form perbaharui status absensi                    
        </p>
        <table style="padding:0em 1em 0em 1em;">
          <tr>
            <td>Nama Siswa<td>
            <td>:</td> 
            <td>
              {{update_nama_siswa}}
            </td>
          </tr>
          <tr>            
            <td>Waktu Datang<td>
            <td>:</td> 
            <td>
              <span v-if="update_waktu_datang == 0" class="ui red horizontal label">Alpa</span>
              <span v-else-if="update_waktu_datang !=0" class="ui green horizontal label">{{update_waktu_datang}}</span>              
            </td>
          </tr>
          <tr>
            <td>Waktu Pulang</td>
            <td>:</td>
            <td>
              <span v-if="update_waktu_pulang == 0" class="ui red horizontal label">Alpa</span>
              <span v-else-if="update_waktu_pulang !=0" class="ui green horizontal label">{{update_waktu_pulang}}</span>              
            </td>
          </tr>
        </table>
        <form class="ui form" style="padding:1em;">      
          <div class="field">
            <label>Status</label>
            <select class="ui search dropdown" v-model="update_status">
              <option value="">Pilih Status</option>
              <option value="0">Alpa</option>
              <option value="1">Hadir</option>
              <option value="2">Izin</option>
              <option value="3">Sakit</option>
              <option value="4">Tidak Lengkap</option>
            </select>
          </div>
          <div class="required field">
            <button type="button"
                    style="background: linear-gradient(141deg, #2ecc71 10%, #27ae60 51%, #27ae60 75%);color:#FFFFFF;"
                    v-on:click.prevent="update_absen()" class="medium ui button button-submit">Perbaharui</button>
            <a href="#" v-on:click.prevent="close_update_form_absent()" target="_blank">Batal </a>          
          </div>
      </form>
    </modal>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';
  //import '../../../assets/js/xlsx.core.js';
  import 'file-saverjs';
  import Chart from 'chart.js';
  import moment from 'moment/moment'
  import 'moment/locale/id'
  import Swal from 'sweetalert2'
  import table_export from 'tableexport'

  export default {
    name: "konten",
    data(){
      return{
        chartLabel: [],
        //chartLabelY: ["07.00","08.00"]  
        waktuDatang: [],
        waktuPulang: [],
        tepatDatang: [],
        tepatPulang: [],
        daftarSekolah: [],
        sekolah_harian:[],
        daftarSiswa: [],
        minDayEpoch: 0,
        maxDayEpoch: 0,
        select_user_id: null,
        select_sekolah: null,
        this_full_date: null,
        this_month: moment().format('MMMM'),
        this_year: moment().get('year'),
        this_date: moment().get('date'),
        update_nama_siswa: null,
        update_waktu_datang: null,
        update_waktu_pulang: null,
        update_rfid: null,
        update_status: null,
        pencarian_nama_siswa: ''
      }
    },
    created() {
      this.check_session();
      //this.get_absen("5b834f3c6e33f31321bfaabd","5b83585226ebef39747eac4b");
      this.get_all_siswa();
      moment.locale('id')      
      this.this_full_date = moment(Date.now()).format('LL');
      
    },
    mounted: function () {
      $('.menu .item')
        .tab()
      ;
      $('select.dropdown').dropdown();
      this.june_graph()
      let vue = this
      vue.get_absen_sekolah_harian()
      /* setInterval(function(){
        vue.get_absen_sekolah_harian()
      },60000) */
      

      $("#tombol-unduh-data-absensi").css("display","none")
    },
    methods: {
      show_update_form_absent: function(namaLengkap,waktuDatang,waktuPulang,rfidParam){
        this.update_nama_siswa = namaLengkap
        this.update_waktu_datang = waktuDatang
        this.update_waktu_pulang = waktuPulang
        this.update_rfid = rfidParam
        
        this.$modal.show('form-update-absensi');
      },
      close_update_form_absent: function(){
        this.$modal.hide('form-update-absensi');
      },
      /* ubah_status_absen_form: function(id,rfid,nama_lengkap){
       console.log(id+"|"+rfid+"|"+nama_lengkap)
       $('.ui.modal.ubah-profile-picture')
          .modal('show')
      }, */
      export_tabel: function(){
        
        let vue = this
        table_export(document.getElementById("absensi-harian"),{          
          formats: ['xls'],            // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
          filename: 'Absensi RFID '+vue.this_full_date,                             // (id, String), filename for the downloaded file, (default: 'id')          
          exportButtons: true,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
          position: 'top',                         // (top, bottom), position of the caption element relative to table, (default: 'bottom')
          ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
          ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
          trimWhitespace: true                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
        })

        /* $("#absensi-harian").tableExport({
            bootstrap: false
        }); */
      },
      check_session(){
        if(this.$session.get('access_token') == null){
          alert("Session anda sudah habis, silahkan login kembali untuk melanjutkan.")
          this.$router.push('/')
        }
      },
      get_absen(user){
        console.log("sekolah: "+this.$session.get('id_sekolah'))
        console.log("user_id: "+user)
        

        this.$http.post(global_json.general_url+'/absen/query',{
          sekolah_id:this.$session.get('id_sekolah'),
          start_time:moment().get('year')+"-"+moment().get('month')+"-01T00:00:00.000+0000",
          end_time:moment().get('year')+"-"+(moment().get('month')+1)+"-01T00:00:00.000+0000",
          /* start_time:"2018-07-01T00:00:00.000+0000",
          end_time:"2018-08-01T00:00:00.000+0000", */
          user_id:user
        }).then(function (data) {
          if(data.body.success == true){
              
              var results = data.body.data.resultArray;
              console.log("SSADS: "+results.length)
              if(results.length>0){
                //alert("data")
                this.chartLabel=[];
                this.waktuDatang=[];
                this.waktuPulang=[];
                this.tepatDatang=[];
                this.tepatPulang=[];
                for(let counter=0;counter<results.length;counter++){
                  this.chartLabel.push(counter+1)
                  this.waktuDatang.push(this.get_only_time(results[counter].datang_string).getTime()/1000)
                  this.waktuPulang.push(this.get_only_time(results[counter].pulang_string).getTime()/1000)
                  this.tepatDatang.push(this.get_only_time(results[counter].max_kedatangan_string).getTime()/1000);
                  this.tepatPulang.push(this.get_only_time(results[counter].max_kepulangan_string).getTime()/1000);
                }

                this.june_graph();
              }else{
                Swal({title:'Maaf',
                text:'Data tidak tersedia.',
                type:'error',
                allowOutsideClick: false});                
              }

            
          }else if(data.body.success == false){
            var pesan = data.body.message;
            //console.log('Kembalian: '+data.body.data.length)
           
           Swal({title:'Maaf',
                text:pesan,
                type:'error',
                allowOutsideClick: false});                

            
          }
        });
      },
      get_absen_sekolah_harian(user){
        let vue = this

        Swal({
        allowOutsideClick: false,
        text: 'Mohon tunggu permintaan Anda sedang diproses...',        
        onOpen: function () {
          Swal.showLoading()

        let d = moment().valueOf();
        console.log("sekolah id:"+vue.$session.get('id_sekolah'))
        console.log("date_time:"+new Date().toISOString())
        vue.sekolah_harian = []
        vue.$http.post(global_json.general_url+'/absen/sekolah/harian',{
          sekolah_id:vue.$session.get('id_sekolah'),
          //date_time:moment().get('year')+"-"+(moment().get('month')+1)+"-"+moment().get('date')+"T00:00:00.000+0000"
          date_time:new Date().toISOString()
        }).then(function (data) {
          if(data.body.success == true){              
              var results = data.body.data; 
              for(let counter=0;counter<results.length;counter++){
                if(results[counter].waktu_datang != 0 || results[counter].waktu_pulang != 0){
                  results[counter].waktu_datang = moment(results[counter].waktu_datang).format('HH.mm.ss')                  
                }
                if(results[counter].waktu_pulang != 0){                  
                  results[counter].waktu_pulang = moment(results[counter].waktu_pulang).format('HH.mm.ss')
                }
                
                vue.sekolah_harian.push(results[counter])
              }
              $("#tombol-unduh-data-absensi").css("display","block") 
              Swal.close()                     
          }else if(data.body.success == false){
            var pesan = data.body.message;
            //console.log('Kembalian: '+data.body.data.length)
           
            Swal({title:'Maaf',
                text:pesan,
                type:'error',
                allowOutsideClick: false}); 
          }
        });

        }})
        
      },
      get_all_siswa(){
        this.daftarSiswa = []
        this.$http.post(global_json.general_url+'/absen/siswa/filter/sekolah',{          
          sekolah: this.$session.get('id_sekolah')          
        }).then(function (data) {
          if(data.body.success == true){
              //alert(JSON.stringify(data.body))
              //console.log("daftar siswa dlm sekolah: "+JSON.stringify(data.body))
              var results = data.body.data.daftar_siswa_pada_sekolah;
              for(let counter=0;counter<results.length;counter++){
                this.daftarSiswa.push(results[counter])    
              }            
          }else if(data.body.success == false){
            var pesan = data.body.message;
            //console.log('Kembalian: '+data.body.data.length)
           
            //alert(pesan);
          }
        });
      },
      get_all_sekolah(){
        this.$http.post(global_json.general_url+'/absen/sekolah/daftar',{
          /* sekolah_id:"5b834f3c6e33f31321bfaabd",
          start_time:"2018-07-01T00:00:00.000+0000",
          end_time:"2018-08-01T00:00:00.000+0000",
          user_id:"5b83585226ebef39747eac4b", */
        }).then(function (data) {
          if(data.body.success == true){
              //alert(JSON.stringify(data.body))
              var results = data.body.data.daftar_sekolah;
              for(let counter=0;counter<results.length;counter++){
                this.daftarSekolah.push(results[counter])    
              }            
          }else if(data.body.success == false){
            var pesan = data.body.message;
            //console.log('Kembalian: '+data.body.data.length)
           
            alert(pesan);
          }
        });
      },
      get_only_time(dateString){
        var date = new Date(dateString);
        return new Date(0,0,0,date.getHours(), date.getMinutes());
      },
      generated_data(){
        this.chartLabel=[];
        this.waktuDatang=[];
        this.waktuPulang=[];
        this.tepatDatang=[];
        this.tepatPulang=[];
        var minDatang = this.minDayEpoch-1000;
        var maxDatang = 1534812000;
        var minPulang = 1534831200;
        var maxPulang = this.maxDayEpoch+1000;
        for(let counter=0;counter<31;counter++){
          this.chartLabel.push(counter+1)
          this.waktuDatang.push(Math.floor(Math.random() *(maxDatang-minDatang+1)+minDatang))
          this.waktuPulang.push(Math.floor(Math.random() *(maxPulang-minPulang+1)+minPulang))
          this.tepatDatang.push(this.minDayEpoch);
          this.tepatPulang.push(this.maxDayEpoch);
        }

        this.june_graph();
      },
      june_graph: function(){
        var getParent = this
        var date =getParent.chartLabel 
        //var duration=[22101,22135,20047,20189,18752] 
        var duration=getParent.waktuDatang
        var duration2=getParent.waktuPulang
        var tepatDatang = getParent.tepatDatang
        var tepatPulang=getParent.tepatPulang

        /* var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: date,
              datasets: [
              {
                  label: 'Datang',
                  data: duration,
                  fill:false,
                  borderColor: [                      
                      'rgba(75, 192, 192, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',                      
                      'rgba(255,99,132,1)'
                  ],
                  borderWidth: 1
              },
              {
                  label: 'Pulang',
                  data: duration2,
                  fill:false,
                  borderColor: [                      
                      'rgba(75, 192, 192, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',                      
                      'rgba(255,99,132,1)'
                  ],
                  borderWidth: 1
              },{
                  label: "Batas",
                  data: tepatDatang,
                  fill:false,
                  borderColor: [                      
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)'
                  ],
                  borderWidth: 1
              },
              {
                  label: "Batas",
                  data: tepatPulang,
                  fill:false,
                  borderColor: [                      
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  userCallback: function(v) { 
                    return moment(new Date(v*1000).toISOString()).format("HH:mm")
                  }
                }
              }]
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  return data.datasets[tooltipItem.datasetIndex].label + ': ' + (moment(new Date(tooltipItem.yLabel*1000).toISOString()).format("HH:mm"))
                }
              }
            }
          }
        }); */
      },
      update_absen: function(){
        let d = moment().valueOf();
        this.$http.post(global_json.general_url+'/absen/update',{
          rfid:this.update_rfid,
          status:this.update_status,
          date_time:new Date().toISOString()
        }).then(function (data) {
          if(data.body.success == true){
            Swal({title:'Berhasil',
                text:JSON.stringify(data.body.data.message),
                type:'success',
                allowOutsideClick: false});                     
          }else if(data.body.success == false){            
            Swal({title:'Gagal',
                text:JSON.stringify(data.body.data.message),
                type:'error',
                allowOutsideClick: false});
          }
        });
      }
    },
    computed: {
      filteredSekolahHarian: function () {
        return this.sekolah_harian.filter((nama_lengkap) => {
          return nama_lengkap.nama_lengkap.match(this.pencarian_nama_siswa.toUpperCase());
        })
      }
    }
  }
</script>

<style scoped>

</style>

