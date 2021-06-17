<template>
    <div>
        <!--标头-->
        <div style="background-color: #a0cdeb;height: 40px;line-height: 40px">
            <span style="margin-left: 10px">收货地址</span>
        </div>
        <!--输入框-->
        <div style="margin-top: 30px">
            <p style="margin-left: 10px">新增收货地址</p>
            <el-form-item>地址信息
                <el-input class="Ipt" v-model="AddressData.address" placeholder="请输入省/市/区/街道"></el-input>
            </el-form-item>

            <el-button style="margin-left: 95px;margin-bottom: 100px" type="primary" @click="SaveBtn">保存</el-button>
        </div>

        <div>
            <el-row style="margin-top: 30px">
                <el-col :span="8" style="text-align: center">
                    <span>收货人</span>
                </el-col>
                <el-col :span="8" style="text-align: center">
                    <span>收货地址</span>
                </el-col>
                <el-col :span="8" style="text-align: center">
                    <span>手机号</span>
                </el-col>
            </el-row>
            <el-row style="margin-top: 30px">
                <el-col :span="8" style="text-align: center">
                    {{AddressTable.Name}}
                </el-col>
                <el-col :span="8" style="text-align: center">
                    {{AddressTable.Address}}
                </el-col>
                <el-col :span="8" style="text-align: center">
                    {{AddressTable.phone}}
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import {reactive,ref} from "vue"
    import {ElMessage} from "element-plus";
    import {ModifyUserInfo,GetUserAddress} from "../http/api";
    import GLOBAL from "../components/GlobalVariable"

    export default {
        name: "Address",
        setup(){

            //接收后端传来的数据
            let AddressTable = reactive({
                Name:'',
                Address:'',
                phone:''
            })

            //获取用户名
            let UserToken = GLOBAL.token.value
            let UserName = GLOBAL.userName.value

            //设置地址显示状态——获取地址后才显示
            let State = ref(0);

            //获取用户地址信息
            let formData=new FormData()
            formData.append("token",UserToken)
            GetUserAddress(formData).then(res=>{
                AddressTable.Name = res.userName;
                AddressTable.Address = res.address;
                AddressTable.phone = res.tel;
                State = 1;
            })


            //传给后端的数据
            let AddressData = reactive({
                token:'',
                tel:'',
                password:'',
                userName:'',
                address:'',
                age:'',
                gender:'',
            })

            //修改或添加用户收货地址
            let SaveBtn = ()=>{
                //定义数据
                AddressData.userName = UserName;
                AddressData.tel = null;
                AddressData.age = null;
                AddressData.gender = null;
                AddressData.password = 123456;
                AddressData.token = UserToken;

                //返回数据并且刷新页面添加数据
                ModifyUserInfo(AddressData).then(res=> {
                    if(res.code === 0){
                        ElMessage.success('创建成功');
                    }else{
                        alert(res.message)
                    }
                }).catch(res => {
                    alert(res.data.message)
                })
            }
            return{
                AddressData,
                SaveBtn,
                AddressTable,
                UserName,
                UserToken,
                State
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