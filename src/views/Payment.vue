<template>
    <div class="background">
        <div class="window">
            <p style="padding-top: 30px">扫描二维码进行支付</p>
            <img src="../assets/payment.jpg" style="width: 150px;height: 150px;margin-top: 30px">
            <p>
                <el-button type="primary" @click="success()">支付成功</el-button>
            </p>

        </div>
    </div>
</template>

<script>
    import {useRoute, useRouter} from "vue-router";
    import {GenerateOrder} from "../http/api";
    import {ElMessage} from "element-plus";
    import router from "../router";

    export default {
        name: "Payment",
        setup(){
            //创建路由，将成功的商品id通过路由传递到购物车中
            //获取数据
            const Router = useRouter();

            //获取购物车页面传来的商品id，作为保存
            const route = useRoute();

            //将字符串转为JSON格式
            let OrderDataString = route.params.order;
            let OrderData = JSON.parse(OrderDataString)
            //Page = 1代表是从商品详细界面直接购买的
            let Page = "0";
            //从商品详细页面获取Page
            Page = route.params.Page;

            //成功支付
            let success = ()=>{
                GenerateOrder(OrderData).then(res=>{
                    if (res.code === 0  && Page == undefined ){
                        ElMessage.success('支付订单成功');
                        // Router.push({name:'ShoppingCar', params:{State:true, Order:OrderDataString}})
                        router.push({path:'ShoppingCar'})
                    }else if(res.code === 0 && Page == 1){
                        ElMessage.success('支付订单成功');
                        router.push({path:'/'})
                    }else{
                        console.log(res.message)
                    }
                })

            }
            return{
             success,
             Router,
             OrderData,
             Page
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
    .background{
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
    .window{
        margin: 200px auto;
        width: 400px;
        height: 400px;
        background-color: white;
        opacity: 80%;
        align: center;
        line-height: 70px;
    }
</style>