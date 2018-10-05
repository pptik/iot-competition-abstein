<template>
</template>

<script>

    export default {
        name: "index",
        created () {
          if(this.$session.get('user_role') == 4){//Peran mahasiswa
            this.$router.push({path:'/dashboard/mahasiswa'})
          }else if(this.$session.get('user_role') == 2){//Peran universitas
            this.$router.push({path:'/dashboard/universitas'})
          }else if(this.$session.get('user_role') == 3){//Peran dosen
            this.$router.push({path:'/dashboard/dosen'})
          }
          
        }
    }
</script>

<style>

</style>
