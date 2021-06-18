<template>
    <div class="home">
        <!--导航栏-->
        <el-menu  class="el-menu-demo" mode="horizontal" >
            <el-menu-item index="1">
                <router-link to="/PersonPage" style="text-decoration: none">
                    个人中心
                </router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link to="/ShoppingCar" style="text-decoration: none">
                    我的购物车
                </router-link>
            </el-menu-item>
            <el-menu-item index="3">联系我们</el-menu-item>
            <el-menu-item index="4">
                <div v-if="userToken==0">
                    <router-link to="/login" style="text-decoration: none">
                        点击这里，登录
                    </router-link>
                </div>
                <div v-if="userToken!=0">
                    <span>你好，{{UserName}}</span>
                </div>
            </el-menu-item>
            <el-menu-item index="5">
                <router-link to="/register" style="text-decoration: none">
                    立即注册
                </router-link>
            </el-menu-item>
        </el-menu>
        <!--logo-->
        <el-row :gutter="24">
            <el-col :span="12">
                <div style="text-align: center;margin-top: 36px">
                    <!--图标-->
                    <router-link to="/">
                        <img src="../assets/logo.png" style="height: 60px;width: 60px;border-radius: 0px">
                    </router-link>
                </div>
            </el-col>
            <el-col :span="12"></el-col>
        </el-row>

        <!--主体部分-->
        <div class="CommunicationBody">
            <el-input
                    type="textarea"
                    :rows="20"
                    placeholder="请输入您的问题"
                    v-model="text"
                    >
            </el-input>
            <el-button type="primary" @click="commit" style="margin-top: 50px">点击提交</el-button>
        </div>
    </div>

</template>

<script>
    import GLOBAL from "../components/GlobalVariable"
    import {ElMessage} from "element-plus";
    import {ref} from  "vue"
    import {useRouter} from "vue-router";

    export default {
        name: "Communication",
        setup(){

            let text = ref('');
            let UserToken = GLOBAL.token.value;
            let UserName = GLOBAL.userName.value;

            //创建路由，将关键字通过路由传递到其他页面
            const router = useRouter();

            let commit = ()=>{
                ElMessage.success({
                    message: '谢谢您的反馈，我们会及时处理您的问题',
                    type: 'success'
                });
                router.push({name:'Home'})
            }

            return{
                UserName,
                UserToken,
                commit,
                text
            }
        }
    }
</script>

<style scoped>
    body {
        background: #b1eb83;
        font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
        color: #222;
        font-size: 12px;
    }

    * {
        padding: 0px;
        margin: 0px;
    }
    .home{
        width: 100%;
        height: 100%;
        position:fixed;
        background-size:100% 100%;
        background-color: #ffeef4;
        background-image: linear-gradient(0deg, #ffeef4 0%, #d1fffc 100%);
        top:0px;
        left: 0px;
        overflow:scroll
    }
    /*导航栏*/
    .el-menu-demo{
        float: right;
        background-color: #DCFFFD;
    }
    li.el-menu-item{
        height: 40px;
        line-height: 40px;
    }
    /*联系主体*/
    .CommunicationBody{
        width: 80%;
        margin: 20px auto;
        background-color: white;
        opacity: 80%;
    }
</style>