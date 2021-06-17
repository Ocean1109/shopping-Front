<template>
    <div>
        <el-row class="tac">
            <el-col>
                <h5>聊天列表</h5>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <template #title>导航二</template>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <template #title>导航二</template>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <template #title>导航三</template>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <template #title>导航四</template>
                    </el-menu-item>
                </el-menu>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import {ListChat} from "../http/api";
    import GLOBAL from  "../components/GlobalVariable"
    export default {
        name: "ChatList",
        setup(){
            //获取用户名
            let UserToken = GLOBAL.token.value
            console.log(UserToken)

            //获取聊天列表
            ListChat(UserToken).then(res=>{
                console.log(res)
            })
            return{
                UserToken
            }
        }
    }
</script>

<style scoped>

</style>