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
                <el-input class="Ipt" v-model="AddressData.Province" placeholder="请输入省/市/区/街道"></el-input>
            </el-form-item>
            <el-form-item>详细地址
                <el-input class="Ipt" v-model="AddressData.AddressInformation" placeholder="请输入详细地址信息"></el-input>
            </el-form-item>
            <el-form-item>收货人姓名
                <el-input style="margin-left: 17px;width: 300px" v-model="AddressData.UserName" id="username"
                          placeholder="长度不超过25个字"></el-input>
            </el-form-item>
            <el-form-item>电话号码
                <el-input class="Ipt" v-model="AddressData.UserPhone" id="userphone" placeholder="11位手机号"></el-input>
            </el-form-item>
            <el-button style="margin-left: 95px" type="primary" @click="SaveBtn">保存</el-button>
        </div>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="收货人" width="180">
            </el-table-column>
            <el-table-column prop="province" label="所在地区" width="180">
            </el-table-column>
            <el-table-column prop="address" label="详细地址">
            </el-table-column>
            <el-table-column prop="phone" label="电话号">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {reactive} from "vue"
    import {ElMessage} from "element-plus";
    import {login} from "../http/api";
    import router from "../router";

    export default {
        name: "Address",
        setup(){

            let AddressTable = reactive({
                    addresstable:[]
                }
            )
            //测试数据
            let tableData = reactive([
                {
                    name: '张三',
                    province: '北京',
                    address: '海淀',
                    phone: '11111111'
                },  {
                    name: '李四',
                    province: '天津',
                    address: '河西',
                    phone: '22222222'
                },  {
                    name: '王五',
                    province: '河北',
                    address: '石家庄',
                    phone: '11111111'
                } ,{
                    name: '赵六',
                    province: '山东',
                    address: '济南',
                    phone: '11111111'
                }])

            let AddressData = reactive({
                Province:'',
                AddressInformation:'',
                UserName:'',
                UserPhone:''
            })



            //后续进行修改
            let SaveBtn = ()=>{
                //后端属性名
                let data={"province":AddressData.Province,"address":AddressData.password,
                    "name":AddressData.UserName,"phone":AddressData.UserPhone};
                if (AddressData.UserName.length<=0){
                    ElMessage.error('用户名长度必须大于0');
                    document.getElementById('username').value="";
                    return
                }
                else if(AddressData.UserName.length>25){
                    ElMessage.error('用户名长度必须小于25');
                    document.getElementById('username').value="";
                    return
                }
                //未做正则判断
                else if(AddressData.UserPhone.length != 11){
                    ElMessage.error('手机号不符合规范');
                    document.getElementById('userphone').value="";
                    return
                }
                //返回数据并且刷新页面添加数据
                login(data).then(res=> {
                    if(res.code === 0){
                        ElMessage.success('创建成功');
                        router.push({path:'/'})
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
                tableData,
                AddressTable
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