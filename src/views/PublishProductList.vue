<template>
    <div>
        <div style="background-color: #a0cdeb;height: 40px;line-height: 40px">
            <span style="margin-left: 10px;margin-bottom: 20px">已发布的商品</span>
        </div>
        <div>
            <el-row style="margin-top: 10px;margin-bottom: 20px">
                <el-col :span="14" :offset="2">
                    <div><strong>商品信息</strong></div>
                </el-col>
                <el-col :span="4">
                    <div><strong>价格</strong></div>
                </el-col>
                <el-col :span="4">
                    <div><strong>操作</strong></div>
                </el-col>
            </el-row>
        </div>
        <div v-for="product in PubishedProduct.Products" :key="product" style="margin-top: 20px;line-height: 200px">
            <el-row>
                <el-col :span="8" >
                    <img :src="product.productImage" style="width: 200px;height: 200px">
                </el-col>
                <el-col :span="8">
                    <span>{{product.productDesc.substring(0,20)}}</span>
                </el-col>
                <el-col :span="4">
                    <span>{{product.productPrice}}</span>
                </el-col>
                <el-col :span="4">
                    <span @click="DeletePublishedProduct(product.id)">删除商品</span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {ProductPublishedList, DeleteProduct} from "../http/api";
    import {reactive} from  "vue"
    import GLOBAL from "../components/GlobalVariable"
    import {ElMessage} from "element-plus";
    import {useRouter} from "vue-router";
    export default {
        name: "PublishProductList",
        setup(){

            //获取用户名
            let UserToken = GLOBAL.token.value

            let PubishedProduct = reactive({
                Products:[]
            })

            //获取发布商品的数据
            let formData = new FormData()
            formData.append("token",UserToken)
            ProductPublishedList(formData).then(res=>{
                PubishedProduct.Products = res
            })

            //创建路由，将关键字通过路由传递到其他页面
            const router = useRouter();

            //删除商品
            let DeletePublishedProduct = (id) =>{
                let formData = new FormData()
                formData.append("id",id)
                DeleteProduct(formData).then(res=>{
                    if (res.code === 0){
                        ElMessage.success('删除成功');
                        router.push({path:'/'})
                    }
                    else{
                        console.log(res.message)
                    }

                })
            }
            return{
                UserToken,
                PubishedProduct,
                DeletePublishedProduct
            }
        }
    }
</script>

<style scoped>

</style>