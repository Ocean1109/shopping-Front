<template>
  <div class="DataHome">
    <!--导航栏-->
    <el-menu  class="el-menu-demo" mode="horizontal" >
      <el-menu-item index="0">
        <router-link to="/DataHome" style="text-decoration: none">
          数据分析
        </router-link>
      </el-menu-item>
      <el-menu-item index="1">
        <router-link to="/PersonPage" style="text-decoration: none">
          个人中心
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/ShoppingCar" style="text-decoration: none">
          我的购物车
        </router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/Communication" style="text-decoration: none">
          联系我们
        </router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <div v-if="!isLogin">
          <router-link to="/login" style="text-decoration: none">
            点击这里，登录
          </router-link>
        </div>
        <div v-if="isLogin">
          <span>你好，{{UserName}}</span>
        </div>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/register" style="text-decoration: none">
          立即注册
        </router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <span @click="SignOut" v-show="isLogin">退出登录</span>
      </el-menu-item>
    </el-menu>

    <div class="data">
      <el-container>
        <el-header style="background-color: white">
          <!--图标，返回主页-->
          <router-link to="/">
            <img src="../assets/logo.png" style="height: 60px;width: 60px">
          </router-link>
        </el-header>

        <el-row :gutter="24">
          <el-col :span="4">
            <DataSidebar :getDataSideBarChoice="getDataSideBarChoice"></DataSidebar>

          </el-col>
          <el-col :span="20">
            <div v-if="dataSideBarChoice == 1">
            <ConsumerBehavior></ConsumerBehavior>
            </div>
            <div v-if="dataSideBarChoice == 2">
              <SexStatistics></SexStatistics>
            </div>
            <div v-if="dataSideBarChoice == 3">
              <AgeStatisticsBySex></AgeStatisticsBySex>
            </div>
            <div v-if="dataSideBarChoice == 4">
              <CommoditySeries></CommoditySeries>
            </div>
            <div v-if="dataSideBarChoice == 5">
              <ChinaMap></ChinaMap>
            </div>
            <div v-if="dataSideBarChoice == 6">
              <FileEdit></FileEdit>
            </div>
          </el-col>
        </el-row>
      </el-container>
    </div>
  </div>
</template>

<script>
  import DataSidebar from "./DataSidebar";
  import {keepLogin, logOut} from "../http/api";
  import GLOBAL from "../components/GlobalVariable";
  import {ElMessage} from "element-plus";
  import AgeStatisticsBySex from "./Echarts/AgeStatisticsBySex";
  import ChinaMap from "./Echarts/ChinaMap";
  import CommoditySeries from "./Echarts/CommoditySeries";
  import ConsumerBehavior from "./Echarts/ConsumerBehavior";
  import SexStatistics from "./Echarts/SexStatistics";
  import FileEdit from "./Echarts/FileEdit";
  export default {
    name: "DataHome",
    components: {DataSidebar,AgeStatisticsBySex,ConsumerBehavior,SexStatistics,CommoditySeries,FileEdit,ChinaMap},
    mounted() {
      keepLogin().then(res=>{
        GLOBAL.token.value = res.message;
        GLOBAL.userName.value = res.userName;
        //用户token和用户名
        this.UserToken = GLOBAL.token.value;
        this.UserName = GLOBAL.userName.value;
        if(this.UserToken !== '未登录'){
          this.$store.commit('changeLoginState',{
            isLogin:true
          })
        }else{
          this.$store.commit('changeLoginState',{
            isLogin:false
          })
        }
      })
    },
    computed:{
      isLogin(){
        return this.$store.state.isLogin
      }
    },
    data(){
      return{
        dataSideBarChoice:1,
        UserToken:0,
        UserName:0
      }
    },
    methods:{
      getDataSideBarChoice(index){
        this.dataSideBarChoice=index;
      },
      //退出登录
      SignOut(){
        logOut()
        this.$store.commit('changeLoginState',{
          isLogin:false
        })
        ElMessage.success('退出成功')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  body {
    background: #b1eb83;
    font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
    color: #222;
    font-size: 12px;
  }

  * {
    padding: 0px;
    margin: 0px;
  }

  .DataHome{
    width: 100%;
    height: 100%;
    position:fixed;
    background-size:100% 100%;
    background-color: #ffeef4;
    background-image: linear-gradient(0deg, #ffeef4 0%, #d1fffc 100%);
    top:0px;
    left: 0px;
    overflow:scroll;
  }

  /*导航栏*/
  .el-menu-demo{
    float: right;
    background-color: #DCFFFD;
  }
  li.el-menu-item{
    height: 40px;
    line-height: 40px;
  }
  /*主体部分*/
  .data{
    margin-top: 50px;
    text-align: left;
  }
</style>