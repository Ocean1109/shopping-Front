<template>

  <div class="home">
    <!--导航栏-->
    <el-menu  class="el-menu-demo" mode="horizontal" >
      <el-menu-item index="1">
        <div v-if="UserToken !='未登录'">
          <router-link to="/PersonPage" style="text-decoration: none">
            个人中心
          </router-link>
        </div>
        <div v-if="UserToken =='未登录'">
          <span @click="Warning">个人中心</span>
        </div>
      </el-menu-item>
      <el-menu-item index="2">
        <div v-if="UserToken !='未登录'">
          <router-link to="/ShoppingCar" style="text-decoration: none">
            我的购物车
          </router-link>
        </div>
        <div v-if="UserToken =='未登录'">
          <span @click="Warning">我的购物车</span>
        </div>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/Communication" style="text-decoration: none">
          联系我们
        </router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <div v-if="UserToken=='未登录'">
          <router-link to="/login" style="text-decoration: none">
            点击这里，登录
          </router-link>
        </div>
        <div v-if="UserToken!='未登录'">
          <span>你好，{{UserName}}</span>
        </div>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/register" style="text-decoration: none">
          立即注册
        </router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <span @click="SignOut">退出登录</span>
      </el-menu-item>
    </el-menu>
    <!--搜索框-->
    <el-row :gutter="24">
      <el-col :span="12">
        <div style="text-align: center;margin-top: 36px">
          <!--图标-->
          <router-link to="/">
            <img src="../assets/logo.png" style="height: 60px;width: 60px;border-radius: 0px">
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="search_box">
          <el-input class="ipt" placeholder="搜索" clearable prefix-icon="el-icon-search"
                    v-model="searchData.searchKey"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <span style="float: left;margin-top: 60px;margin-left: 270px">
          <el-button icon="el-icon-search" circle @click="searchBtn(searchData.searchKey)"></el-button>
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
                <el-menu-item index="1">
                  <span @click="keyword(category.value)"
                        v-for="category in ProductCategory1" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
                <el-menu-item index="2">
                  <span @click="keyword(category.value)"
                        v-for="category in ProductCategory2" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
                <el-menu-item index="3">
                  <span @click="keyword(category.value)"
                        v-for="category in ProductCategory3" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
                <el-menu-item index="4">
                 <span @click="keyword(category.value)"
                       v-for="category in ProductCategory4" :key="category">{{category.value}} /
                  </span>
                </el-menu-item>
                <el-menu-item index="5">
                  <span @click="keyword(category.value)"
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
                  <img src="../assets/AMD处理器.jpg" style="width: 420px;height: 280px" @click="DetailProduct(12)">
                </el-carousel-item>
                <el-carousel-item>
                  <img src="../assets/BOY衬衫.jpg" style="width: 420px;height: 280px" @click="DetailProduct(13)">
                </el-carousel-item>
                <el-carousel-item>
                  <img src="../assets/DIOR口红.jpg" style="width: 420px;height: 280px" @click="DetailProduct(14)">
                </el-carousel-item>
                <el-carousel-item>
                  <img src="../assets/奥利奥.jpg" style="width: 420px;height: 280px" @click="DetailProduct(15)">
                </el-carousel-item>
              </el-carousel>
            </div>

            <!--走马灯下部优惠区-->
            <div class="BlockBottom" style="margin-left: 35px">
              <el-row>
                <el-col :span="12"><img src="../assets/篮球.jpg" style="width: 210px;height: 140px" @click="DetailProduct(16)"></el-col>
                <el-col :span="12"><img src="../assets/欧普灯.jpg" style="width: 210px;height: 140px" @click="DetailProduct(17)"></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <!--走马灯右侧宣传区-->
            <div class="BlockRight">
              <img src="../assets/手表.jpg" style="height: 140px;width: 210px;margin-right: 110px" @click="DetailProduct(18)">
              <img src="../assets/书籍.jpg" style="height: 140px;width: 210px;margin-right: 110px" @click="DetailProduct(19)">
              <img src="../assets/洗衣液.jpg" style="height: 140px;width: 210px;margin-top: 20px;margin-right: 110px"
                   @click="DetailProduct(20)">
            </div>
          </el-col>
        </el-main>
        <el-main>
          <!--商品列表展示区-->
          <div class="ListBody">
            <el-row :gutter="24">
              <el-col :span="8" v-for="(product,index) in ProductItems.products" :key="product.id">
                <div v-if="index<20">
                  <img :src="product.productImage" style="height: 150px;width: 150px" @click="DetailProduct(product.id)">
                  <p style="text-align: left;margin-left: 20px">{{product.productDesc.substring(0,30)}}</p>
                  <p style="margin-bottom: 20px"><span>{{product.productPrice}}</span></p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>

</template>

<script>
  import {reactive} from 'vue'
  import {allProduct, SearchProduct,keepLogin} from "../http/api"
  import {useRouter} from 'vue-router';
  import GLOBAL from "../components/GlobalVariable"
  import {ElMessage} from "element-plus";
  export default{

    name: 'Home',
    beforeCreate() {
      keepLogin().then(res=>{
        GLOBAL.token.value = res.message;
        GLOBAL.userName.value = res.userName;
        //用户token和用户名
        this.UserToken = GLOBAL.token.value;
        this.UserName = GLOBAL.userName.value;
        // console.log(this.UserToken)
      })
    },
    data(){
      return{
        UserToken:0,
        UserName:0
      }
    },
    setup(){
      //搜索关键词
      let searchData = reactive({
        searchKey:''
      });

      //分类数组
      let ProductCategory1 = reactive(
              [
                {value:'生活日用'},
                {value:'食品'},
              ]
      );
      let ProductCategory2 = reactive(
              [
                {value:'五金用品'},
                {value:'钟表'},
              ]
      );
      let ProductCategory3 = reactive(
              [
                {value:'男装'},
                {value:'美妆'},
                {value:'运动'},
              ]
      );
      let ProductCategory4 = reactive(
              [
                {value:'电子产品'},
                {value:'书籍'},
              ]
      );
      let ProductCategory5 = reactive(
              [
                {value:'家居建材'},
                {value:'周边'},
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


      //创建路由，将关键字通过路由传递到其他页面
      const router = useRouter();

      //搜索信息
      let SearchData = reactive({
        product:[]
      })

      //搜索功能
      let searchBtn =(name)=>{
        let NameFormData = new FormData()
        NameFormData.append("productName",name)
        SearchProduct(NameFormData).then(res=>{
          SearchData.product = res
          let SearchDataString = JSON.stringify(SearchData)
          router.push({name:'SearchProductList', params:{search:SearchDataString}})
        })
      };

      //将关键词发送到后端
      let keyword =(value)=>{
        router.push({name:'Commodity', params:{productclass:value}})
        console.log(value)
      }

      //点击照片跳转到具体页面
      let DetailProduct = (id)=>{
        router.push({name:'DetailProductInfo', params:{productid:id}})
      }

      //警告
      let Warning = ()=>{
        ElMessage.error('请先进行登录');
      }

      //退出登录
      let SignOut = ()=>{

        ElMessage.success('退出成功')
        router.push('/')
      }
      return{
        searchData,
        searchBtn,
        ProductItems,
        keyword,
        DetailProduct,
        ProductCategory1,
        ProductCategory2,
        ProductCategory3,
        ProductCategory4,
        ProductCategory5,
        Warning,
        SignOut
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
