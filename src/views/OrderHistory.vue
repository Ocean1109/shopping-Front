<template>
    <div>
        <!--标头-->
        <el-row style="text-align: center">
            <el-col :span="12">
                <div>
                    宝贝
                </div>
            </el-col>
            <el-col :span="4">
                <div>
                    单价
                </div>
            </el-col>
            <el-col :span="4">
                <div>
                    数量
                </div>
            </el-col>
            <el-col :span="4">
                <div>
                    实付款
                </div>
            </el-col>
        </el-row>

        <!--分页-->
        <div style="height: 50px;background-color: #ffffff">

        </div>
        <!--具体订单信息-->
        <div class="product" v-for="item in testdata" :key="item" style="text-align: center;line-height: 150px">
            <el-row>
                <el-col :span="4" :offset="1" style="height: 150px">
                    <img src="../assets/image1.png" style="width: 130px;height: 130px;margin-top: 10px">
                </el-col>
                <el-col :span="7" style="height: 150px;text-align: left;line-height: 40px">
                    <span>{{item.text}}</span>
                </el-col>
                <el-col :span="4" style="height: 150px">
                    <span>{{item.price}}</span>
                </el-col>
                <el-col :span="4" style="height: 150px">
                    <span>{{item.num}}</span>
                </el-col>
                <el-col :span="4" style="height: 150px">
                    <span>{{item.num*item.price}}</span>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import {reactive} from "vue";
    export default {
        name: "OrderHistory",
        setup(){
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
            return{
                testdata
            }
        }

    }
</script>

<style scoped>

</style>