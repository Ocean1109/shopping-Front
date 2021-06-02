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

            //后端传来的商品列表中商品信息
            const ProductItems = reactive({
                products: []
            });

            //交互，从后端传来的数据
            allProduct().then(res=>{
                ProductItems.products=res
            });

            //换一组功能
            let Refresh = ()=>{

                //刷新数据，如果数据是以数组形式传过来，每次+3循环

            };
            return{
                ProductItems,
                Refresh

            }
        }
    }
</script>

<style scoped>

</style>