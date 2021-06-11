<template>
    <div class="background">
        <div class="window">
            <p style="padding-top: 30px">扫描二维码进行支付</p>
            <img src="../assets/image1.png" style="width: 150px;height: 150px;margin-top: 30px">
            <p>
                <el-button type="primary" @click="success(value)">支付成功</el-button>
            </p>

        </div>
    </div>
</template>

<script>
    // import {reactive} from 'vue'
    import {useRoute, useRouter} from "vue-router";

    export default {
        name: "payment",
        setup(){
            //创建路由，将成功的商品id通过路由传递到购物车中
            //获取数据
            const router = useRouter();
            let success = (value)=>{
                //点击之后将这些商品的purchased改成1，并且提交到后台
                router.push({name:'ShoppingCar', params:{productId:value}})
                console.log(value)

            }

            //获取购物车页面传来的商品id，作为保存
            const route = useRoute();
            let ProductPayment = route.params.productPaymentId;


            return{
             success,
             router,
             ProductPayment
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