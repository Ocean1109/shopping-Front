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
        <el-row :gutter="24">
            <el-col :span="16">
                <div style="text-align: center;margin-top: 36px">
                    <!--图标，返回主页-->
                    <router-link to="/">
                        <img src="../assets/image1.png" style="height: 60px;width: 60px">
                    </router-link>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="search_box">
                    <el-input class="ipt" placeholder="搜索" clearable prefix-icon="el-icon-search"
                              v-model="searchData.searchKey"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                    <span style="float: left;margin-top: 60px;margin-left: 270px">
                        <el-button icon="el-icon-search" circle @click="searchBtn(searchData.searchKey)"></el-button>
                    </span>
            </el-col>
        </el-row>

        <div>
            <el-row>
                <el-col :span="20">
                    <!--商品详细信息-->
                    <div style="width: 1300px;margin:30px auto">
                        <el-row>
                            <!--商品购买-->
                            <div class="productbody">
                                <!--图片-->
                                <el-col :span="11" :offset="2" style="margin-top: 30px">
                                    <img :src="DetailProduct.product.productImage" style="width: 300px;height: 300px">
                                    <el-button type="text" @click="ChatSeller(DetailProduct.product.publishUserId)">联系卖家</el-button>
                                </el-col>
                                <!--商品选购栏-->
                                <el-col :span="11" style="margin-top: 30px;margin-left: 50px">
                                    <h1 style="text-align: center">{{DetailProduct.product.productDesc}}</h1>
                                    <p style="margin-top: 30px">价格： ￥  {{DetailProduct.product.productPrice}}</p>
                                    <el-input-number v-model="ProductNum" size="middle" :min="1" :max="20" style="width: 300px;margin-top: 30px"></el-input-number>
                                    <p style="margin-top: 30px">剩余商品数量:  {{DetailProduct.product.numbers}}</p>
                                    <p style="margin-top: 30px">
                                        <span>发货地：  {{DetailProduct.product.productAddress}}</span>
                                    </p>

                                    <br>
                                    <el-button type="primary" style="margin-top: 30px" @click="ShoppingCart">加入购物车</el-button>
                                    <el-button type="success" style="margin-top: 30px;margin-left: 50px" @click="Payment">立即购买</el-button>
                                </el-col>
                            </div>

                            <!--商品详细信息展示-->
                            <div class="productbody" style="margin-top: 0px">
                                <p style="margin-top: 50px">商品参数</p>
                                <!--商品规格-->
                                <div>
                                    <el-row style="margin-top: 30px">
                                        <el-col :span="12" style="text-align: center">
                                            <div v-for="rule in DetailProduct.product.rule" :key="rule" style="margin-top: 10px">
                                                <span>{{rule}}:</span>
                                            </div>
                                        </el-col>
                                        <el-col :span="12" style="text-align: left">
                                            <div v-for="item in DetailProduct.product.productRule" :key="item" style="margin-top: 10px">
                                                <span>{{item}}</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <!--详细介绍图片-->
                                <img :src="DetailProduct.product.moreImages" style="margin-top: 50px;margin-bottom: 50px;width: 500px;height: 500px">
                            </div>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="4">
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
            </el-row>
        </div>



    </div>
</template>

<script>
    import {useRoute, useRouter} from "vue-router";
    import {reactive,ref} from "vue";
    import GLOBAL from "../components/GlobalVariable";
    import {allProduct, GetDetailProductInfo, SearchProduct, ShoppingAdd} from "../http/api";
    import {ElMessage} from "element-plus";

    export default {
        name: "DetailProductInfo",
        setup(){

            //用户token和用户名
            let UserToken = GLOBAL.token.value
            let UserName = GLOBAL.userName.value;

            //创建路由，将关键字通过路由传递到其他页面
            const router = useRouter();

            //搜索关键词
            let searchData = reactive({
                searchKey:''
            });
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

            //获取其他页面传来的商品id，作为保存
            const route = useRoute();
            let ProductId = route.params.productid;

            //后端返回的商品详细信息
            let DetailProduct = reactive({
                    product:[]
                }
            )

            //获取商品各种数据
            GetDetailProductInfo(ProductId).then(res=>{
                DetailProduct.product = res;
                console.log(res)
            })

            //商品选择的数量，购买或者加入购物车
            let ProductNum = ref(1);

            //加入购物车需要传到后端的数据
            let AddProduct = reactive({
                operate:'',
                productId:'',
                token:'',
                num:''
            })

            //添加到购物车中
            let ShoppingCart = ()=>{
                //0代表添加商品
                AddProduct.operate = 0;
                AddProduct.productId = ProductId;
                AddProduct.token = UserToken;
                AddProduct.num = ProductNum;
                ShoppingAdd(AddProduct).then(res=>{
                    if (res.success == true){
                        ElMessage.success('添加购物车成功');
                    }else{
                        alert(res.message)
                    }
                })
            }

            //主页商品信息
            const HomeProductItems = reactive({
                products: []
            })

            //获取主页商品数据
            allProduct().then(res=>{
                HomeProductItems.products = res
            })

            //结算需要返回给后端的数据
            let PayementData = reactive({
                token:'',
                productIds:[]
            })

            //立即支付
            let Payment = ()=>{
                PayementData.token = UserToken;
                PayementData.productIds[0] = ProductId;
                let OrderDataString = JSON.stringify(PayementData)
                router.push({name:'Payment', params:{order:OrderDataString,Page:1}})
            }

            //联系卖家
            let ChatSeller = (id,chatid)=>{
                router.push({name:'ChatRoom', params:{CellerUserId:id,ChatId:chatid}})
            }

            return{
                searchBtn,
                searchData,
                UserToken,
                UserName,
                DetailProduct,
                ProductId,
                ProductNum,
                AddProduct,
                ShoppingCart,
                PayementData,
                Payment,
                HomeProductItems,
                ChatSeller

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
    /*商品信息主体*/
    .productbody{
        width: 78%;
        background-color: white;
        margin-top: 20px;
        opacity: 80%;
    }
    .RightBody{
        margin-top: 50px;
        margin-left: -30px;
    }
</style>