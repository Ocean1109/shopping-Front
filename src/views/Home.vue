<template>

  <div class="home">
    <!--导航栏-->
    <el-menu  class="el-menu-demo" mode="horizontal" >
      <el-menu-item index="1">个人中心</el-menu-item>
      <el-menu-item index="2">我的购物车</el-menu-item>
      <el-menu-item index="3">联系我们</el-menu-item>
      <el-menu-item index="4">
        <router-link to="/login" style="text-decoration: none">
          点击这里，登录
        </router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/register" style="text-decoration: none">
          立即注册
        </router-link>
      </el-menu-item>
    </el-menu>
    <!--搜索框-->
    <el-row :gutter="20">
      <el-col :span="12"></el-col>
      <el-col :span="6">
        <div class="search_box">
          <el-input class="ipt" placeholder="搜索" clearable prefix-icon="el-icon-search"
                    v-model="searchData.searchKey"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span style="float: left;margin-top: 60px;margin-left: 270px">
<!--        <el-button type="primary" plain>主要按钮</el-button>-->
          <el-button icon="el-icon-search" circle @click="searchBtn"></el-button>
      </span>
      </el-col>
    </el-row>
    <!--主体展示区-->
    <div>
      <el-container class="CommodityBody">
        <el-header style="height: 0px"></el-header>
        <el-main>
          <!--侧边导航栏-->
          <el-col :span="8">
            <el-row class="tac">
              <el-menu>
                <el-menu-item index="1">
                  <router-link to="/CommodityList" style="text-decoration: none">
                    分类1分类1分类1分类1
                  </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                  <router-link to="/CommodityList" style="text-decoration: none">
                    分类2
                  </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                  <router-link to="/CommodityList" style="text-decoration: none">
                    分类3
                  </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                  <router-link to="/CommodityList" style="text-decoration: none">
                    分类4
                  </router-link>
                </el-menu-item>
                <el-menu-item index="5">
                  <router-link to="/CommodityList" style="text-decoration: none">
                    分类5
                  </router-link>
                </el-menu-item>
              </el-menu>
            </el-row>
          </el-col>
          <!--图片走马灯-->
          <el-col :span="24">
            <div class="block">
              <el-carousel  trigger="click" style="margin-top: 30px;width: 420px" height="280px">
                <el-carousel-item>
                  <img src="../assets/image1.png">
                </el-carousel-item>
                <el-carousel-item>
                  <img src="../assets/image2.png">
                </el-carousel-item>
                <el-carousel-item>
                  <img src="../assets/image3.png">
                </el-carousel-item>
                <!--          <el-carousel-item v-for="item in 4" :key="item">-->
                <!--            <img src="../assets/image1.png">-->
                <!--            <h3 class="small">{{ item }}</h3>-->
                <!--          </el-carousel-item>-->
                <el-carousel-item>
                  <img src="../assets/image4.png">
                </el-carousel-item>
              </el-carousel>
            </div>

            <!--走马灯下部优惠区-->
            <div class="BlockBottom">
              <el-row>
                <el-col :span="12"><img src="../assets/image1.png" style="width: 210px"></el-col>
                <el-col :span="12"><img src="../assets/image3.png" style="width: 210px"></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <!--走马灯右侧宣传区-->
            <div class="BlockRight">
              <img src="../assets/image2.png" style="height: 280px;width: 210px;margin-right: 110px">
              <img src="../assets/image4.png" style="height: 140px;width: 210px;margin-top: 20px;margin-right: 110px">
            </div>
          </el-col>
        </el-main>
        <el-main>
          <!--商品列表展示区-->
          <div class="ListBody">
            <el-col :span="4" v-for="(product,index) in testData" :key="index">
              <img :src="product.goodimg" style="height: 150px;width: 150px">
              <p style="text-align: left;margin-left: 20px">{{product.goodtext}}</p>
              <p style="margin-bottom: 20px"><span>{{product.goodprice}}</span></p>
<!--              <p style="display: none">{{index}}</p>-->
            </el-col>
<!--            <el-col :span="4">-->
<!--              <img src="../assets/image1.png" style="height: 150px;width: 150px">-->
<!--            </el-col>-->
<!--            <el-col :span="4">-->
<!--              <img src="../assets/image1.png" style="height: 150px;width: 150px">-->
<!--            </el-col>-->
<!--            <el-col :span="4">-->
<!--              <img src="../assets/image1.png" style="height: 150px;width: 150px">-->
<!--            </el-col>-->
<!--            <el-col :span="4">-->
<!--              <img src="../assets/image1.png" style="height: 150px;width: 150px">-->
<!--            </el-col>-->
<!--            <el-col :span="4">-->
<!--              <img src="../../public/image1.png" style="height: 150px;width: 150px">-->
<!--            </el-col>-->
          </div>
        </el-main>
      </el-container>
    </div>
  </div>

</template>

<script>
  import {reactive} from 'vue'
  import router from "../router";
  //全局变量
  const serverSrc='www.baidu.com';
  const token='12345678';
  const hasEnter=false;
  const userSite="中国钓鱼岛";
  export const Home_ ={
    userSite,//用户地址
    token,//用户token身份
    serverSrc,//服务器地址
    hasEnter,//用户登录状态
  };
  export default{

    name: 'Home',
    setup(){
      let searchData = reactive({
        searchKey:''
      });


      // let Data = reactive([
      //
      // ])
      let testData = reactive([
        {
          goodimg:'../../image1.png',
          goodtext: '商品1',
          goodprice: 100
        },
        {
          goodimg:'../../image2.png',
          goodtext: '商品2',
          goodprice: 200
        },
        {
          goodimg:'../../image3.png',
          goodtext: '商品3',
          goodprice: 300
        },
        {
          goodimg:'../../image4.png',
          goodtext: '商品4',
          goodprice: 400
        },
        {
          goodimg:'../../image1.png',
          goodtext: '商品5',
          goodprice: 500
        },
        {
          goodimg:'../../image1.png',
          goodtext: '商品6',
          goodprice: 600
        },
        {
          goodimg:'../../image1.png',
          goodtext: '商品7',
          goodprice: 600
        },
        {
          goodimg:'../../image1.png',
          goodtext: '商品8',
          goodprice: 600
        }

      ]);

      let searchBtn =()=>{
        router.push({path:'/CommodityList'})
      };
      return{
        searchData,searchBtn,testData
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
  .home{
    width: 100%;
    height: 100%;
    position:fixed;
    background-size:100% 100%;
    background-color: #ffeef4;
    background-image: linear-gradient(0deg, #ffeef4 0%, #d1fffc 100%);
    top:0px;
    left: 0px;
    overflow:scroll
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
  /*搜索框*/
  .search_box{
    width: 450px;
    margin: 60px auto 0px;
    opacity: 80%;
  }
  /*商品主体部分*/
  .CommodityBody{
    border-radius: 10px;
    width: 90%;
    background-color: white;
    margin: 20px auto;
    height: 90%;
    opacity: 80%;
  }
  /*侧边导航栏*/
  .tac{
    margin-top: 30px;
  }
  a{
    color: black;
  }
  /*图片走马灯*/
  .block{
    width: 420px;
    margin: 0px 50px;
  }
  /*底部优惠区*/
  .BlockBottom{
    width: 420px;
    margin: 20px 50px;
  }
  img{
    border-radius: 20px;
  }
  /*右边优惠区*/
  .BlockRight{
    margin-top: 30px;
  }
  /*下部商品展示区*/
  .ListBody{
    margin-left: 20px;
  }
  .ListBody img{
    margin-left: 20px;
  }
</style>
<style>
  input.el-input__inner{
    border-radius: 20px;

  }
</style>