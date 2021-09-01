<template>
    <div>
        <!--标头-->
        <div style="background-color: #a0cdeb;height: 40px;line-height: 40px">
            <span style="margin-left: 10px;margin-bottom: 20px">我的卖家订单</span>
        </div>
        <div v-for="(order,index) in OrderListData.OrderList" :key="index" style="background-color: #a0cdeb">
            <strong style="margin-left: 20px">订单{{index+1}}</strong>
            <el-row style="margin-top: 10px">
                <el-col :span="12" style="text-align: center">
                    <div style="margin-top: 10px">
                        <span>商品ID:</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>商品名称:</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>商品价格:</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>收货人:</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>收货地址:</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>联系方式:</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>订单状态:</span>
                    </div>

                </el-col>
                <el-col :span="10" style="text-align: left">
                    <div style="margin-top: 10px">
                        <span>{{order.productId}}</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>{{order.desc.substring(0,20)}}</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>{{order.price}}</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>{{order.name}}</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>{{order.address}}</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>{{order.tel}}</span>
                    </div>
                    <div style="margin-top: 10px">
                        <span>{{OrderListData.State[index]}}</span>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div>
                        <el-button type="text" style="color: black" @click="SentProduct(order.tradeStatus,order.orderProductId)">确认发货</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {SendProduct,GetSellerProduct} from "../http/api";
    import {reactive} from "vue"
    import GLOBAL from "../components/GlobalVariable"
    import {ElMessage} from "element-plus";
    export default {
        name: "OrderList",
        setup(){


            //获取用户名
            let UserToken = GLOBAL.token.value

            //获取后端传来的数据
            let OrderListData = reactive({
                OrderList:[],
                State:[]
            })

            //获取后端数据
            let formData=new FormData()
            formData.append("token",UserToken);
            GetSellerProduct(formData).then(res=>{
                OrderListData.OrderList = res.order4Shopkeepers;
                for (let i=0;i<OrderListData.OrderList.length;i++){
                    if(OrderListData.OrderList[i].tradeStatus == 3){
                        OrderListData.State[i] = "已收货"
                    }
                    else if(OrderListData.OrderList[i].tradeStatus == 4){
                        OrderListData.State[i] ="已发货"
                    }else if(OrderListData.OrderList[i].tradeStatus == 1){
                        OrderListData.State[i] ="代发货"
                    }

                }
                //对买家数据进行隐藏
                for (let i=0;i<OrderListData.OrderList.length;i++){
                    //保留姓氏
                    let TempName = OrderListData.OrderList[i].name.substr(0,1);
                    OrderListData.OrderList[i].name = TempName + "**"
                    //保留前三位和后两位
                    let TempTelFront = OrderListData.OrderList[i].tel.substr(0,3);
                    let TempTelBack = OrderListData.OrderList[i].tel.substr(9,2);
                    OrderListData.OrderList[i].tel = TempTelFront + "******" + TempTelBack
                }
            })




            //发货功能
            let SentProduct = (status,id)=>{
                let SendFormData=new FormData()
                SendFormData.append("id",id);
                if (status == 1){
                    SendProduct(SendFormData).then(res=>{
                        if (res.code === 0){
                            ElMessage.success('出货成功');
                        }else{
                            console.log(res.message)
                        }
                    })

                    //将修改的订单id返回给后端后，重新接收数据
                    GetSellerProduct(formData).then(res=>{
                        for (let i=0;i<OrderListData.OrderList.length;i++){
                            OrderListData.OrderList[i] = "";
                            OrderListData.State[i] = "";
                        }
                        OrderListData.OrderList = res.order4Shopkeepers;
                        for (let i=0;i<OrderListData.OrderList.length;i++){
                            if(OrderListData.OrderList[i].tradeStatus == 3){
                                OrderListData.State[i] = "已收货"
                            }
                            else if(OrderListData.OrderList[i].tradeStatus == 4){
                                OrderListData.State[i] ="已发货"
                            }else if(OrderListData.OrderList[i].tradeStatus == 1){
                                OrderListData.State[i] ="代发货"
                            }

                        }
                    })
                }

            }


            return{
                UserToken,
                OrderListData,
                SentProduct
            }
        }
    }
</script>

<style scoped>

</style>