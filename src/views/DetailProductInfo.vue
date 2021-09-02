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
            <el-col :span="16">
                <div style="text-align: center;margin-top: 36px">
                    <!--图标，返回主页-->
                    <router-link to="/">
                        <img src="../assets/logo.png" style="height: 60px;width: 60px">
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
                <el-col :span="20" :offset="2">
                    <!--商品详细信息-->
                    <div style="width: 1300px;margin:30px auto">
                        <el-row>
                            <!--商品购买-->
                            <div class="productbody">
                                <!--图片-->
                                <el-col :span="11" :offset="2" style="margin-top: 30px">
                                    <img :src="DetailProduct.product.productImage" style="width: 300px;height: 300px">

                                    <el-button type="text"
                                               @click="ChatSeller(DetailProduct.product.publishUserId,DetailProduct.product.id)">联系卖家</el-button>
                                </el-col>
                                <!--商品选购栏-->
                                <el-col :span="11" style="margin-top: 30px;margin-left: 50px">
                                    <h1 style="text-align: center">{{DetailProduct.product.productDesc}}</h1>
                                    <p style="margin-top: 30px">价格： ￥  {{DetailProduct.product.productPrice}}</p>
                                    <el-input-number v-model="ProductNum" size="middle" :min="1" :max="10000" style="width: 300px;margin-top: 30px"></el-input-number>
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
                                <h3 style="margin-top: 50px;margin-bottom: 30px">商品参数</h3>
                                <!--商品规格-->
                                <div v-if="DetailProduct.product.rule != null || DetailProduct.product.productRule !=null">
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
                                <div v-if="DetailProduct.product.rule == null && DetailProduct.product.productRule ==null">
                                    <p>无具体商品参数</p>
                                </div>
                                <!--详细介绍图片-->
                                <div v-for="picture in DetailProduct.product.moreImages" :key="picture">
                                    <img :src="picture" style="margin-top: 50px;margin-bottom: 50px;width: 500px">
                                </div>

                            </div>
                        </el-row>
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
    import {GetDetailProductInfo, SearchProduct, ShoppingAdd, CreateChat, keepLogin} from "../http/api";
    import {ElMessage} from "element-plus";

    export default {
        name: "DetailProductInfo",
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
            let userToken = GLOBAL.token.value
            let userName = GLOBAL.userName.value;
            console.log(userToken)

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
                console.log(DetailProduct.product)
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
                AddProduct.token = userToken;
                AddProduct.num = ProductNum;
                if (ProductNum.value > DetailProduct.product.numbers){
                    ElMessage.error('库存不足');
                    ProductNum.value = DetailProduct.product.numbers
                }
                else {
                    ShoppingAdd(AddProduct).then(res => {
                        if (res.success == true) {
                            ElMessage.success('添加购物车成功');
                        } else {
                            alert(res.message)
                        }
                    })
                }
            }

            //结算需要返回给后端的数据
            let PayementData = reactive({
                token:'',
                productIds:[],
                num:[]
            })

            //立即支付
            let Payment = ()=>{
                if (ProductNum.value > DetailProduct.product.numbers){
                    ElMessage.error('库存不足');
                    ProductNum.value = DetailProduct.product.numbers
                }
                else {

                    PayementData.token = userToken;
                    PayementData.productIds[0] = ProductId;
                    PayementData.num[0] = ProductNum.value;
                    let OrderDataString = JSON.stringify(PayementData)
                    router.push({name: 'Payment', params: {order: OrderDataString, Page: 1}})
                }
            }

            //联系卖家
            let ChatSeller = (userid,productid)=>{
                if (userToken != '未登录'){
                    let formdata = new FormData()
                    formdata.append("businessId",userid)
                    formdata.append("token",userToken)
                    formdata.append("productId",productid)
                    let chatid = ""
                    CreateChat(formdata).then(res=>{
                        if (res === -1){
                            ElMessage.error('卖买家不能是一个人');
                        }
                        else {
                            chatid = res
                            router.push({name:'ChatRoom', params:{CellerUserId:userid,ChatId:chatid}})
                        }

                    })
                }else{
                    ElMessage.error('请先进行登录')
                }

            }


            //警告
            let Warning = ()=>{
                ElMessage.error('请先进行登录');
            }
            return{
                searchBtn,
                searchData,
                userToken,
                userName,
                DetailProduct,
                ProductId,
                ProductNum,
                AddProduct,
                ShoppingCart,
                PayementData,
                Payment,
                ChatSeller,
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