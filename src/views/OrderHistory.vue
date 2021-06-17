<template>
    <div>
        <el-menu mode="horizontal">
            <el-menu-item index="1" @click="AllProduct">所有订单</el-menu-item>
            <el-menu-item index="2" @click="SendProduct">代发货</el-menu-item>
            <el-menu-item index="3" @click="ReceiveProduct">待收货</el-menu-item>
            <el-menu-item index="4" @click="AssessProduct">待评价</el-menu-item>
        </el-menu>

        <!--标头-->
        <el-row style="text-align: center">
            <el-col :span="12">
                <div>
                    <strong>商品详情</strong>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <strong>单价</strong>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <strong>数量</strong>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <strong>实付款</strong>
                </div>
            </el-col>
            <el-col :span="3">
                <div>
                    <strong>订单状态</strong>
                </div>
            </el-col>
        </el-row>

        <!--具体订单信息-->
        <div class="product" v-for="(order,index) in OrderInfo.Orderlist" :key="order" style="text-align: center;line-height: 150px">
            <div v-for="item in order.productList" :key="item">
                <el-row>
                    <el-col :span="4" :offset="1" style="height: 150px">
                        <img :src="item.productImage" style="width: 130px;height: 130px;margin-top: 10px" @click="ProductDesc(item.id)">
                    </el-col>
                    <el-col :span="7" style="height: 150px;text-align: left;line-height: 40px">
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
                    <el-col :span="3" style="height: 150px">
                        <span>{{OrderInfo.State[index]}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {reactive} from "vue";
    import {GetOrder} from "../http/api";
    import GLOBAL from  "../components/GlobalVariable"
    import {useRouter} from "vue-router";
    export default {
        name: "OrderHistory",
        setup(){

            //用户token和用户名
            let UserToken = GLOBAL.token.value
            let UserName = GLOBAL.userName.value;


            //所有订单展示信息
            let OrderInfo = reactive({
                Orderlist:[],
                State:[]
            })

            //待发货订单信息
            let SendProductInfo = reactive({
                Orderlist:[]
            })

            //待收货订单信息
            let ReceiveProductInfo = reactive({
                Orderlist:[]
            })

            //待评价订单信息
            let AssessProductInfo = reactive({
                Orderlist:[]
            })

            let formData=new FormData()
            formData.append("token",UserToken)
            let AllProduct = ()=> {
                GetOrder(formData).then(res => {
                    if (res.code === 0) {
                        //所有订单信息
                        OrderInfo.Orderlist = res.extendShoppingOrders;
                        for (let i = 0; i < OrderInfo.Orderlist.length; i++) {
                            if (OrderInfo.Orderlist[i].tradeStatus == 1) {
                                OrderInfo.State[i] = "代发货"
                            } else if (OrderInfo.Orderlist[i].tradeStatus == 3) {
                                OrderInfo.State[i] = "待评价"
                            } else if (OrderInfo.Orderlist[i].tradeStatus == 4) {
                                OrderInfo.State[i] = "待收货"
                            }
                        }

                    } else {
                        console.log(res.message)
                    }
                })
            }

            //创建路由，将关键字通过路由传递到其他页面
            const Router = useRouter();

            //点击图片查看详细信息
            let ProductDesc = (id)=>{
                Router.push({name:'DetailProductInfo', params:{productid:id}})
            }


            //获取待发货数据
            let SendProduct = ()=>{
                for (let i=0;i<OrderInfo.Orderlist.length;i++){
                    OrderInfo.Orderlist[i] = "";
                    OrderInfo.State[i] = "";
                }
                GetOrder(formData).then(res => {
                    if (res.code === 0) {
                        //所有订单信息
                        SendProductInfo.Orderlist = res.extendShoppingOrders;
                        //代发货订单信息
                        for (let i = 0; i < SendProductInfo.Orderlist.length; i++) {
                            if (SendProductInfo.Orderlist[i].tradeStatus == 1) {
                                OrderInfo.Orderlist[i] = SendProductInfo.Orderlist[i];
                                OrderInfo.State[i] = "代发货"
                            }
                        }
                    } else {
                        console.log(res.message)
                    }
                })
            }

            //保存待收货数据
            let ReceiveProduct = ()=>{
                for (let i=0;i<OrderInfo.Orderlist.length;i++){
                    OrderInfo.Orderlist[i] = "";
                    OrderInfo.State[i] = "";
                }
                GetOrder(formData).then(res => {
                    if (res.code === 0) {
                        //所有订单信息
                        ReceiveProductInfo.Orderlist = res.extendShoppingOrders;
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
            }

            //保存待评价数据
            let AssessProduct = ()=>{
                for (let i=0;i<OrderInfo.Orderlist.length;i++){
                    OrderInfo.Orderlist[i] = "";
                    OrderInfo.State[i] = "";
                }
                GetOrder(formData).then(res => {
                    if (res.code === 0) {
                        //所有订单信息
                        AssessProductInfo.Orderlist = res.extendShoppingOrders;
                        //代发货订单信息
                        for (let i = 0; i < AssessProductInfo.Orderlist.length; i++) {
                            if (AssessProductInfo.Orderlist[i].tradeStatus == 3) {
                                OrderInfo.Orderlist[i] = AssessProductInfo.Orderlist[i];
                                OrderInfo.State[i] = "代评价"
                            }
                        }
                    } else {
                        console.log(res.message)
                    }
                })
            }
            return{
                UserName,
                UserToken,
                OrderInfo,
                ProductDesc,
                SendProductInfo,
                ReceiveProductInfo,
                AssessProductInfo,
                SendProduct,
                ReceiveProduct,
                AssessProduct,
                AllProduct
            }
        }

    }
</script>

<style scoped>

</style>