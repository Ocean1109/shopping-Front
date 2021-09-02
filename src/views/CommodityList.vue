<template>
    <div class="ListBody">
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
        <el-row :gutter="20">
            <el-col :span="8">
                <div style="text-align: center;margin-top: 36px">
                    <!--图标，返回主页-->
                    <router-link to="/">
                        <img src="../assets/logo.png" id="picture" style="height: 60px;width: 60px">
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
                <span style="float: left;margin-top: 60px;margin-left: 286px">
                  <el-button icon="el-icon-search" circle @click="searchBtn(searchData.searchKey)"></el-button>
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
                                <span v-for="item in Type"  :key="item"
                                      @click="ChooseType(item.value)">{{item.value}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </p>
                            <p style="text-align: left;margin-left: 30px;margin-top: 30px;margin-bottom: 50px">
                                选择发货地址：
                                <span v-for="item in ProductPlace"  :key="item"
                                      @click="ChooseAddress(item.value)">{{item.value}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </p>
                        </div>
                        <!--商品展示区-->
                        <div>
                            <el-container>
                                <el-header style="height: 0px"></el-header>
                                <el-main>
                                    <div class="Product">
                                        <el-col :span="8" v-for="product in ProductItems.products" :key="product.id" @click="DetailProduct(product.id)">
                                            <img :src="product.productImage" style="height: 150px;width: 150px">
                                            <p style="text-align: left;margin-left: 20px">{{product.productDesc.substring(0,30)}}</p>
                                            <p style="margin-bottom: 20px"><span>{{product.productPrice}}</span></p>
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
                        <div v-for="(item,index) in HomeProductItems.products" :key="index">
                            <div v-if="index < 5">
                                <img :src="item.productImage" style="width: 150px;height: 150px;" @click="DetailProduct(item.id)">
                                <p style="text-align: left">{{item.productDesc.substring(0,20)}}</p>
                                <p>{{item.productPrice}}</p>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="1"></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {reactive} from "vue";
    import {useRoute, useRouter} from 'vue-router';
    import {ProductListOne, ProductListTwo, ProductListThree, allProduct, SearchProduct, keepLogin} from "../http/api";
    import GLOBAL from "../components/GlobalVariable"
    import {ElMessage} from "element-plus";

    export default {
        name: "CommodityList",
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

            //用户token和用户名
            // let UserToken = GLOBAL.token.value
            // let UserName = GLOBAL.userName.value;
            //搜索关键词
            let searchData = reactive({
                searchKey:''
            });

            //后端传来的商品列表中商品信息
            const ProductItems = reactive({
                products: []
            });

            //主页商品信息
            const HomeProductItems = reactive({
                products: []
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


            //获取主页传来的类别数据
            const route = useRoute();
            let classify = route.params.productclass;

            //按照分类获取数据
            ProductListOne(classify).then(res=> {
                    ProductItems.products = res
                }
            )

            //获取主页商品数据
            allProduct().then(res=>{
                HomeProductItems.products = res
            })

            //按照分类中的类别获取数据
            let ChooseType = (value)=>{
                ProductListTwo(classify,value).then(res=> {
                        ProductItems.products = res
                    }
                )
            }
            //按照地点获取数据
            let ChooseAddress = (value)=>{
                ProductListThree(classify,value).then(res=> {
                        ProductItems.products = res
                    }
                )
            }

            //点击照片跳转到具体页面
            let DetailProduct = (id)=>{
                router.push({name:'DetailProductInfo', params:{productid:id}})
            }

            //类别数据
            let Type = reactive(
                [
                    {
                        value:'DIOR'
                    },
                    {
                        value:'BOY'
                    },
                    {
                        value:'奥利奥'
                    },
                    {
                        value:'欧普'
                    },
                    {
                        value:'斯伯丁'
                    }
                ]
            );
            //地点数据
            let ProductPlace = reactive(
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
                        value:'广东'
                    },
                    {
                        value:'江苏'
                    }
                ]
            );

            //警告
            let Warning = ()=>{
                ElMessage.error('请先进行登录');
            }

            return{
                ProductItems,
                Type,
                ProductPlace,
                classify,
                ChooseAddress,
                ChooseType,
                searchData,
                searchBtn,
                // UserToken,
                // UserName,
                DetailProduct,
                HomeProductItems,
                Warning

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
        margin-left: 30px;
    }
    .RightBody img{
        border-radius: 10px;
        width: 200px;
        height: 200px;
    }
</style>