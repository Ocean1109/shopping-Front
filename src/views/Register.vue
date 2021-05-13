<template>
  <div id="register_background">

    <div id="register_box">
      <p style="padding: 30px 0px 10px; position: relative;">
        <span class="phone_logo"></span>
        <input id="loginName" class="ipt" type="text" v-model="user_phone" placeholder="请输入手机号" value="telephone">
      </p>
      <p style="position: relative;">
        <span class="p_logo"></span>
        <input class="ipt" id="password" type="password" v-model="user_pwd" placeholder="请输入密码" value="password">
      </p>
      <p style="position: relative;margin-top: 10px;">
        <span class="p_logo"></span>
        <input class="ipt" id="password2" type="password" v-model="user_pwd_verify" placeholder="请输入密码" value="password">
      </p>
      <p style="position: relative;margin-top: 10px">
        <span class="u_logo"></span>
        <input class="ipt" type="text" placeholder="请输入姓名" value="username" v-model="user_name">
      </p>

      <p style="position: relative;margin-top: 10px">
        <span class="age_logo"></span>
        <input class="ipt" type="number" min="1" max="100" step="1" value="age" v-model="user_age" placeholder="年龄">
      </p>

      <p style="position: relative;margin-top: 10px">
        <span style="text-align: left">性别：</span>
        <input style="text-align: left"  type="radio" value="male" name="sex" v-model="user_sex">男
        <input type="radio" value="female" name="sex" v-model="user_sex">女
      </p>

      <div id="errorText" style="height: 20px;margin-top:10px">
        <p style="color: red;display: none">用户名密码错误请从新输入</p>
      </div>
      <div
        style="height: 50px; line-height: 50px; border-top-color: rgb(231, 231, 231); border-top-width: 1px; border-top-style: solid;">
        <!--        <p style="margin: 0px 35px 20px 45px;"><span style="float: left;"><a style="color: rgb(204, 204, 204);"-->
        <!--                                                                             href="#">忘记密码?</a></span>-->
        <router-link to='/login'>
          <span style="float: left;margin-left: 10px;font-size: 14px;">已有账号，现在登录</span>
        </router-link>

        <span style="float: right;">
              <a id="RegisterBtn" @click="register()">注册</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        user_phone: "",
        user_pwd: "",
        user_pwd_verify: "",
        user_name:"",
        user_sex:"",
        user_age:""
      }
    },
    created() {

    },
    methods: {
      register: function () {
        let data={"tel":this.user_phone,"password":this.user_pwd,"userName":this.user_name,"age":this.user_age,"gender":this.user_sex}
        if (this.user_pwd === this.user_pwd_verify) {
          this.$axios.post("/register", data).then(res => {
            if(res.data.code === 0){

              alert("创建成功")
            }else{
              alert(res.data.message)
            }
          }).catch(res => {
            alert(res.data.message)
          })
        } else {
          alert("两次输入的密码不同")
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    background: #ebebeb;
    font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
    color: #222;
    font-size: 12px;
  }

  * {
    padding: 0px;
    margin: 0px;
  }

  #register_background{
    width: 100%;
    height: 100%;
    position:fixed;
    background-size:100% 100%;
    background-color: #FFDEE9;
    background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 33%);
  }

  #register_box{
    border-radius: 20px;
    background: white;
    margin: 100px auto auto;
    border: 1px solid rgb(231, 231, 231);
    border-image: none;
    width: 450px;
    height: 400px;
    text-align: center;
    opacity: 50%;
  }

  #sex{
    text-align: left;
  }

  .ipt {
    border: 1px solid #d3d3d3;
    padding: 10px 10px;
    width: 340px;
    border-radius: 10px;
    padding-left: 35px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s
  }

  .ipt:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
  }

  .phone_logo {
    background: url("../assets/images/phone.png") no-repeat;
    padding: 10px 10px;
    position: absolute;
    top: 43px;
    left: 40px;
  }

  .p_logo {
    background: url("../assets/images/password.png") no-repeat;
    padding: 10px 10px;
    position: absolute;
    top: 12px;
    left: 40px;
  }

  .u_logo {
    background: url("../assets/images/name.png") no-repeat;
    padding: 10px 10px;
    position: absolute;
    top: 12px;
    left: 40px;
  }

  .age_logo {
    background: url("../assets/images/age.png") no-repeat;
    padding: 10px 10px;
    position: absolute;
    top: 12px;
    left: 40px;
  }

  a {
    text-decoration: none;
  }

  .tou {
    background: url("../assets/images/tou.png") no-repeat;
    width: 97px;
    height: 92px;
    position: absolute;
    top: -87px;
    left: 140px;
  }

  .left_hand {
    background: url("../assets/images/left_hand.png") no-repeat;
    width: 32px;
    height: 37px;
    position: absolute;
    top: -38px;
    left: 150px;
  }

  .right_hand {
    background: url("../assets/images/right_hand.png") no-repeat;
    width: 32px;
    height: 37px;
    position: absolute;
    top: -38px;
    right: -64px;
  }

  .initial_left_hand {
    background: url("../assets/images/hand.png") no-repeat;
    width: 30px;
    height: 20px;
    position: absolute;
    top: -12px;
    left: 100px;
  }

  .initial_right_hand {
    background: url("../assets/images/hand.png") no-repeat;
    width: 30px;
    height: 20px;
    position: absolute;
    top: -12px;
    right: -112px;
  }

  .left_handing {
    background: url("../assets/images/left-handing.png") no-repeat;
    width: 30px;
    height: 20px;
    position: absolute;
    top: -24px;
    left: 139px;
  }

  .right_handinging {
    background: url("../assets/images/right_handing.png") no-repeat;
    width: 30px;
    height: 20px;
    position: absolute;
    top: -21px;
    left: 210px;
  }

  #RegisterBtn {
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
