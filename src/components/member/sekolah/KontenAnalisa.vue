<template>
  <span>
    <div align="center" style="background: linear-gradient(to right, #feb645 40%,#f1e767 100%);color:#FFFFFF;" class="ui segment grey-text"><i class="chart bar icon"></i>Visualisasi Data</div>    
    <div class="ui segment grey-text">
      <div class="ui form">        
        <div class="field">        
          <select class="ui dropdown" v-on:change="select_month_func" v-model="select_month">
            <option>Filter Analisa</option>
            <option value="Juni">Juni 2018</option>
            <option value="Juli">Juli 2018</option>
            <option value="Agustus">Agustus 2018</option>
          </select>
        </div>        
      </div>
      <br/>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  </span>
</template>

<script>
  import global_json from '../../../assets/js/globalVariable.json';
  import Chart from 'chart.js';
  //var myChart = new Chart(ctx, {});

  export default {
    name: "konten",
    data(){
      return{
        select_month: null        
      }
    },
    created() {
      
    },
    mounted(){
      $('select.dropdown')
        .dropdown()
      ;

      this.july_graph()
    },
    methods: {
      june_graph: function(){
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
              datasets: [{
                  label: '# Juni 2018',
                  data: [5, 9, 15, 5, 9, 1],
                  backgroundColor: [                      
                      'rgba(75, 192, 192, 0.2)',                      
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',                      
                      'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [                      
                      'rgba(75, 192, 192, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',                      
                      'rgba(255,99,132,1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
      },
      july_graph: function(){
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
              datasets: [{
                  label: '# Juli 2018',
                  data: [15, 10, 12, 15, 10, 7],
                  backgroundColor: [                      
                      'rgba(75, 192, 192, 0.2)',                      
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',                      
                      'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [                      
                      'rgba(75, 192, 192, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',                      
                      'rgba(255,99,132,1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
      },
      agustus_graph: function(){
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
              datasets: [{
                  label: '# Agustus 2018',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [                      
                      'rgba(75, 192, 192, 0.2)',                      
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',                      
                      'rgba(255, 99, 132, 0.2)'
                  ],
                  borderColor: [                      
                      'rgba(75, 192, 192, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',                      
                      'rgba(255,99,132,1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
      },
      select_month_func:function () {
        switch(this.select_month){
          case "Juni":
            this.june_graph()
          ;break;
          case "Juli":
            this.july_graph()
          ;break;
          case "Agustus":
            this.agustus_graph()
          ;break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
