<template>

  <div class="home">
    <!--导航栏-->
    <el-menu  class="el-menu-demo" mode="horizontal" >
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
    <el-row :gutter="24">
      <el-col :span="6" :offset="12">
        <div class="search_box">
          <el-input class="ipt" placeholder="搜索" clearable prefix-icon="el-icon-search"
                    v-model="searchData.searchKey"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span style="float: left;margin-top: 60px;margin-left: 270px">
          <el-button icon="el-icon-search" circle @click="searchBtn"></el-button>
      </span>
      </el-col>
    </el-row>
    <!--主体展示区-->
    <div style="width: 1300px;margin: 0 auto">
      <el-container class="CommodityBody">
        <el-header style="height: 0px"></el-header>
        <el-main>
          <!--侧边导航栏-->
          <el-col :span="8">
            <el-row class="tac">
              <el-menu>





                <!--
                  ！！！！！！
                  单个分类
                  ！！！！！！
                -->





                <el-menu-item index="1">
                  <span @click="para" class="sa"
                        v-for="category in ProductCategory1" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
                <el-menu-item index="2">
                  <span @click="para"
                        v-for="category in ProductCategory2" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
                <el-menu-item index="3">
                  <span @click="para"
                        v-for="category in ProductCategory3" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
                <el-menu-item index="4">
                 <span @click="para"
                       v-for="category in ProductCategory4" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
                <el-menu-item index="5">
                  <span @click="para"
                        v-for="category in ProductCategory5" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
              </el-menu>
            </el-row>
          </el-col>
          <!--图片走马灯-->
          <el-col :span="24">
            <div class="block" style="margin-left: 35px">
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
                <el-carousel-item>
                  <img src="../assets/image4.png">
                </el-carousel-item>
              </el-carousel>
            </div>

            <!--走马灯下部优惠区-->
            <div class="BlockBottom" style="margin-left: 35px">
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
            <el-col :span="4" v-for="product in ProductItems.products" :key="product.id">
              <img :src="product.productImage" style="height: 150px;width: 150px">
              <p style="text-align: left;margin-left: 20px">{{product.productDesc}}</p>
              <p style="margin-bottom: 20px"><span>{{product.productPrice}}</span></p>
            </el-col>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>

</template>

<script>
  import {reactive} from 'vue'
  // import router from "../router";
  import {allProduct} from "../http/api"
  import {useRouter} from 'vue-router';
  export default{

    name: 'Home',
    setup(){
      //搜索关键词
      let searchData = reactive({
        searchKey:''
      });

      //分类数组
      let ProductCategory1 = reactive(
              [
                {value:'女装'},
                {value:'内衣'},
                {value:'家居'},
              ]
      );
      let ProductCategory2 = reactive(
              [
                {value:'男装'},
                {value:'户外运动'},
              ]
      );
      let ProductCategory3 = reactive(
              [
                {value:'手机'},
                {value:'数码'},
                {value:'企业'},
              ]
      );
      let ProductCategory4 = reactive(
              [
                {value:'美妆'},
                {value:'彩妆'},
                {value:'个护'},
              ]
      );
      let ProductCategory5 = reactive(
              [
                {value:'零食'},
                {value:'生鲜'},
                {value:'茶酒'},
              ]
      );
      //后端传来的商品列表中商品信息
      const ProductItems = reactive({
        products: []
      })

      //交互，从后端传来的数据
      allProduct().then(res=>{
        ProductItems.products=res
      })

      const router = useRouter();
      //绑定提交事件
      let searchBtn =()=>{
        router.push({path:'/CommodityList'})
      };

      //测试
      //将关键词发送到后端

      let data1 = document.getElementsByClassName('sa');
      let para =()=>{
        router.push({name:'Commodity', params:{productclass:data1}})
        console.log(data1)
      }

      return{
        searchData,
        searchBtn,
        ProductItems,
        para,
        ProductCategory1,
        ProductCategory2,
        ProductCategory3,
        ProductCategory4,
        ProductCategory5,
        data1
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
