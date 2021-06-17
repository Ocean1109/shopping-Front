<template>
    <div class="home">
        <!--导航栏-->
        <el-menu  class="el-menu-demo" mode="horizontal" >
            <el-menu-item index="1">个人中心</el-menu-item>
            <el-menu-item index="2">
                <router-link to="/ShoppingCar" style="text-decoration: none">
                    我的购物车
                </router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link to="/Communication" style="text-decoration: none">
                    联系我们
                </router-link>
            </el-menu-item>
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

        <!--主体部分-->
        <div class="PersonBody">
            <el-container>
                <el-header style="background-color: white">
                    <!--图标，返回主页-->
                    <router-link to="/">
                        <img src="../assets/image1.png" style="height: 60px;width: 60px">
                    </router-link>
                </el-header>
                <el-container>
                    <el-aside width="200px" style="opacity: 60%">
                        <el-menu class="el-menu-vertical-demo">
                            <el-menu-item class="LeftList" v-for="item in TableList" :key="item.name" :label="item.name">
                                <router-link :to="item.path" style="text-decoration: none;color: black">{{item.meta.title}}</router-link>
                            </el-menu-item>
                        </el-menu>
                    </el-aside>
                    <el-main style="background-color: white;opacity: 60%;height: 1500px">
                        <router-view/>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>

</template>

<script>
    import GLOBAL from "../components/GlobalVariable"

    import router from "../router/index"
    export default {
        name: "PersonPage",

        setup(){
            //用户token和用户名
            let userToken = GLOBAL.token.value;
            let UserName = GLOBAL.userName.value;
            let TableList = router.options.routes[6].children;
            return{
                TableList,
                userToken,
                UserName
            }
        },

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
    .PersonBody{
        margin-top: 50px;
        text-align: left;
    }
    .LeftList{
        text-align: center;

    }
</style>