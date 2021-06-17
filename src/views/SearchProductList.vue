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
                <div v-if="UserToken==0">
                    <router-link to="/login" style="text-decoration: none">
                        点击这里，登录
                    </router-link>
                </div>
                <div v-if="UserToken!=0">
                    <span>你好，{{UserName}}</span>
                </div>
            </el-menu-item>
            <el-menu-item index="5">
                <router-link to="/register" style="text-decoration: none">
                    立即注册
                </router-link>
            </el-menu-item>
        </el-menu>

        <!--搜索框-->
        <el-row :gutter="20">
            <el-col :span="8">
                <div style="text-align: center;margin-top: 36px">
                    <!--图标，返回主页-->
                    <router-link to="/">
                        <img src="../assets/image1.png" id="picture" style="height: 60px;width: 60px">
                    </router-link>
                </div>
            </el-col>
            <el-col :span="12"></el-col>
        </el-row>

        <!--商品展示区-->
        <div style="width: 1300px;margin: 0 auto" name="top">
            <el-row :gutter="24">
                <el-col :span="14" :offset="2">
                    <div class="ProductBody">
                        <el-container>
                            <el-header style="height: 0px"></el-header>
                            <el-main>
                                <div class="Product">
                                    <el-col :span="8" v-for="item in SearchProduct.productItems" :key="item.id" @click="DetailProduct(item.id)">
                                        <img :src="item.productImage" style="height: 150px;width: 150px">
                                        <p style="text-align: left;margin-left: 20px">{{item.productDesc.substring(0,30)}}</p>
                                        <p style="margin-bottom: 20px"><span>{{item.productPrice}}</span></p>
                                    </el-col>
                                </div>
                            </el-main>
                        </el-container>
                    </div>
                </el-col>
                <el-col :span="4" :offset="1">
                    <div class="RightBody">
                        <!--右部商品区-->
                        <div v-for="item in HomeProductItems.products" :key="item">
                            <img :src="item.productImage" style="width: 150px;height: 150px;" @click="DetailProduct(item.id)">
                            <p style="text-align: left">{{item.productDesc.substring(0,20)}}</p>
                            <p>{{item.productPrice}}</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="1"></el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    // import {reactive} from "vue"
    import {useRoute, useRouter} from "vue-router";
    import {reactive} from "vue";
    import {allProduct} from "../http/api";

    export default {
        name: "SearchProductList",
        setup(){

            //创建路由，将关键字通过路由传递到其他页面
            const router = useRouter();

            //获取购物车页面传来的商品id，作为保存
            const route = useRoute();

            //将字符串转为JSON格式
            let SearchDataString = route.params.search;

            //搜索商品信息
            let SearchData = JSON.parse(SearchDataString)


            //主页商品信息
            const HomeProductItems = reactive({
                products: []
            })

            let SearchProduct = reactive({
                productItems:[]
            })
            for (let i=0;i<SearchData.product.length;i++){
                SearchProduct.productItems[i] = SearchData.product[i]
            }

            //获取主页商品数据
            allProduct().then(res=>{
                HomeProductItems.products = res
            })

            //点击照片跳转到具体页面
            let DetailProduct = (id)=>{
                router.push({name:'DetailProductInfo', params:{productid:id}})
            }

            return{
                HomeProductItems,
                SearchProduct,
                DetailProduct
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
        margin-left: 30px;
    }
    .RightBody img{
        border-radius: 10px;
        width: 200px;
        height: 200px;
    }
</style>