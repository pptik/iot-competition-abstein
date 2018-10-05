<template>
</template>

<script>

    export default {
        name: "index",
        created () {
          if(this.$session.get('user_role') == 4){//Peran mahasiswa
            this.$router.push({path:'/kelompok_ta/mahasiswa'})
          }else if(this.$session.get('user_role') == 2){//Peran universitas
            this.$router.push({path:'/kelompok_ta/universitas'})
          }
        }
    }
</script>

<style>

</style>
