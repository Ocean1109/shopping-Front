<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="12">
                <div style="margin-top: 50px;margin-left: 120px">
                    <p>上传文件</p>
                </div>
                <div style="margin-top: 50px;margin-left: 120px">
                    <el-upload
                            class="upload"
                            ref="upload"
                            action="string"
                            :file-list="fileList"
                            :auto-upload="false"
                            :http-request="uploadFile"
                            :on-change="handleChange"
                            :on-exceed="handleExceed"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            multiple="multiple"
                            :limit="1"
                    >
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                    <div style="margin-top: 50px">
                        <el-button type="primary" @click="Commit">提交</el-button>
                    </div>

                </div>
            </el-col>
            <el-col :span="12">
                <div style="margin-top: 50px;margin-left: 120px">
                    <p>下载文件</p>
                </div>
                <div style="margin-top: 50px;margin-left: 120px">
                    <el-link href="http://localhost:8181/ExportCsv" >
                        <el-button type="primary">点击下载</el-button>
                    </el-link>
                </div>
            </el-col>
        </el-row>
        <div style="height: 400px"></div>
    </div>
</template>

<script>
    import {UploadFile} from "../../http/api"
    import {ElMessage} from "element-plus";
    export default {
        name: "FileEdit",
        data(){
            return{
                formData: "",
                fileList:[],
                multiple: true,

            }
        },
        methods: {
            //上传文件相关操作
            uploadFile(file){
                this.formData.append("fileList",file.file)
                console.log(this.fileList)
                // console.log(typeof file)
            },
            handleChange(file,fileList){
                this.fileList=fileList
            },
            handleRemove(file, fileList) {
                console.log(file, fileList)
            },
            handlePreview(file) {
                console.log(file)
                // console.log(typeof file)
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
                        files.length + fileList.length
                    } 个文件`
                )
            },

            Commit(){
                console.log(typeof this.fileList[0].raw)
                let formdata = new FormData()
                formdata.append("file",this.fileList[0].raw)
                UploadFile(formdata).then(res=>{
                    console.log(res)
                    if (res.code === 0){
                        ElMessage.success("上传成功")
                    }
                    else{
                        ElMessage.error("上传失败")
                    }
                })
            }
        },

    }
</script>

<style scoped>

</style>