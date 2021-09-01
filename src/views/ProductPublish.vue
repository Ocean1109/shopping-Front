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
                    class="upload"
                    ref="upload"
                    action="string"
                    :file-list="productImage"
                    :auto-upload="false"
                    :http-request="uploadFile1"
                    :on-change="handleChange1"
                    :on-preview="handlePreview1"
                    :on-remove="handleRemove1"
                    multiple="multiple"
            >
                <el-button  size="small" type="primary" @click="delFile1">选取文件</el-button>
            </el-upload>


            <p>商品详细信息例图</p>
            <el-upload
                    class="upload"
                    ref="upload"
                    action="string"
                    :file-list="moreImages"
                    :auto-upload="false"
                    :http-request="uploadFile2"
                    :on-change="handleChange2"
                    :on-preview="handlePreview2"
                    :on-remove="handleRemove2"
                    multiple="multiple"
            >
                <el-button  size="small" type="primary" @click="delFile2">选取文件</el-button>
            </el-upload>


            <el-form-item style="margin-top: 20px">商品信息
                <el-input style="margin-left: 31px;width: 300px;border: 1px solid" type="textarea" :rows="2"
                          v-model="ProductInformation.productDesc"></el-input>
            </el-form-item>
            <el-form-item>商品单价
                <el-input class="Ipt" v-model="ProductInformation.productPrice" placeholder="范围为0.01-1000000"></el-input>
            </el-form-item>
            <el-form-item>商品类型
                <el-select v-model="ProductInformation.productType" placeholder="请选择" class="Ipt">
                    <el-option
                            v-for="item in productTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>商品商标
                <el-input class="Ipt" v-model="ProductInformation.brand"></el-input>
            </el-form-item>
            <el-form-item>发货地址
                <el-input class="Ipt" v-model="ProductInformation.productAddress"></el-input>
            </el-form-item>
            <el-form-item>商品数量
                <el-input class="Ipt" v-model="ProductInformation.numbers" placeholder="整数且范围为1-1000000"></el-input>
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
    import GLOBAL from "../components/GlobalVariable"
    import {PublishProductInformation} from "../http/api";
    import {ElMessage} from "element-plus";
    import router from "../router";

    export default {
        name: "ProductPublish",
        data() {
            return {
                multiple: true,
                formData: "",
                num:0,
                productImage:[],
                moreImages:[],
                ProductInformation: {
                    productDesc:'',
                    productPrice:0.00,
                    productType:'',
                    brand:'',
                    user:'',
                    productAddress:'',
                    numbers:0,
                    rule:'',
                    productRule:'',
                },
                productTypes:[{
                    value: '生活用品',
                    label: '生活用品'
                }, {
                    value: '食品',
                    label: '食品'
                }, {
                    value: '五金用品',
                    label: '五金用品'
                }, {
                    value: '钟表',
                    label: '钟表'
                }, {
                    value: '男装',
                    label: '男装'
                }, {
                    value: '美妆',
                    label: '美妆'
                }, {
                    value: '运动',
                    label: '运动'
                }, {
                    value: '电子产品',
                    label: '电子产品'
                },{
                    value: '书籍',
                    label: '书籍'
                },{
                    value: '家居建材',
                    label: '家居建材'
                },{
                    value: '周边',
                    label: '周边'
                },{
                    value: '其他',
                    label: '其他'
                }]
            };
        },
        methods: {
            uploadFile1(file){
                this.formData.append("productImage",file.file)
            },
            handleChange1(file,fileList){
                this.productImage=fileList
            },
            handlePreview1(file){
                console.log(file)
            },
            handleRemove1(file,fileList){
                console.log(file,fileList)
            },
            delFile1() {
                this.productImage = [];
            },
            uploadFile2(file){
                this.formData.append("moreImages",file.file)
                console.log(this.formData)
            },
            handleChange2(file,fileList){
                console.log(file)
                this.moreImages=fileList
                console.log(fileList)
            },
            handlePreview2(file){
                console.log(file)
            },
            handleRemove2(file,fileList){
                console.log(file,fileList)
            },
            delFile2() {
                // this.moreImages = [];
            },

            Commit(){
                //对输入数据进行相关检查
                if (this.ProductInformation.productPrice<0.01||this.ProductInformation.productPrice>1000000){
                    ElMessage.error('请输入正确范围内的商品价格');
                }
                else if (this.ProductInformation.numbers<1||this.ProductInformation.numbers>1000000){
                    ElMessage.error('请输入正确范围内的商品数量');
                }
                else if(this.ProductInformation.numbers%1 !=0){
                    ElMessage.error('商品数量请输入整数')
                }
                let USerToken = GLOBAL.token.value;
                let formData=new FormData()
                formData.append("productImage",this.productImage[0].raw)
                for (let i=0;i<this.moreImages.length;i++){
                    formData.append("moreImages",this.moreImages[i].raw)
                }
                formData.append("productDesc",this.ProductInformation.productDesc)
                formData.append("productPrice",this.ProductInformation.productPrice)
                formData.append("productType",this.ProductInformation.productType)
                formData.append("brand",this.ProductInformation.brand)
                formData.append("user",USerToken)
                formData.append("productAddress",this.ProductInformation.productAddress)
                formData.append("numbers",this.ProductInformation.numbers)
                formData.append("rule",this.ProductInformation.rule)
                formData.append("productRule",this.ProductInformation.productRule)

                PublishProductInformation(formData).then(res=>{
                        if (res == true){
                            ElMessage.success('提交成功');
                            router.push({path:'/'})
                        }
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
