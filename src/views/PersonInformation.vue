<template>
    <div>
        <el-container>
            <el-header>
                <el-row style="line-height: 54px">
                    <el-col :span="3" :offset="3">
                        <div>
                            <img src="../assets/CircleHeadPortrait.jpg" style="border-radius: 50px;width: 50px;height: 50px">
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div>
                            {{UserName}}
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
                <el-row :gutter="24" style="text-align: center;margin-top: 30px">
                    <el-col :span="9">
                        <span>商品信息</span>
                    </el-col>
                    <el-col :span="3">
                        <span>单价</span>
                    </el-col>
                    <el-col :span="3">
                        <span>数量</span>
                    </el-col>
                    <el-col :span="3">
                        <span>实付款</span>
                    </el-col>
                    <el-col :span="3">
                        <span>交易状态</span>
                    </el-col>
                    <el-col :span="3">
                        <span>操作</span>
                    </el-col>
                </el-row>

                <div class="product" v-for="(order,index) in OrderInfo.Orderlist" :key="order" style="text-align: center;line-height: 150px">
                    <div v-for="item in order.productList" :key="item">
                        <el-row>
                            <el-col :span="4" :offset="1" style="height: 150px">
                                <img :src="item.productImage" style="width: 130px;height: 130px;margin-top: 10px" @click="DetailProduct(item.id)">
                            </el-col>
                            <el-col :span="4" style="height: 150px;text-align: left;line-height: 40px">
                                <span>{{item.productDesc.substring(0,30)}}</span>
                            </el-col>
                            <el-col :span="3" style="height: 150px">
                                <span>{{item.productPrice}}</span>
                            </el-col>
                            <el-col :span="3" style="height: 150px">
                                <span>1</span>
                            </el-col>
                            <el-col :span="3" style="height: 150px">
                                <span>{{item.productPrice}}</span>
                            </el-col>
                            <el-col :span="3" style="height: 150px;padding-left: 20px">
                                <span>{{OrderInfo.State[index]}}</span>
                            </el-col>
                            <el-col :span="3" style="height: 150px;padding-left: 20px">
                                <span @click="Insure(order.id)">确认收货</span>
                            </el-col>
                        </el-row>
                    </div>
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
                        </el-col>
                    </el-row>
                </div>

                <!--商品列表-->
                <div style="background-color: #f5f8fa;margin-top: 30px;text-align: center">
                    <el-row :gutter="24">
                        <el-col :span="8" v-for="(product,index) in ProductItems.products" :key="product.id">
                            <div v-if="index < 10">
                                <img :src="product.productImage" style="height: 150px;width: 150px" @click="DetailProduct(product.id)">
                                <p style="text-align: left;margin-left: 20px">{{product.productDesc.substring(0,30)}}</p>
                                <p style="margin-bottom: 20px;text-align: center"><span>￥:  {{product.productPrice}}</span></p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import {reactive} from 'vue'
    import {allProduct, GetOrder, ReceivedProduct} from "../http/api";
    import GLOBAL from '../components/GlobalVariable'
    import {useRouter} from "vue-router";
    import {ElMessage} from "element-plus";

    export default {
        name: "PersonInformation",
        setup(){

            //推荐列表中的商品数据
            const ProductItems = reactive({
                products: []
            });

            //用户的token和用户名
            let UserName = GLOBAL.userName.value;
            let UserToken = GLOBAL.token.value;

            //所有订单展示信息
            let OrderInfo = reactive({
                Orderlist:[],
                State:[]
            })

            //待收货订单信息
            let ReceiveProductInfo = reactive({
                Orderlist:[]
            })


            //获取后端数据
            let formData=new FormData()
            formData.append("token",UserToken);
            GetOrder(formData).then(res => {
                if (res.code === 0) {
                    //所有订单信息
                    ReceiveProductInfo.Orderlist = res.extendShoppingOrders;
                    for (let i=0;i<ReceiveProductInfo.Orderlist.length;i++){
                        OrderInfo.Orderlist[i] = "";
                        OrderInfo.State[i] = "";
                    }
                    //代发货订单信息
                    for (let i = 0; i < ReceiveProductInfo.Orderlist.length; i++) {
                        if (ReceiveProductInfo.Orderlist[i].tradeStatus == 4) {
                            OrderInfo.Orderlist[i] = ReceiveProductInfo.Orderlist[i];
                            OrderInfo.State[i] = "代收货"
                        }
                    }

                } else {
                    console.log(res.message)
                }
            })


            //获取推荐列表中的数据
            allProduct().then(res=>{
                ProductItems.products=res
            });

            //创建路由，将关键字通过路由传递到其他页面
            const router = useRouter();

            //点击照片跳转到具体页面
            let DetailProduct = (id)=>{
                router.push({name:'DetailProductInfo', params:{productid:id}})
            }


            //修改订单状态，已收货
            let Insure = (id)=>{
                let brandId=new FormData()
                brandId.append("id",id);
                ReceivedProduct(brandId).then(res=>{
                    if (res.code === 0){
                        ElMessage.success('成功修改成已收货');
                    }else{
                        console.log(res.message)
                    }
                })
            }

            return{
                ProductItems,
                UserName,
                DetailProduct,
                UserToken,
                OrderInfo,
                Insure
            }
        }
    }
</script>

<style scoped>

</style>