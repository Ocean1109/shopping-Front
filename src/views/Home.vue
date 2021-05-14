<template>
    <div class="HomeBody">
        <div class="WholePage">
            <!--头部-->
            <div class="header">
                <!--上部导航栏-->
                <header class="HeaderContainer">
                    <div class="HeaderRight">
                        <!--右上角ul-->
                        <ul class="TopNav">
                            <li>
                                <router-link to="">
                                    <span>个人中心</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="">
                                    <span>我的购物车</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="">
                                    <span>联系我们</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/login">
                                    <span>点击这里，登录</span>
                                </router-link>
                            </li>

                            <li>
                                <router-link to="/register">
                                    <span>立即注册</span>
                                </router-link>
                            </li>
                        </ul>
                        <!--上部搜索框-->
                        <section class="HeaderBottom">
                            <div class="SearchBox">
                                <input type="text"  placeholder="搜索">
                                <input type="submit" >
                            </div>
                        </section>
                    </div>
                    <h1 class="logo">
                        <img src="../assets/images/logo.png" alt="Logo" title="Logo" style="width: 60px; height: 50px" >
                        <p><span style="text-align: center; color: #8a8a8a">shopping</span></p>
                    </h1>
                </header>
            </div>
            <!--滑动图片展示层-->
            <section class="middle">
                <div class="MiddleContainer">
                    <!--滚动图片-->
                    <!--！！！！！！未实现滚动！！！！！！！-->
                    <div class="flexslider">
                        <div class="flex-viewport" >
                            <ul class="sliders">
                                <li class="clone" style="width: 640px; float: left; display: block;">
                                    <img v-model="picture_url" src="../assets/images/banner4.png" alt="Banner">
                                </li>
                                <li style="width: 640px; float: left; display: block;">
                                    <img v-model="picture_url" src="../assets/images/banner1.png" alt="Banner">
                                </li>
                                <li style="width: 640px; float: left; display: block;">
                                    <img v-model="picture_url" src="../assets/images/banner2.png" alt="Banner">
                                </li>
                                <li style="width: 640px; float: left; display: block;">
                                    <img v-model="picture_url" src="../assets/images/banner3.png" alt="Banner">
                                </li>
                                <li class="flex-active-slide" style="width: 640px; float: left; display: block;">
                                    <img v-model="picture_url" src="../assets/images/banner4.png" alt="Banner">
                                </li>
                                <li class="clone" style="width: 640px; float: left; display: block;">
                                    <img v-model="picture_url" src="../assets/images/banner1.png" alt="Banner">
                                </li>
                            </ul>
                            <ul class="flex-direction-nav">
                                <li><a class="flex-prev" href="#">Previous</a></li>
                                <li><a class="flex-next" href="#">Next</a></li>
                            </ul>
                        </div>
                    </div>
                    <ul class="BannerAdd">
                        <li class="add">
                            <a href="#">
                                <img v-model="picture_url" src="../assets/images/banner1.png" alt="add" style="width: 280px; height: 255px">
                            </a>
                        </li>
                        <li class="add">
                            <a href="#">
                                <img v-model="picture_url" src="../assets/images/banner2.png" alt="add" style="width: 280px; height: 255px">
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <!--商品列表-->
            <section class="content">
                <div class="ContentContainer">
                    <div class="FeatureBlock">
                        <div class="jcarousel-clip">
                            <ul class="GoodList">
                              <li class="Good" v-for="product in products">
                                <div v-on:click="select(product.id)">
                                  <div class="GoodImage">
                                    <img v-model="picture_url" v-bind:src="product.productImage" alt="" style="width: 180px; height: 180px;">
                                  </div>
                                  <div class="GoodDes">
                                    <p  v-model="good_des">{{product.productDesc}}</p>
                                  </div>
                                  <div class="GoodPrice" v-model="good_price">
                                    {{product.productPrice}}
                                  </div>
                                </div>
                              </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <!--底部-->
            <section class="footer">
                <div class="FooterContainer">
                    <div>
                        这是底部
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
              products:[
                {
                  // id: 0,
                  // productDesc: "乐扣乐扣（LOCK&LOCK）遇见元气保温杯弹跳咖啡杯男女办公马克杯车载大容量随行水杯子550ML黑色",
                  // productImage: "http://ocean1109.oss-cn-beijing.aliyuncs.com/my_file/c75c4b1c-b957-4cb9-a4c7-19b1c536a98a.jpg?Expires=2251615796&OSSAccessKeyId=LTAI5t6Ke7hnD9M1WF6bvhae&Signature=2i9t3Z7l1t1Frwe6VHRI7TQzqxo%3D",
                  // productPrice: 119.0
                }
              ],
                good_id:"",
                picture_url:"",
                good_des:"",
                good_price:"",
                good_name:""
            }
        },
        created() {
          const _this=this
          this.$axios.get("/product").then(res=>{
            _this.products=res.data
          })
        },
        methods:{
          select:function (productId) {
            alert(productId)
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

    .HomeBody{
        width: 100%;
        height: 100%;
        position:fixed;
        background-size:100% 100%;
        background-color: #FFDEE9;
        background-image: linear-gradient(0deg, #FFDEE9 30%, #B5FFFC 83%);
        top:0px;
        left: 0px;
        overflow:scroll
    }

    .WholePage{
        width: 1000px;
        height: 100%;
        margin-left:140px;

    }

    .header{
        padding: 3px 0px 0px;
    }
    .HeaderRight{
        float: right;
        width: 700px;
    }
    .TopNav{
        float: right;
    }
    .TopNav li{
        float: left;
        border-left: 1px solid;
        border-right: 1px solid;
        border-left-color: #cccccc;
        border-right-color: #cccccc;
    }
    .TopNav li span{
        font-size: 11px;
        color: #000000;
        float: left;
        padding: 9px 12px;
        background: #ffffff;
    }
    ul, li, h1, h2, h3, h4, h5, h6{
        list-style: none;
    }
    .HeaderBottom{
        float: left;
        padding: 37px 0px 0px;
        max-width: 650px;
    }
    .SearchBox{
        border: 1px solid #E6E6E6;
        width: 372px;
        float: left;
        margin-bottom: 10px;
    }
    .SearchBox input[type='text']{
        float: left;
        border: 0px none;
        opacity: 50%;
        height: 45px;
        width: 304px;
        padding: 0px 17px;
        font-size: 11px;
    }
    .SearchBox input[type='submit']{
        border: 0px;
        background: url('../assets/images/search.png') no-repeat center center;
        padding: 0;
        text-indent: -999em;
        width: 34px;
        height: 43px;
    }
    .logo{
        margin: 15px 0px;
        padding: 25px;
        float: left;
        width: 168px;
    }

    .middle{
        display: inline-block;
        width: 100%;
        clear: both;
        padding: 15px 0px 1px;
    }
    .MiddleContainer{
        max-width: 1000px;
        margin: 0px auto;
    }
    .flexslider{
        padding: 4px;
        background: #fff;
        box-shadow: 0px 0px 5px #999;
        float: left;
        border-radius: 5px;
        position: relative;
        max-width: 640px;
        width: 100%;
    }
    .flexslider li {
        list-style: none outside none;
        margin: 0px;
        padding: 0px;
    }
    .flex-viewport{
        overflow: hidden;
        position: relative;
        max-height: 2000px;
        -webkit-transition: all 1s ease;
        -moz-transition: all 1s ease;
        transition: all 1s ease;
    }
    .sliders{
        width: 1200%;
        transition-duration: 0s;
        transform: translate3d(-640px, 0px, 0px);
        zoom: 1;
    }
    .flex-direction-nav li {
        float: left;
    }
    .flex-prev{
        background: url("../assets/images/prev.png") no-repeat center center;
        float: left;
        width: 29px;
        height: 28px;
        text-indent: -999em;
        left: 41px;
    }
    .flex-next{
        background: url("../assets/images/next.png") no-repeat center center;
        float: left;
        width: 29px;
        height: 28px;
        text-indent: -999em;
        left: 10px;
    }
    .BannerAdd{
        float: right;
        width: 283px;
    }
    .add{
        margin-right: 55px;
    }

    .content{
        clear: both;
        padding-top: 15px;
    }
    .ContentContainer{
        position: relative;
        width: 100%;
        margin: 0 auto;
        padding: 0;
    }
    .FeatureBlock{
        float: left;
        width: 100%;
        clear: both;
        padding: 18px 0px 0px;
        border-top: 1px solid;
    }
    .jcarousel-clip{
        display: inline-block;
        overflow: hidden;
        width: 100%;
    }
    .GoodList{
        overflow: hidden;
        position: relative;
        top: 0px;
        margin: 0px;
        padding: 0px;
        left: 0px;
        width: 100%;
        float: left;
    }
    .Good{
        float: left;
        list-style: none;
        width: 180px;
        border: 1px solid #DAD8D8;
        position: relative;
        margin-bottom: 10px;
        margin-right: 10px;
    }
    .GoodImage{
        display: block;
        height: 180px;
        text-align: center;
    }
    .GoodDes{
        float: left;
        width: 100%;
        padding: 11px 0px 0px;
        border-top: 1px solid;
        color: #000;
        text-align: center;
    }
    .GoodDes p{
        font-size: 12px;
        line-height: 1.6;
        margin: 0 0 18px;
        margin-bottom: 10px;
    }
    .GoodPrice{
        display: block;
        clear: both;
        padding: 5px 10px 14px;
        font-family: Georgia;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: #000000;
    }

    .footer{
        float: left;
        width: 100%;
        clear: both;
        background: #ffffff;
        padding: 27px 0px 20px;
    }
    .FooterContainer{
        max-width: 1000px;
        margin: 0px auto;
        color: #000000;
    }
</style>
