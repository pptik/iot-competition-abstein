import Index from './components/public/BungkusIndex.vue';
import SekolahDashboard from './components/member/sekolah/BungkusDashboard.vue';
import SekolahSiswa from './components/member/sekolah/BungkusSiswa.vue';
import SekolahKelas from './components/member/sekolah/BungkusKelas.vue';
import Monitoring from './components/public/BungkusMonitoring.vue';

export default [
  //General
  {path:'/',component: Index},
  {path:'/dashboard',component: SekolahDashboard},
  {path:'/siswa',component: SekolahSiswa},
  {path:'/kelas',component: SekolahKelas},
  {path:'/monitoring',component: Monitoring}
]
