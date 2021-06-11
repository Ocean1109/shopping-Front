<template>
    <div>
        <el-container>
            <!--头像  昵称  ~~~ -->
            <el-header>
                <el-row style="line-height: 54px">
                    <el-col :span="3" :offset="3">
                        <div>
                            <img src="../assets/image1.png" style="border-radius: 50px;width: 50px;height: 50px">
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div>
                            我是谁？北邮隆哥
                            {{User.user.username}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                            <router-link to="/Address" style="text-decoration: none;text-align: center;
                            color: black">我的收货地址</router-link>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <!--我的物流-->
            <el-main>
                <div style="background-color: #f5f8fa">
                    <el-row>
                        <el-col :span="2">
                            <div>
                                <img src="../assets/truck.png">
                            </div>
                        </el-col>
                        <el-col :span="22" style="line-height: 54px">
                            <div>
                                <span>我的物流</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!--商品标头-->
                <el-row :gutter="24" style="text-align: center">
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
                        <span>实付款</span>
                    </el-col>
                    <el-col :span="3">
                        <span>交易状态</span>
                    </el-col>
                </el-row>
                <div class="product" v-for="(item,index) in testdata" :key="index" style="text-align: center">
                    <el-row>
                        <el-col :span="3" style="height: 150px">
                            <img src="../assets/image1.png" style="width: 130px;height: 130px;margin-top: 10px">
                        </el-col>
                        <el-col :span="5" :offset="1" style="height: 150px;text-align: left;line-height: 40px">
                            <span>{{item.text}}</span>
                        </el-col>
                        <el-col :span="4" style="height: 150px;line-height: 150px">
                            <span>{{item.price}}</span>
                        </el-col>
                        <el-col :span="4" style="height: 150px;line-height: 150px">
                            <span>{{item.num}}</span>
                        </el-col>
                        <el-col :span="4" style="height: 150px;line-height: 150px">
                            <span>{{item.num*item.price}}</span>
                        </el-col>
                        <el-col :span="3" style="height: 150px;line-height: 150px">
                            <span>已支付</span>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
            <!--商品推荐-->
            <el-footer>
                <!--标头-->
                <div style="background-color:#a0cdeb">
                    <el-row>
                        <el-col :span="21" :offset="1" style="line-height: 54px">
                            <div>
                                <span>根据浏览，猜我喜欢</span>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div>
                                <el-button type="text" style="margin-top: 7px;color: black" @click="Refresh">
                                    <i class="el-icon-refresh"></i>
                                    换一组
                                </el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!--商品列表-->
                <div style="background-color: #f5f8fa">
                    <el-col :span="4" v-for="product in ProductItems.products" :key="product.id">
                        <img :src="product.productImage" style="height: 150px;width: 150px">
                        <p style="text-align: left;margin-left: 20px">{{product.productDesc}}</p>
                        <p style="margin-bottom: 20px"><span>{{product.productPrice}}</span></p>
                    </el-col>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import {reactive} from 'vue'
    import {allProduct} from "../http/api";
    export default {
        name: "PersonInformation",
        setup(){

            //推荐列表中的商品数据
            const ProductItems = reactive({
                products: []
            });

            //用户的头像和昵称
            let User = reactive({
                user:{}
            })


            //获取推荐列表中的数据
            allProduct().then(res=>{
                ProductItems.products=res
            });
            let testdata = reactive(
                [
                    {
                        text:'商品1商品1商品1商品1商品1商品1商品1',
                        detail:'黑色',
                        price: 50,
                        num:2,
                        id:1,
                        type:0,  //是否选中，0代表不选中，1代表选中并结算
                        purchased:0  //是否购买，购买后改成1
                    },{
                    text:'商品2',
                    detail:'黑色',
                    price: 60,
                    num:3,
                    id:2,
                    type:0,
                    purchased:0
                },{
                    text:'商品3',
                    detail:'黑色',
                    price: 40,
                    num:3,
                    id:3,
                    type:0,
                    purchased:0
                }
                ]
            );
            //换一组功能
            let Refresh = ()=>{

                //刷新数据，如果数据是以数组形式传过来，每次+3循环

            };
            return{
                ProductItems,
                Refresh,
                testdata,
                User

            }
        }
    }
</script>

<style scoped>

</style>