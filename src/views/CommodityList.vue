<template>
    <div class="ListBody">
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
        <el-row :gutter="20">
            <el-col :span="6" :offset="12">
                <div class="search_box">
                    <el-input class="ipt" placeholder="搜索" clearable prefix-icon="el-icon-search"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <span style="float: left;margin-top: 60px;margin-left: 270px">
                  <el-button icon="el-icon-search" circle ></el-button>
                </span>
            </el-col>
        </el-row>
        <!--商品列表-->
        <div style="width: 1300px;margin: 0 auto" name="top">
            <!--类别查找栏-->
            <el-row :gutter="24">
                <el-col :span="14" :offset="2">
                    <div class="ProductBody">
                        <div>
                            <p style="text-align: left;margin-left: 30px;margin-top: 30px;line-height: 75px">
                                品牌：
                                <span v-for="item in testdata"  :key="item">{{item.value}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </p>
                            <p style="text-align: left;margin-left: 30px;margin-top: 30px;margin-bottom: 50px">
                                选择发货地址：
                                <span v-for="item in testplace"  :key="item">{{item.value}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </p>
                        </div>
                        <!--商品展示区-->
                        <div>
                            <el-container>
                                <el-header style="height: 0px"></el-header>
                                <el-main>
                                    <div class="Product">
                                        <el-col :span="4" v-for="product in ProductItems.products" :key="product.id">
                                            <img :src="product.productImage" style="height: 150px;width: 150px">
                                            <p style="text-align: left;margin-left: 20px">{{product.productDesc}}</p>
                                            <p style="margin-bottom: 20px"><span>{{product.productPrice}}</span></p>
                                        </el-col>

                                        <!--测试数据-->
                                        <el-col v-for="product in testdata2" :key="product">
                                            <img src="../assets/image1.png" style="height: 150px;width: 150px">
                                            <p style="text-align: left;margin-left: 20px">{{product.text}}</p>
                                            <p style="margin-bottom: 20px"><span>{{product.price}}</span></p>
                                        </el-col>

                                    </div>
                                </el-main>
                            </el-container>
                        </div>
                    </div>
                </el-col>
                <el-col :span="4" :offset="1">
                    <div class="RightBody">
                        <!--右部商品区-->
                        <div v-for="item in testdata1" :key="item">
                            <img src="../assets/image1.png">
                            <p>{{item.text}}</p>
                            <p>{{item.price}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="1">
                    <!--



                        ！！！！！！
                        瞄点
                        ！！！！！！



                    -->
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
    import {reactive} from "vue";
    import {useRoute} from 'vue-router';
    export default {
        name: "CommodityList",
        setup(){

            //后端传来的商品列表中商品信息
            const ProductItems = reactive({
                products: []
            });

            //测试数据
            //类别测试数据
            let testdata = reactive(
                [
                    {
                        value:'类别1'
                    },
                    {
                        value:'类别2'
                    },
                    {
                        value:'类别3'
                    },
                    {
                        value:'类别4'
                    },
                    {
                        value:'类别5'
                    }
                ]
            );
            //地点测试数据
            let testplace = reactive(
                [
                    {
                        value:'北京'
                    },
                    {
                        value:'天津'
                    },
                    {
                        value:'上海'
                    },
                    {
                        value:'重庆'
                    },
                    {
                        value:'深圳'
                    }
                ]
            );
            //右部图片测试数据
            let testdata1 = reactive(
                [
                    {
                        img:'/public/image1.png',
                        price:'600',
                        text:'商品1'
                    },
                    {
                        img:'/public/image2.png',
                        price:'600',
                        text:'商品2'
                    },
                    {
                        img:'/public/image3.png',
                        price:'600',
                        text:'商品3'
                    }
                ]
            )
            //主体图片测试数据
            let testdata2 = reactive([
                {
                    img:'/public/image1.png',
                    price:'600',
                    text:'商品1'
                },
                {
                    img:'/public/image2.png',
                    price:'600',
                    text:'商品2'
                },
                {
                    img:'/public/image3.png',
                    price:'600',
                    text:'商品3'
                },
                {
                    img:'/public/image3.png',
                    price:'600',
                    text:'商品4'
                },
                {
                    img:'/public/image3.png',
                    price:'600',
                    text:'商品5'
                },
                {
                    img:'/public/image3.png',
                    price:'600',
                    text:'商品6'
                }
            ])
            const route = useRoute();
            let id = route.params.productclass;
            console.log(id);
            return{
                ProductItems,
                testdata,
                testplace,
                id,
                testdata1,
                testdata2
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
    .ListBody{
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
    /*主体商品区域*/
    .ProductBody{
        border-radius: 10px;
        width: 110%;
        background-color: white;
        margin-top: 20px;
        opacity: 80%;
    }
    /*主体商品展示*/
    .Product{
        margin-left: 20px;
    }
    .Product img{
        margin-left: 20px;
    }
    /*右部商品展示*/
    .RightBody{
        margin-top: 30px;
    }
    .RightBody img{
        border-radius: 10px;
        width: 200px;
        height: 200px;
    }
</style>