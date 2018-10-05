import Vue from 'vue'

export default {
  penentuDashboard(to,from,next){
    var peranPengguna = this.$session.get('user_role');
      if(peranPengguna == 4){
        next(
          {
            path: '/dashboard',
            query: {
              redirect: '/dashboard/mahasiswa'
            }
          }
        )
      }
  }
}
