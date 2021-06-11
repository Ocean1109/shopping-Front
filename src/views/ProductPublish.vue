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
                }

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
      },
      handleChange2(file,fileList){
        this.moreImages=fileList
      },
      handlePreview2(file){
        console.log(file)
      },
      handleRemove2(file,fileList){
        console.log(file,fileList)
      },
      delFile2() {
        this.moreImages = [];
      },




        Commit(){
            let formData=new FormData()
            formData.append("productImage",this.productImage[0].raw)
            for (let i=0;i<this.moreImages.length;i++){
                formData.append("moreImages",this.moreImages[i].raw)
            }
            formData.append("releaseProduct",{"productDesc":this.ProductInformation.productDesc,"productPrice":899.00,"productType":"电子产品","brand":this.ProductInformation.brand,"user":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwIiwiaWF0IjoxNjIzMjQyMDA1LCJleHAiOjE2MjMzMjg0MDV9.JYXSeSsVQv_flhootBrwMEk6kWbUXPiFX2lEPA8ympOUqMPx1R-YgAoiye-Xde-6r_IW2_ZLjdPHBZhI6JS37g","productAddress":"北京","numbers":10,"rule":"产品尺寸长(mm)","productRule":"154mm"})
            PublishProductInformation(formData).then(res=>{
              console.log(res)
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
