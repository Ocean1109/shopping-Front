<template>
   <div id="login_background">
     <div id="login_box">
       <p style="padding: 30px 0px 10px; position:relative;">
         <span class="u_logo"></span>
         <input id="loginName" class="ipt" type="text" v-model="userName" placeholder="请输入手机号" value="telephone">
       </p>
       <p style="position: relative;">
         <span class="p_logo"></span>
         <input class="ipt" id="password" type="password" v-model="password" placeholder="请输入密码" value="password">
       </p>
       <div id="errorText" style="height: 20px;margin-top:10px">
         <p  style="color: red;display: none">用户名密码错误请从新输入</p>
       </div>
       <div style="height: 50px; line-height: 50px; margin-top: 30px; border-top-color: rgb(231, 231, 231); border-top-width: 1px; border-top-style: solid;">
         <!--        <p style="margin: 0px 35px 20px 45px;"><span style="float: left;"><a style="color: rgb(204, 204, 204);"-->
         <!--                                                                             href="#">忘记密码?</a></span>-->
         <router-link to='/Register'>
           <span style="float: left;margin-left: 10px;font-size: 14px;">没有账号？现在注册</span>
         </router-link>

         <span style="float: right;">
              <a id="loginBtn" @click="login()">登录</a>
           </span></div>

     </div>
   </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      userName: "",
      password:""
    }
  },
  created(){

  },
  methods:{
    login: function(){
      let fd = new FormData();
      fd.append("userName",this.userName);
      fd.append("passwd",this.password);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      let data={"tel":this.userName.toString(),"password":this.password.toString()}
      this.$axios.post("/login", data).then( res => {
        alert(res.data.message)
        if(res.data.code === 0){
          this.$router.push({path:'/success'})
        }
      }).catch( res => {
        alert(res.data.message)
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body{
    background: #ffffff;
    font-family: "Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","\9ED1\4F53",Arial,sans-serif;
    color: #222;
    font-size: 12px;
  }
  *{padding: 0px;margin: 0px;}
  #login_background{
    width: 100%;
    height: 100%;
    position:fixed;
    background-size:100% 100%;
    background-color: #FFDEE9;
    background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 33%);
  }
  #login_box{
    border-radius: 20px;
    margin: 180px auto auto;
    border: 1px solid rgb(231, 231, 231);
    border-image: none;
    width: 450px;
    height: 230px;
    text-align: center;
    background-color: white;
    opacity: 50%;
  }
  /*.top_div{*/
  /*  !*background: #008ead;*!*/
  /*  width: 100%;*/
  /*  height: 200px;*/
  /*}*/
  .ipt{
    border: 1px solid #d3d3d3;
    padding: 10px 10px;
    width: 340px;
    border-radius: 4px;
    padding-left: 35px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
  }
  .ipt:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
  }
  .u_logo{
    background: url("../assets/images/phone.png") no-repeat;
    padding: 10px 10px;
    position: absolute;
    top: 43px;
    left: 40px;

  }
  .p_logo{
    background: url("../assets/images/password.png") no-repeat;
    padding: 10px 10px;
    position: absolute;
    top: 12px;
    left: 40px;
  }
  a{
    text-decoration: none;
  }
  .tou{
    background: url("../assets/images/tou.png") no-repeat;
    width: 97px;
    height: 92px;
    position: absolute;
    top: -87px;
    left: 140px;
  }
  .left_hand{
    background: url("../assets/images/left_hand.png") no-repeat;
    width: 32px;
    height: 37px;
    position: absolute;
    top: -38px;
    left: 150px;
  }
  .right_hand{
    background: url("../assets/images/right_hand.png") no-repeat;
    width: 32px;
    height: 37px;
    position: absolute;
    top: -38px;
    right: -64px;
  }
  .initial_left_hand{
    background: url("../assets/images/hand.png") no-repeat;
    width: 30px;
    height: 20px;
    position: absolute;
    top: -12px;
    left: 100px;
  }
  .initial_right_hand{
    background: url("../assets/images/hand.png") no-repeat;
    width: 30px;
    height: 20px;
    position: absolute;
    top: -12px;
    right: -112px;
  }
  .left_handing{
    background: url("../assets/images/left-handing.png") no-repeat;
    width: 30px;
    height: 20px;
    position: absolute;
    top: -24px;
    left: 139px;
  }
  .right_handinging{
    background: url("../assets/images/right_handing.png") no-repeat;
    width: 30px;
    height: 20px;
    position: absolute;
    top: -21px;
    left: 210px;
  }
  #loginBtn {
    margin-right: 30px;
    background: rgb(0, 142, 173);
    padding: 7px 10px;
    border-radius: 4px;
    border: 1px solid rgb(26, 117, 152);
    border-image: none;
    color: rgb(255, 255, 255);
    font-weight: bold;
    cursor: pointer;
  }

</style>
