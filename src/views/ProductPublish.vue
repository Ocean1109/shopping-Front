<template>
    <div>
        <div style="background-color: #a0cdeb;height: 40px;line-height: 40px">
            <span style="margin-left: 10px">发布商品</span>
        </div>

        <!--输入框-->
        <div style="margin-top: 30px">
            <p style="margin-left: 10px">添加商品信息</p>
            <el-form-item>商品ID
                <el-input style="margin-left: 43px;width: 300px" v-model="ProductInformation.ProductID"></el-input>
            </el-form-item>
            <el-form-item>商品名称
                <el-input class="Ipt" v-model="ProductInformation.ProductTitle"></el-input>
            </el-form-item>
            <el-form-item>商品单价
                <el-input class="Ipt" v-model="ProductInformation.ProductPrice"></el-input>
            </el-form-item>
            <el-form-item>商品详细
                <el-input style="margin-left: 33px;width: 400px" type="textarea" :rows="2" placeholder="请输入内容" v-model="ProductInformation.ProductText">
                </el-input>
            </el-form-item>
            <el-button style="margin-left: 95px" type="primary" @click="Commit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import {reactive} from 'vue';
    export default {
        name: "ProductPublish",
        setup(){
            let ProductInformation = reactive({
                ProductID:'',
                ProductTitle:'',
                ProductPrice:'',
                ProductText:''
            })

            let Commit = ()=>{
                //传到后端

            }
            return{
                ProductInformation,
                Commit
            }
        }
    }
</script>

<style scoped>
    .Ipt{
        width: 300px;
        margin-left: 30px;
    }
</style>