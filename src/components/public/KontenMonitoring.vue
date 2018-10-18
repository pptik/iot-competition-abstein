<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, #feb645 40%,#f1e767 100%);color:#FFFFFF;" class="ui segment grey-text">Monitoring Data Absensi yang masuk</div>    
    <span>
    <!-- <a href="#" v-on:click="tes_tambah_dari_socket()">tambah dr socket</a> -->
    <a href="#" v-on:click="clear_data()">clear data</a>
    </span>
    <div class="ui form" style="margin-top:1em;">
      <div class="field">
        <label>Filter berdasarkan Mac Address</label>
        <select class="ui search dropdown" v-model="select_mac_address" v-on:change="select_mac_address_function()">          
          <option v-for="madd in daftar_mac_address" :value="madd.address">{{madd.address}}</option>          
        </select>
      </div>
    </div>

    <table class="ui celled table" id="all_absensi">
      <thead>
        <tr>
          <th>Mac</th>
          <th>RFID</th>
          <th>Waktu data masuk</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dm in data_monitoring.slice().reverse()">
          <td>{{dm.mac_address}}</td>
          <td>{{dm.rfid}}</td>
          <td>{{dm.created_at | moment}}</td>
        </tr>               
      </tbody>      
    </table>

     <table class="ui celled table" id="filtered_absensi" style="display:none;">
      <thead>
        <tr>
          <th>Mac</th>
          <th>RFID</th>
          <th>Waktu data masuk</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dm in filteredAbsensi.slice().reverse()">
          <td>{{dm.mac_address}}</td>
          <td>{{dm.rfid}}</td>
          <td>{{dm.created_at | moment}}</td>
        </tr>               
      </tbody>      
    </table>

  </span>
</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';
  import Swal from 'sweetalert2'
  import moment from 'moment'
  import 'moment/locale/id'
  
  export default {
    name: "konten",
    data(){
      return{
        select_month: null,
        select_mac_address: null,
        data_monitoring: [],
        daftar_mac_address: []
      }
    },
    created() {
      
    },
    mounted(){              
      this.get_monitoring_absensi()
      this.get_daftar_mac_address()
      $('select.dropdown')
        .dropdown()
      ;
    },
    sockets:{
      connect: function(){
        console.log('socket connected')
        this.$socket.emit('alias', "Ilham");        
        this.$options.sockets.rfid = (data) => {
            this.data_monitoring.push(data)
            //console.log("socket connect rfid:"+JSON.stringify(data))
        }
      }
    },
    methods: {
      select_mac_address_function: function(){
        $("#all_absensi").css("display","none")
        $("#filtered_absensi").css("display","block")
      },
      filter_mac_address: function(){
        console.log("abc")
      },
      get_monitoring_absensi: function(val){
         let vue = this
        
        Swal({
          allowOutsideClick: false,
          text: 'Mohon tunggu permintaan Anda sedang diproses...',        
          onOpen: function () {
            Swal.showLoading()
                      
          vue.$http.post(global_json.general_url+'/absen/monitoring/daftar_absensi',{            
          }).then(function (data) {          
            if(data.body.success == true){
              Swal.close()              
              let results = data.body.data.daftar_absensi
              
              results.forEach((element)=>{
                this.data_monitoring.push(element)
              })
              console.log("DMonitoring: "+JSON.stringify(results))
            }else if(data.body.success == false){                        
                Swal({title:'Maaf',
                text:data.body.data.err,
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
      },
      get_daftar_mac_address: function(val){
         let vue = this
        
        Swal({
          allowOutsideClick: false,
          text: 'Mohon tunggu permintaan Anda sedang diproses...',        
          onOpen: function () {
            Swal.showLoading()
                      
          vue.$http.post(global_json.general_url+'/absen/monitoring/daftar_mac_address',{            
          }).then(function (data) {          
            if(data.body.success == true){
              Swal.close()              
              let results = data.body.data.daftar_mac_address
              results.forEach((element)=>{
                this.daftar_mac_address.push(element)
              })
              
              //console.log("DMAC: "+JSON.stringify(this.daftar_mac_address))

            }else if(data.body.success == false){                        
                Swal({title:'Maaf',
                text:data.body.data.err,
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
      },
      tes_tambah_dari_socket: function(){
        this.data_monitoring.push({"mac_address":"2c:3a:e8:42:61:88","rfid":"0x3f 0x95 0xe6 0x29 ","created_at":"2018-09-10T04:20:16.388Z"})
      },     
      clear_data: function(){
        this.data_monitoring = []
      }     
    },
    filters: {
      moment: function (date) {
        moment.locale('id')
        return moment(date).format('LLL');
      }
    },
    computed: {
      filteredAbsensi: function () {
        let vue = this
        
        
        return this.data_monitoring.filter((mac) => {
          return mac.mac_address.match(this.select_mac_address);
        })
      }
    }
  }
</script>

<style scoped>

</style>
