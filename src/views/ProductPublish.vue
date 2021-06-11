<template>
    <div>
        <div style="background-color: #a0cdeb;height: 40px;line-height: 40px">
            <span style="margin-left: 10px">发布商品</span>
        </div>

        <!--输入框-->
        <div style="margin-top: 30px">
            <p style="margin-left: 10px">添加商品信息</p>
            <!--上传图片-->
            <p>商品图片</p>
            <el-upload
                    action="http://10.28.137.229:8181/release/"
                    list-type="picture-card"
                    :on-success="ProductSuccessInformation"
                    :on-error="ProductErrorInformation">
                <i class="el-icon-plus"></i>
            </el-upload>

            <p>商品详细信息例图</p>
            <el-upload
                    action="http://10.28.137.229:8181/release/"
                    list-type="picture-card"
                    :on-success="DetailSuccessInformation"
                    :on-error="DetailErrorInformation">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-form-item style="margin-top: 20px">商品信息
                <el-input style="margin-left: 31px;width: 300px;border: 1px solid" type="textarea" :rows="2"
                          v-model="ProductInformation.productDesc"></el-input>
            </el-form-item>
            <el-form-item>商品单价
                <el-input class="Ipt" v-model="ProductInformation.productPrice"></el-input>
            </el-form-item>
            <el-form-item>商品类型
                <el-input class="Ipt" v-model="ProductInformation.productType"></el-input>
            </el-form-item>
            <el-form-item>商品商标
                <el-input class="Ipt" v-model="ProductInformation.brand"></el-input>
            </el-form-item>
            <el-form-item>发货地址
                <el-input class="Ipt" v-model="ProductInformation.productAddress"></el-input>
            </el-form-item>
            <el-form-item>商品数量
                <el-input class="Ipt" v-model="ProductInformation.numbers"></el-input>
            </el-form-item>
            <el-form-item>商品属性
                <el-input style="margin-left: 31px;width: 300px;border: 1px solid" type="textarea" :rows="2"
                          v-model="ProductInformation.rule" placeholder="如 “书籍出版社  书籍页数”"></el-input>
            </el-form-item>
            <el-form-item>商品规格
                <el-input style="margin-left: 31px;width: 300px;border: 1px solid" type="textarea" :rows="2"
                          v-model="ProductInformation.productRule" placeholder="如 “人民出版社  100页”"></el-input>
            </el-form-item>
            <el-button style="margin-left: 95px" type="primary" @click="Commit">提交</el-button>
        </div>
    </div>
</template>

<script>
    // import {reactive} from 'vue';
    import {PublishProductInformation} from "../http/api";

    export default {
        name: "ProductPublish",
        data() {
            return {
                num:0,
                productImage:{},
                moreImages:[],
                ProductInformation: {
                    productDesc:'',
                    productPrice:'',
                    productType:'',
                    brand:'',
                    user:'',
                    productAddress:'',
                    numbers:'',
                    rule:'',
                    productRule:'',
                }

            };
        },
    methods: {
            //商品图片上传成功失败操作
        ProductSuccessInformation(message, file) {
            this.productImage = file;
            console.log(this.productImage)
        },
        ProductErrorInformation(err){
            console.log(err)
        },
        DetailSuccessInformation(message,file){
            this.moreImages[this.num] = file;
            this.num++;
            console.log(this.moreImages)
        },
        DetailErrorInformation(err){
            console.log(err)
        },
        Commit(){
            console.log(this.moreImages.length)
            console.log(this.ProductInformation)
            const formData=new FormData()
            formData.append("productImage",this.productImage.raw)
            for (let i=0;i<this.moreImages.length;i++){
                formData.append("moreImages",this.moreImages[i].raw)
                console.log(this.moreImages[i])
            }
            formData.append("releaseProduct",this.ProductInformation)
            console.log(formData.get('productImage'))
            console.log(formData.getAll('moreImages'))
            PublishProductInformation(formData).then(res=>{
                console.log(formData)
                    console.log(res)
                console.log(res.message)
            }
            )
        }

    }
    }
</script>

<style scoped>
    .Ipt{
        width: 300px;
        margin-left: 30px;
        border: 1px solid;
    }
</style>