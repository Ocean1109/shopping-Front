<template>
  <div class="background">
    <div class="login_box">
      <el-image
          class="myImage"
          style="width: 100px; height: 100px"
          :src="require('../assets/shoppingIcon.png')"
          fit="fill"></el-image>
      <p style="padding: 30px 0px 10px; position:relative;">
        <el-autocomplete
            :popper-append-to-body="false"
            id="ipt_phone"
            style="border-radius: 20px"
            prefix-icon="el-icon-mobile-phone"
            class="ipt"
            v-model="loginData.userPhone"
            :fetch-suggestions="querySearch"
            placeholder="请输入账号"
            @select="handleSelect"
            @keyup.enter="loginBtn"
        ></el-autocomplete>
<!--        <el-input class="ipt"-->
<!--                  id="ipt_phone"-->
<!--                  style="border-radius: 20px"-->
<!--                  placeholder="请输入账号"-->
<!--                  prefix-icon="el-icon-mobile-phone"-->
<!--                  v-model="loginData.userPhone"></el-input>-->
      </p>
      <p>
        <el-input class="ipt"
                  placeholder="请输入密码"
                  style="border-radius: 20px"
                  prefix-icon="el-icon-lock"
                  v-model="loginData.password"
                  show-password
                  @keyup.enter="loginBtn"></el-input>
      </p>
      <router-link to='/register'>
        <el-link style="float: left;margin-left: 55px;font-size: 14px;margin-top: 50px"
                 icon="el-icon-edit" >没有账号？现在注册</el-link>
      </router-link>

      <span style="float: right;margin-top: 40px;margin-right: 55px">
        <el-button class="loginBtn" type="primary" plain @click="loginBtn">登录</el-button>
      </span>

      <!--      <p>{{Home_.token}}</p>-->
    </div>
  </div>
</template>

<script>
  import {reactive} from 'vue'
  import { ElMessage } from 'element-plus'
  import {login} from '../http/api'
  import router from "../router";
  import store from "../store"
  import GLOBAL from "../components/GlobalVariable"
  export default {
    name:'Login',

    setup(){
      //前端创建的数据对象，用于接收前端的数据
      let loginData = reactive({
        userPhone:'',
        password:'',
      });
      let userList = reactive([])
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
          if (res.code===0){
            let newData = {value:loginData.userPhone}
            userList=userList.filter((item)=>{
               return item.value !== newData.value
            })
            userList.unshift(newData)
            window.localStorage.setItem('userList',JSON.stringify(userList))
            ElMessage.success('登陆成功');
            store.commit('changeLoginState',{
              isLogin:true
            })
            GLOBAL.token.value = res.message;
            GLOBAL.userName.value = res.userName;
            router.push({path:'/'})
          }else if(res.code ===1){
            alert(res.message)
          }else if(res.code ===2){
            alert(res.message)
          }
        }).catch( res => {
          alert(res.message)

        })
      };


      const querySearch = (queryString, cb) => {
        var results = queryString
            ? loadAll().filter(createFilter(queryString))
            : loadAll();
        // 调用 callback 返回建议列表的数据
        cb(results);
      };
      const createFilter = (queryString) => {
        return (userList) => {
          return (
              userList.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
              0
          );
        };
      };
      const loadAll = () => {
        if(window.localStorage.getItem("userList")){
          userList = JSON.parse(window.localStorage.getItem("userList"))
          return userList
        }
        return []
      };
      const handleSelect = (item) => {
        console.log(item);
      };

      return {
        querySearch,
        createFilter,
        loadAll,
        handleSelect,
        loginData,
        loginBtn,
        userList
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
    border: 1px solid rgb(231, 231, 231);
    border-image: none;
    width: 500px;
    height: 350px;
    text-align: center;
    background-color: #ffffff;
    opacity: 50%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  /deep/ .ipt{
    border: 1px solid #cccccc;
    width: 340px!important;
  }
  #ipt_phone{
    margin-top: 20px;
  }
  .loginBtn{
    background: rgb(0, 142, 173);
    color: rgb(255, 255, 255);
  }
</style>
