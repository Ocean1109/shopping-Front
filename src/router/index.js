import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from "../views/Register";
import CommodityList from "../views/CommodityList";
import ShoppingCar from "../views/ShoppingCar"
import Communication from "../views/Communication";
import PersonPage from "../views/PersonPage";
import Payment from "../views/Payment";
const routes = [
  {
    //主页
    path: '/',
    name: 'Home',
    meta:{
      isShow:false,
    },
    component: Home
  },{
    //登录
    path: '/login',
    name: 'Login',
    meta:{
      isShow:false,
    },
    component: Login
  },{
    //注册
    path: '/register',
    name: 'Register',
    meta:{
      isShow:false,
    },
    component:Register
  },{
    //商品列表
    path: '/CommodityList',
    name: 'Commodity',
    meta:{
      isShow:false,
    },
    component: CommodityList
  },{
    //购物车
    path: '/ShoppingCar',
    name: 'ShoppingCar',
    meta:{
      isShow:false,
    },
    component: ShoppingCar
  },{
    //联系客服
    path: '/Communication',
    name: 'Communication',
    meta:{
      isShow:false,
    },
    component: Communication
  },{
    //个人中心
    path: '/PersonPage',
    name: 'PersonPage',
    meta:{
      isShow:false
    },
    children:[
      {
        //首页
        path: '/PersonInformation',
        name: 'PersonInformation',
        meta:{
          isShow:true,
          title:'首页'
        },
        component: ()=> import('../views/PersonInformation')
      },{
        //修改收货地址（懒加载）
        path: '/Address',
        name: 'Address',
        meta:{
          isShow:true,
          title:'我的收货地址'
        },
        component: ()=> import('../views/Address')
      },{
        //聊天室
        path: '/ChatRoom',
        name: 'ChatRoom',
        meta:{
          isShow:true,
          title:'聊天室'
        },
        component: ()=> import('../views/ChatRoom')
      },{
        //订单历史
        path: '/OrderHistory',
        name: 'OrderHistory',
        meta:{
          isShow:true,
          title:'查看我的订单'
        },
        children:[
          {
            //所有订单
            path: '/AllOrder',
            name:'AllOrder',
            meta:{
              isShow:true,
              title:'所有订单'
            },
            component:()=>import('../views/OrderStyle/AllOrder')
          },{
            //待发货
            path: '/BeforeSign',
            name:'BeforeSign',
            meta:{
              isShow:true,
              title:'待发货'
            },
            component:()=>import('../views/OrderStyle/BeforeSign')
          },{
            //待收货
            path: '/AfterSign',
            name:'AfterSign',
            meta:{
              isShow:true,
              title:'待收货'
            },
            component:()=>import('../views/OrderStyle/AfterSign')
          },{
            //待评价
            path: '/AfterEvaluate',
            name:'AfterEvaluate',
            meta:{
              isShow:true,
              title:'待评价'
            },
            component:()=>import('../views/OrderStyle/AfterEvaluate')
          }
        ],
        component: ()=> import('../views/OrderHistory')
      },{
        //商品发布
        path: '/ProductPublish',
        name: 'ProductPublish',
        meta:{
          isShow:true,
          title:'发布商品'
        },
        component: ()=> import('../views/ProductPublish')
      }
    ],
    component: PersonPage
  },{
    //注册
    path: '/payment',
    name: 'Payment',
    component:Payment
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
