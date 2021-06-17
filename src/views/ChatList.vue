<template>
    <div>
        <el-row class="tac">
            <el-col>
                <h5>聊天列表</h5>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo">
                    <div v-for="(item,index) in ChatRoomList.list" :key="index">
                    <el-menu-item>
                        <router-link to="/ChatRoom" style="text-decoration: none" @click="ChatSeller(item.anotherUserId,item.id)">
                            To:  {{item.anotherUserName}}
                        </router-link>
                    </el-menu-item>
                    </div>
                </el-menu>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    import {ListChat} from "../http/api";
    import {reactive} from "vue"
    import GLOBAL from  "../components/GlobalVariable"
    import {useRouter} from "vue-router";
    export default {
        name: "ChatList",
        setup(){
            //获取用户名
            let UserToken = GLOBAL.token.value

            //获取聊天列表
            let ChatRoomList = reactive({
                list:[],
            })

            //创建路由，将关键字通过路由传递到其他页面
            const router = useRouter();

            //获取聊天列表
            ListChat(UserToken).then(res=>{
                ChatRoomList.list = res
                console.log(ChatRoomList.list)
            })

            //联系商家，跳转页面
            let ChatSeller =(userid,chatid)=>{
                router.push({name:'ChatRoom', params:{CellerUserId:userid,ChatId:chatid}})
            }

            return{
                UserToken,
                ChatRoomList,
                ChatSeller
            }
        }
    }
</script>

<style scoped>

</style>