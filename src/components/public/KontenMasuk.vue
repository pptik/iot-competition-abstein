<template>
  <section class="ui grid stackable">
    <div class="eight wide column grey-text" align="center">
      <img src="/src/assets/images/carousel-2.png" class="ui image medium"/>
    </div>
    <div class="eight wide column grey-text">
      <h2 class="primary-color">Masuk</h2><br/>
      <form class="ui form">
        <div class="field">
          <div>Email</div>
          <input type="text" name="email" autocomplete="email" placeholder="Email Anda untuk login" v-model="email"/>
        </div>
        <div class="field">
          <div>Sandi</div>
          <input type="password" name="sandi" autocomplete="password" placeholder="Sandi Anda untuk login" v-model="sandi"/>
        </div>
        <div class="field">
          <button v-on:click.prevent="masuk" type="button" style="color: white; background: linear-gradient(141deg, #e74c3c 10%, #c0392b 51%, #c0392b 75%);" class="ui button">Kirim</button>
        </div>
      </form>
    </div>
  </section>

</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';

  export default {
    name: "konten",
    data(){
      return{
        email: '',
        sandi: ''
      }
    },
    methods: {
      masuk:function () {
        //alert(this.email,this.sandi)
        this.$http.post(global_json.general_url+'/masuk',{
          email: this.email,
          sandi: this.sandi
        }).then(function (data) {
          //alert(JSON.stringify(data.body))
          if(data.body.success == true){//Login berhasil
            //alert(JSON.stringify(data.body))
            this.$session.set('access_token',data.body.data.data.access_token)
            this.$session.set('user_id',data.body.data.data.user_id)
            this.$session.set('email',this.email)
            this.$session.set('user_role',data.body.data.data.user_role)
            this.$session.set('username',data.body.data.data.username)

            this.$router.push({path:'/dashboard'})

            //console.log('Session username: '+this.$session.get('username'))
          }else if(data.body.success == false){
            //alert(JSON.stringify(data.body))
            this.$router.push({path:'/masuk'})
          }
        });
      }
    }
  }




</script>

<style scoped>

</style>
