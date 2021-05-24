<template>
    <div class="background">
        <div class="register_box">
            <p class="input_box">
                <el-input class="ipt" placeholder="请输入手机号" style="border-radius: 20px"
                          prefix-icon="el-icon-mobile-phone" v-model="RegisterData.userPhone"></el-input>
            </p>
            <p class="input_box">
                <el-input class="ipt" placeholder="请输入密码" id="PwdValue" style="border-radius: 20px"
                          prefix-icon="el-icon-lock" v-model="RegisterData.userpwd" show-password></el-input>
            </p>
            <p class="input_box">
                <el-input class="ipt" placeholder="再次确认密码" id="PwdValueCheck" style="border-radius: 20px"
                          prefix-icon="el-icon-lock" v-model="RegisterData.userpwdCheck" show-password></el-input>
            </p>
            <p class="input_box">
                <el-input class="ipt" placeholder="请输入姓名" style="border-radius: 20px"
                          prefix-icon="el-icon-user" v-model="RegisterData.username"></el-input>
            </p>
            <p class="input_box">
                <el-input style="border-radius: 20px" class="ipt" placeholder="年龄"
                          prefix-icon="el-icon-date" v-model="RegisterData.userage"></el-input>
            </p>
            <p class="input_box" id="SexRadio">
                性别：
                <el-radio v-model="RegisterData.usersex" label="0">男</el-radio>
                <el-radio v-model="RegisterData.usersex" label="1">女</el-radio>
            </p>
            <router-link to='/login'>
                <el-link style="float: left;margin-left: 55px;font-size: 14px;margin-top: 30px"
                         icon="el-icon-edit" >已有账号，现在登录</el-link>
            </router-link>
            <span style="float: right;margin-top: 15px;margin-right: 55px">
                <el-button class="RegisterBtn" type="primary" plain @click="RegisterBtn">登录</el-button>
            </span>
        </div>
    </div>
</template>

<script>
    import {reactive} from 'vue'
    import {ElMessage} from "element-plus";
    import {register} from "../http/api";
    import router from "../router";

    export default {
        name: "Register",
        setup(){
            let RegisterData = reactive({
                userPhone:'',
                userpwd:'',
                userpwdCheck:'',
                username:'',
                userage:'',
                usersex:'',
            });
            //注册绑定的事件
            let RegisterBtn =()=>{
                //发送到后端的数据
                //是否需要tostring
                let data={"tel":RegisterData.userPhone,"password":RegisterData.userpwd,"userName":RegisterData.username,
                    "age":RegisterData.userage,"gender":RegisterData.usersex};
                //判断输入框是否为空
                if (!RegisterData.userPhone||!RegisterData.userpwd||!RegisterData.userpwdCheck||!RegisterData.username
                ||!RegisterData.userage||!RegisterData.usersex){
                    ElMessage.error('请填写所有必填项');
                    return
                }
                //判断两次密码是否一致
                else if (RegisterData.userpwd !=RegisterData.userpwdCheck){
                    ElMessage.error('两次密码不一致，请重新输入');
                    document.getElementById("PwdValue").value="";
                    document.getElementById("PwdValueCheck").value="";
                    return
                }
                //测试
                // router.push({path:'/login'})
                //与后端进行数据传输
                register(data).then(res=> {
                    if(res.code === 0){
                        ElMessage.success('创建成功');
                        router.push({path:'/'})
                    }else{
                        alert(res.message)
                    }
                }).catch(res => {
                    alert(res.data.message)
                })
            };
            return{
                RegisterData,RegisterBtn
            }
        }
    }
</script>

<style scoped>
    body {
        background: #ebebeb;
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
    }
    .register_box{
        background: white;
        border: 1px solid rgb(231, 231, 231);
        border-image: none;
        width: 450px;
        height: 400px;
        text-align: center;
        opacity: 50%;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .input_box{
        position: relative;
    }
    .ipt{
        border: 1px solid #cccccc;
        width: 340px;
        margin-top: 15px;
    }
    #SexRadio{
        text-align: left;
        margin-left: 55px;
        margin-top: 15px;
    }
</style>
