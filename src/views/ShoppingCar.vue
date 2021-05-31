<template>
    <div class="home">
        <!--导航栏-->
        <el-menu  class="el-menu-demo" mode="horizontal" >
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
            <el-col :span="16"></el-col>
            <el-col :span="6">
                <div class="search_box">
                    <el-input class="ipt" placeholder="搜索" clearable prefix-icon="el-icon-search"></el-input>
                </div>
            </el-col>
            <el-col :span="2">
                    <span style="float: left;margin-top: 60px;margin-left: 270px">
                        <el-button icon="el-icon-search" circle @click="searchBtn"></el-button>
                    </span>
            </el-col>
        </el-row>
        <!--购物车中的商品-->
        <div class="ListBody">
            <h3 style="margin-top: 20px;margin-left: 20px;;margin-bottom: 20px">全部商品</h3>
            <hr>
            <!--购物车商品顶部-->
            <el-row :gutter="24">
                <el-col :span="3" :offset="3">
                    <span>商品信息</span>
                </el-col>
                <el-col :span="3" :offset="3">
                    <span>单价</span>
                </el-col>
                <el-col :span="3" :offset="3">
                    <span>数量</span>
                </el-col>
                <el-col :span="3" :offset="3">
                    <span>金额</span>
                </el-col>
            </el-row>
<!--详细商品-->
            <div class="product" v-for="item in testdata" :key="item">
                <el-row :gutter="24">
                    <el-col :span="1">
                        <el-radio style="margin-left: 17px" @click="changeStyle"></el-radio>
                    </el-col>
                    <el-col :span="8" style="height: 150px">
                        <el-row :gutter="24">
                            <el-col :span="10" style="height: 150px">
                                <img src="../assets/image1.png" style="width: 130px;height: 130px;margin-top: 10px">
                            </el-col>
                            <el-col :span="10" style="height: 150px;text-align: left;line-height: 40px">
                                <span>{{item.text}}</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="3" style="height: 150px">
                        <span>{{item.price}}</span>
                    </el-col>
                    <el-col :span="3" :offset="3" style="height: 150px">
                        <el-input-number size="mini" v-model="item.num" :min="1"></el-input-number>
                    </el-col>
                    <el-col :span="3" :offset="3" style="height: 150px">
                        <span>{{item.num*item.price}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--底部结算栏-->
        <el-affix position="bottom" >
            <div class="Bottom" >
                <el-row :gutter="24">
                    <el-col :span="3">
                        <span >全选</span>
                    </el-col>
                    <el-col :span="3">
                        <span>删除</span>
                    </el-col>
                    <el-col :span="3" :offset="9">
                        已选商品{{num}}件
                    </el-col>
                    <el-col :span="3">
                        合计：
                    </el-col>
                    <el-col :span="3" style="background-color: #f0cdd8" @click="pay">结算</el-col>
                </el-row>
            </div>
        </el-affix>
    </div>

</template>

<script>
    import {reactive,ref} from 'vue'
    export default {
        name: "ShoppingCar",

        setup(){
            let num = ref(0)
            let ChooseProduct = reactive(
                {
                    information:'',
                    detail:'',
                    price:null,
                    num:null
                }
            )
            let testdata = reactive(
                [
                    {
                        text:'商品1商品1商品1商品1商品1商品1商品1',
                        detail:'黑色',
                        price: 50,
                        num:2
                    },{
                        text:'商品2',
                        detail:'黑色',
                        price: 60,
                        num:3
                    },{
                        text:'商品3',
                        detail:'黑色',
                        price: 40,
                        num:3
                    }
                ]
            );
            let changeSelectedStyle;
            let ProductNum = testdata.length;
            let color1 = document.getElementsByClassName('product')
            console.log(ProductNum);
            let changeStyle=()=> {
                num.value++;
                console.log(num.value)
            }

            //结算
            let pay=()=>{
                alert('结算');
            }
            return{
                testdata,
                ProductNum,
                changeStyle,
                changeSelectedStyle,
                num,
                color1,
                ChooseProduct,
                pay
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