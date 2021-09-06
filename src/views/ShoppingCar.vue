<template>
    <div class="home">
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
            <el-menu-item index="2">我的购物车</el-menu-item>
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
                    <span style="float: left;margin-top: 60px;margin-left: 286px">
                        <el-button icon="el-icon-search" circle @click="searchBtn(searchData.searchKey)"></el-button>
                    </span>
            </el-col>
        </el-row>
        <!--购物车中的商品-->

        <div class="ListBody">
            <h3 style="margin-top: 20px;margin-left: 20px;;margin-bottom: 20px">全部商品</h3>
            <hr>
            <!--购物车商品顶部-->
            <el-row :gutter="24">
                <el-col :span="9">
                    <span>商品信息</span>
                </el-col>
                <el-col :span="4">
                    <span>单价</span>
                </el-col>
                <el-col :span="4">
                    <span>数量</span>
                </el-col>
                <el-col :span="4">
                    <span>金额</span>
                </el-col>
                <el-col :span="3">
                    <span>操作</span>
                </el-col>
            </el-row>
            <!--详细商品-->
            <div>
                <p id="Explain" style="height: 50px;line-height: 50px">{{Message}}</p>
            </div>
            <div class="product"  v-for="(item,index) in ShoppingCartProduct.Product" :id="forId(index)" :key="index">
                <el-row>
                    <el-col :span="1">
                        <img id="choose" src="../assets/choose.png" style="width: 20px;height: 20px" @click="Choose(forId(index),index)">
                    </el-col>
                    <el-col :span="3" style="height: 150px">
                        <img :src="item.image" style="width: 130px;height: 130px;margin-top: 10px" @click="ProductDesc(item.id)">
                    </el-col>
                    <el-col :span="5" style="height: 150px;text-align: left;line-height: 40px">
                        <span>{{item.name}}</span>
                    </el-col>
                    <el-col :span="4" style="height: 150px">
                        <span>{{item.price}}</span>
                    </el-col>
                    <el-col :span="4" style="height: 150px">
                        <el-input-number size="mini" v-model="item.productNumber" :min="1" @click="ChangeNum(index)"></el-input-number>
                    </el-col>
                    <el-col :span="4" style="height: 150px">
                        <span>{{item.productNumber*item.price}}</span>
                    </el-col>
                    <el-col :span="3" style="height: 150px">
                        <el-button id="ProductID" type="text" @click="Delete(index)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--底部结算栏-->
        <el-affix position="bottom" >
            <div class="Bottom">
                <el-row :gutter="24" style="margin-right: 0px;margin-left: 0px">
                    <el-col :span="3" style="background-color: #d1fffc" @click="ChooseAll()">
                        <el-button type="text" style="color: black;font-size: 15px">全选</el-button>
                    </el-col>
                    <el-col :span="3" style="background-color: #ebebeb" @click="Cancel()">
                        <el-button type="text" style="color: black;font-size: 15px">取消</el-button>
                    </el-col>
                    <el-col :span="3" :offset="9">
                        已选商品{{PurchaseNum}}件
                    </el-col>
                    <el-col :span="3">
                        合计：{{Amount}}
                    </el-col>
                    <el-col :span="3" style="background-color: #f0cdd8" @click="pay()">
                        <el-button type="text" style="color: black;font-size: 15px">结算</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-affix>
    </div>

</template>

<script>
    import {reactive,ref} from 'vue'
    import {useRoute, useRouter} from "vue-router";
    import GLOBAL from "../components/GlobalVariable"
    import {ShoppingUserToken, ShoppingChange, SearchProduct, keepLogin, logOut} from "../http/api";
    import {ElMessage} from "element-plus";

    export default {
        name: "ShoppingCar",
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

            //声明购物车商品信息——从后端获取
            let ShoppingCartProduct = reactive({
                Product: []
            })

            //购物车中的修改数据
            let ModifyData = reactive(
                {
                    operate:'',
                    productId:'',
                    token:'',
                    num:''
                }
            )

            //用户token和用户名
            let userToken = GLOBAL.token.value
            let userName = GLOBAL.userName.value;

            //获取cookie中的token
            let Cookie = document.cookie;
            let Cookie_temp = Cookie.split(';')
            for (let i=0;i<Cookie_temp.length;i++){
                let Cookie_single = Cookie_temp[i].split('=');
                //trim()删除字符串的头尾空白符
                if (Cookie_single[0].trim() === "token"){
                    let Cookie_fin = Cookie_single[1]
                    userToken = Cookie_fin
                }
            }

            const formData=new FormData();
            formData.append("token",userToken.toString());
            ModifyData.token = userToken;

            let Message = ref();

            //购物车商品数量最初状态
            let ProductNumArray = [];

            //将用户token传递到后端，并且获取该用户购物车的信息
            ShoppingUserToken(formData).then(res=>{
                console.log(formData)
                ShoppingCartProduct.Product = res;
                console.log(ShoppingCartProduct.Product)
                //判断购物车是否为空
                if(ShoppingCartProduct.Product.length == 0){
                    Message.value = "购物车为空"
                }
                //保存购物车商品数量最初状态
                for (let i=0;i<ShoppingCartProduct.Product.length;i++) {
                    ProductNumArray.push(ShoppingCartProduct.Product[i].productNumber)
                }
                // console.log(ProductNumArray)
            })

            //点击图片查看详细信息
            let ProductDesc = (id)=>{
                router.push({name:'DetailProductInfo', params:{productid:id}})
            }

            //搜索关键词
            let searchData = reactive({
                searchKey:''
            });

            //创建路由，将关键字通过路由传递到其他页面
            const router = useRouter();

            //声明支付状态，1代表成功支付
            let PaymentState = false;

            //  //搜索信息
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

            //默认选中商品值
            let PurchaseNum = ref(0);
            //默认支付的价格
            let Amount = ref(0);

            //删除功能
            let Delete =(index)=>{
                ModifyData.num = ShoppingCartProduct.Product[index].productNumber;
                ModifyData.operate=1;
                ModifyData.productId = ShoppingCartProduct.Product[index].id;
                // console.log(ModifyData)
                ShoppingChange(ModifyData).then(res=>{
                    ShoppingCartProduct.Product = res.shoppingCartListInfos;
                    // console.log(ShoppingCartProduct.Product)
                })
            }

            //修改购物车商品数量
            let ChangeNum = (index)=>{
                // console.log(ShoppingCartProduct.Product[index])
                // console.log(ShoppingCartProduct.Product[index].productNumber)
                // console.log(ProductNumArray[index])
                if (ShoppingCartProduct.Product[index].productNumber > ProductNumArray[index]){
                    ModifyData.operate = 0;
                    ModifyData.productId = ShoppingCartProduct.Product[index].id;
                    ModifyData.token = userToken;
                    ModifyData.num = ShoppingCartProduct.Product[index].productNumber - ProductNumArray[index];
                    // console.log(ProductNumArray)
                    // console.log(ModifyData)
                    ShoppingChange(ModifyData).then(res=>{
                        ShoppingCartProduct.Product = res.shoppingCartListInfos;
                        for (let i=0;i<ShoppingCartProduct.Product.length;i++) {
                            ProductNumArray[i] = ShoppingCartProduct.Product[i].productNumber;
                        }
                        // console.log(ShoppingCartProduct.Product)
                    })
                }
                else if(ShoppingCartProduct.Product[index].productNumber < ProductNumArray[index]){
                    ModifyData.operate = 1;
                    ModifyData.productId = ShoppingCartProduct.Product[index].id;
                    ModifyData.token = userToken;
                    ModifyData.num = ProductNumArray[index] - ShoppingCartProduct.Product[index].productNumber;

                    // console.log(ProductNumArray[index])
                    // console.log(ModifyData)
                    ShoppingChange(ModifyData).then(res=>{
                        ShoppingCartProduct.Product = res.shoppingCartListInfos;
                        for (let i=0;i<ShoppingCartProduct.Product.length;i++) {
                            ProductNumArray[i] = ShoppingCartProduct.Product[i].productNumber;
                        }
                        // console.log(ShoppingCartProduct.Product)
                    })
                }

            }

            //商品勾选功能
            let Choose =(divId,index)=> {
                //获取选中商品的id
                let productid = document.getElementById(divId)
                // console.log(divId)
                // console.log(productid)
                // console.log(typeof (productid))
                //选中商品
                if (ShoppingCartProduct.Product[index].type==0){
                    ShoppingCartProduct.Product[index].type=1;
                    //购物商品种类数量+1
                    PurchaseNum.value = PurchaseNum.value+1;
                    Amount.value = Amount.value + ShoppingCartProduct.Product[index].price*ShoppingCartProduct.Product[index].productNumber;
                    productid.style.backgroundColor="#f0cdd8";
                }
                //取消选中商品
                else{
                    ShoppingCartProduct.Product[index].type=0;
                    PurchaseNum.value = PurchaseNum.value-1;
                    Amount.value = Amount.value - ShoppingCartProduct.Product[index].price*ShoppingCartProduct.Product[index].productNumber;
                    productid.style.backgroundColor="#ebebeb"
                }
            }

            //默认商品对象类型，0表示未选中，1表示选中
            let productType = ref(0)
            //全选功能
            let ChooseAll =()=>{
                // let productIdArray = []

                if(productType.value == 0) {
                    productType.value = 1;
                    for (let i = 0; i < ShoppingCartProduct.Product.length; i++) {
                        if (ShoppingCartProduct.Product[i].type == 0 ) {
                            let producttempid = "product" + i;
                            let productid = document.getElementById(producttempid)
                            ShoppingCartProduct.Product[i].type = 1;
                            PurchaseNum.value = PurchaseNum.value + 1;
                            Amount.value = Amount.value + ShoppingCartProduct.Product[i].price * ShoppingCartProduct.Product[i].productNumber;
                            //修改颜色
                            productid.style.backgroundColor = "#f0cdd8"
                        }
                    }
                    // console.log(productType)
                }
                else {
                    productType.value = 0;
                    for (let i = 0; i < ShoppingCartProduct.Product.length; i++) {
                        let producttempid = "product" + i;
                        let productid = document.getElementById(producttempid)
                        ShoppingCartProduct.Product[i].type = 0;
                        PurchaseNum.value = 0;
                        Amount.value = 0;
                        //修改颜色
                        productid.style.backgroundColor = "#ebebeb"
                    }
                }
            }

            //取消功能，将所有选中的商品取消选中
            let Cancel = ()=>{
                for (let i=0;i<ShoppingCartProduct.Product.length;i++){
                    //获得所有商品的divId
                    let producttempid = "product" + i;
                    let productid = document.getElementById(producttempid)
                    //修改数据库商品默认类型为0,0表示未选中
                    ShoppingCartProduct.Product[i].type=0;
                    PurchaseNum.value =0;
                    Amount.value = 0;
                    //修改颜色
                    productid.style.backgroundColor = "#ebebeb"
                }
            }


            //结算提交的订单数据
            let OrderData = reactive({
                token:'',
                productIds:[],
                num:[]
            })


            //结算  统计选中的商品id
            let pay =()=>{
                OrderData.token = userToken;
                for (let i=0;i<ShoppingCartProduct.Product.length;i++){
                    if (ShoppingCartProduct.Product[i].type==1){
                        //添加数组数据
                        OrderData.productIds.push(ShoppingCartProduct.Product[i].id)
                        //添加商品数量
                        OrderData.num.push(ShoppingCartProduct.Product[i].productNumber)

                        //结算后默认成功支付，购物车删除选中的商品
                        ModifyData.num = ShoppingCartProduct.Product[i].productNumber;
                        ModifyData.operate=1;
                        ModifyData.productId = ShoppingCartProduct.Product[i].id;
                        console.log(ModifyData)
                        ShoppingChange(ModifyData).then(res=>{
                            ShoppingCartProduct.Product = res.shoppingCartListInfos;
                            console.log(ShoppingCartProduct.Product)
                        })
                    }
                }
                // console.log(OrderData)
                let OrderDataString = JSON.stringify(OrderData)
                router.push({name:'Payment', params:{order:OrderDataString}})
            }

            //获取支付页面传来的成功状态，作为保存
            const route = useRoute();
            PaymentState = route.params.State;

            // //重新接收OrderData数据，因为页面刷新会清空数据
            // let OrderDataString = route.params.Order;
            //
            // if(OrderDataString!=undefined){
            //     let orderData = JSON.parse(OrderDataString)
            //     console.log(orderData)
            //     //将成功支付的商品删除
            //     if (PaymentState == "true"){
            //         for (let i=0;i<orderData.productIds.length;i++){
            //             ModifyData.productId = orderData.productIds[i];
            //             ModifyData.num = 1;
            //             ModifyData.operate=1;
            //             ShoppingChange(ModifyData).then(res=>{
            //                 ShoppingCartProduct.Product = res;
            //             })
            //         }
            //     }
            //     OrderDataString = undefined
            // }



            return{
                Choose,
                PurchaseNum,
                pay,
                Delete,
                searchBtn,
                searchData,
                PaymentState,
                Amount,
                ChooseAll,
                Cancel,
                userToken,
                ShoppingCartProduct,
                Message,
                ModifyData,
                userName,
                OrderData,
                ProductDesc,
                ChangeNum
            }
        },
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

        methods:{
            forId:function (index) {
                return "product" +index
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
    /*商品列表*/
    .ListBody{
        margin: 20px auto;
        width: 90%;
        background-color: white;
        opacity: 80%;
    }
    /*具体商品*/
    .product{
        height: 150px;
        background-color: #ebebeb;
        margin-top: 20px;
        line-height: 150px;
    }
    /*底部结算栏*/
    .Bottom{
        height: 50px;
        background-color: #ffffff;
        line-height: 50px;
        width: 90%;
        margin: 0px auto;
    }

</style>