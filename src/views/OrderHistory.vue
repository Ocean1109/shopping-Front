<template>
    <div>
        <el-menu mode="horizontal">
            <el-menu-item v-for="item in TableList" :key="item.name" :label="item.name">
                <router-link :to="item.path" style="text-decoration: none;color: black"
                >{{item.meta.title}}</router-link>
            </el-menu-item>
<!--            <el-menu-item index="1">所有订单</el-menu-item>-->
<!--            <el-menu-item index="2">-->
<!--                <router-link to="/BeforeSign">待收货</router-link>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="3">待收货</el-menu-item>-->
<!--            <el-menu-item index="4">已评价</el-menu-item>-->
        </el-menu>
        <!--标头-->
<!--        <el-row style="text-align: center">-->
<!--            <el-col :span="12">-->
<!--                <div>-->
<!--                    宝贝-->
<!--                </div>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--                <div>-->
<!--                    单价-->
<!--                </div>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--                <div>-->
<!--                    数量-->
<!--                </div>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--                <div>-->
<!--                    实付款-->
<!--                </div>-->
<!--            </el-col>-->
<!--            <el-col :span="3">-->
<!--                <div>-->
<!--                    订单状态-->
<!--                </div>-->
<!--            </el-col>-->
<!--        </el-row>-->

<!--        &lt;!&ndash;具体订单信息&ndash;&gt;-->
<!--        <div class="product" v-for="item in testdata" :key="item" style="text-align: center;line-height: 150px">-->
<!--            <el-row>-->
<!--                <el-col :span="4" :offset="1" style="height: 150px">-->
<!--                    <img src="../assets/image1.png" style="width: 130px;height: 130px;margin-top: 10px">-->
<!--                </el-col>-->
<!--                <el-col :span="7" style="height: 150px;text-align: left;line-height: 40px">-->
<!--                    <span>{{item.text}}</span>-->
<!--                </el-col>-->
<!--                <el-col :span="3" style="height: 150px">-->
<!--                    <span>{{item.price}}</span>-->
<!--                </el-col>-->
<!--                <el-col :span="3" style="height: 150px">-->
<!--                    <span>{{item.num}}</span>-->
<!--                </el-col>-->
<!--                <el-col :span="3" style="height: 150px">-->
<!--                    <span>{{item.num*item.price}}</span>-->
<!--                </el-col>-->
<!--                <el-col :span="3" style="height: 150px">-->
<!--                    <span>{{item.style}}</span>-->
<!--                </el-col>-->
<!--            </el-row>-->
<!--        </div>-->
    </div>
</template>

<script>
    import {reactive} from "vue";
    import router from "../router";

    export default {
        name: "OrderHistory",
        setup(){



            let testdata = reactive(
                [
                    {
                        text:'商品1商品1商品1商品1商品1商品1商品1',
                        detail:'黑色',
                        price: 50,
                        num:2,
                        style:'已付款'
                    },{
                    text:'商品2',
                    detail:'黑色',
                    price: 60,
                    num:3,
                    style:'未付款'
                },{
                    text:'商品3',
                    detail:'黑色',
                    price: 40,
                    num:3,
                    style:'已签收'
                }
                ]
            );

            //设置子路由标头——即订单种类
            let TableList = router.options.routes[6].children[3].children;

            return{
                testdata,
                TableList
            }
        }

    }
</script>

<style scoped>

</style>