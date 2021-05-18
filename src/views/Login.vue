<template>
  <div class="background">
    <div class="login_box">
      <p style="padding: 30px 0px 10px; position:relative;">
        <el-input class="ipt" id="ipt_phone"
                  placeholder="请输入账号" prefix-icon="el-icon-mobile-phone" v-model="loginData.userPhone"></el-input>
      </p>
      <p>
        <el-input class="ipt" placeholder="请输入密码"
                  prefix-icon="el-icon-lock" v-model="loginData.password" show-password></el-input>
      </p>
      <router-link to='/register'>
        <el-link style="float: left;margin-left: 55px;font-size: 14px;margin-top: 50px"
                 icon="el-icon-edit" >没有账号？现在注册</el-link>
      </router-link>

      <span style="float: right;margin-top: 40px;margin-right: 55px">
        <el-button class="loginBtn" type="primary" plain @click="loginBtn">登录</el-button>
      </span>

    </div>
  </div>
</template>

<script>
  import {reactive} from 'vue'
  import { ElMessage } from 'element-plus'
  import {login} from '../http/api'
  // import router from "../router";
  export default {
    name:'Login',
    setup(){
      //前端创建的数据对象，用于接收前端的数据
      let loginData = reactive({
        userPhone:'',
        password:''
      });

      //登录按钮绑定的事件
      let loginBtn = ()=>{
        //发送到后端的数据
        let data={"tel":loginData.userPhone.toString(),"password":loginData.password.toString()};
        //判断用户名或密码是否为空
        if (!loginData.userPhone||!loginData.password){
          ElMessage.error('用户名或密码不能为空');
          return
        }
        //登录操作
        login(data).then(res=>{
          if (res.data.code===0){
            ElMessage.success('登陆成功');
          }else if(res.data.code ===1){
            alert(res.data.message)
          }else if(res.data.code ===2){
            alert(res.data.message)
          }
        }).catch( res => {
          alert(res.data.message)
        })
      };

      return{
        loginData,loginBtn
      }
    }
  }
</script>

<style scoped>
  body{
    background: #ffffff;
    font-family: "Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","\9ED1\4F53",Arial,sans-serif;
    color: #222;
    font-size: 12px;
  }
  *{padding: 0px;margin: 0px;}
  .background{
    width: 100%;
    height: 100%;
    position:fixed;
    background-size:100% 100%;
    background-color: #ffeef4;
    background-image: linear-gradient(0deg, #ffeef4 0%, #d1fffc 100%);
    top:0px;
    left: 0px;
  }
  .login_box{
    border-radius: 20px;
    margin: 180px auto auto;
    border: 1px solid rgb(231, 231, 231);
    border-image: none;
    width: 450px;
    height: 230px;
    text-align: center;
    background-color: #ffffff;
    opacity: 50%;
  }
  .ipt{
    border: 1px solid #cccccc;
    width: 340px;
    border-radius: 4px;
  }
  #ipt_phone{
    margin-top: 20px;
  }
  .loginBtn{
    background: rgb(0, 142, 173);
    color: rgb(255, 255, 255);
  }
</style>