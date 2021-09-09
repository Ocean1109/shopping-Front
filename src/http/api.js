import $http from "./index";

//退出登录
export const logOut = ()=>{
    return $http.get('/deleteTokenOfCookie')
}

//登录
export const login = (data)=>{
    return $http.post('/login',data)
}

//注册
export const register = (data)=>{
    return $http.post('/register',data)
}

//主页持久化登录，每次刷新不会清除用户数据
export const keepLogin = ()=>{
    return $http.get('/isLogin')
}

//主页获取数据
export const allProduct = ()=>{
    return $http.get('/product/全部/全部/全部')
}

//商品列表
//根据类别获取数据
export const ProductListOne = (productType)=>{
    return $http.get(`/product/${productType}/全部/全部`)
}

//根据品牌获取数据
export const ProductListTwo = (productType,type)=>{
    return $http.get(`/product/${productType}/${type}/全部`)
}

//根据地点获取数据
export const ProductListThree = (productType,address)=>{
    return $http.get(`/product/${productType}/全部/${address}`)
}

//购物车
//购物车传递用户token  将数据从JSON转换为FormData格式
export const ShoppingUserToken = (token)=>{
    return $http.post('/ShowShoppingCart',token,
        {'Content-Type':'multipart/form-data'});
}

//删除购物车数据
export const ShoppingChange = (data)=>{
    return $http.post('/ShoppingCart',data)
}

//结算生成订单
export const GenerateOrder = (data)=>{
    return $http.post('/generateOrder',data)
}

//发布商品
//上传商品图片文件
export const PublishProductInformation = (file)=>{
    return $http.post('/release',file,{'Content-Type':'multipart/form-data'})
}

//用户收货地址
//修改用户收货地址
export const ModifyUserInfo = (data)=>{
    return $http.post('/UpdateUserInfo',data)
}

//获取用户收货地址
export const GetUserAddress = (token)=>{
    return $http.post('/ShowUserInfo',token,{'Content-Type':'multipart/form-data'})
}

//商品详细信息
//获取商品详细信息
export const GetDetailProductInfo = (id)=>{
    return $http.get(`/product/${id}`)
}

//添加购物车
export const ShoppingAdd = (data)=>{
    return $http.post('/ShoppingCart',data)
}

//获取所有订单
export const GetOrder = (id)=>{
    return $http.post('/getOrders',id,{'Content-Type':'multipart/form-data'})
}

//确认收货，将待收货改成待评价
export const ReceivedProduct = (id)=>{
    return $http.post('/completeOrder',id,{'Content-Type':'multipart/form-data'})
}

//获取卖家所有订单
export const GetSellerProduct = (id)=>{
    return $http.post('/getOrder4Shopkeeper',id,{'Content-Type':'multipart/form-data'})
}

//已发货，修改订单状态
export const SendProduct = (id)=>{
    return $http.post('/sendingProduct',id,{'Content-Type':'multipart/form-data'})
}

//查看卖家发布的商品
export const ProductPublishedList = (token)=>{
    return $http.post('/listBusinessman',token,{'Content-Type':'multipart/form-data'})
}

//删除发布的商品
export const DeleteProduct = (id)=>{
    return $http.post('/delete',id,{'Content-Type':'multipart/form-data'})
}

//搜索商品，根据商品名字
export const SearchProduct = (name)=>{
    return $http.post('/search',name,{'Content-Type':'multipart/form-data'})
}

//获取聊天列表
export const ListChat=(token)=>{
    return $http.get('/chat',{headers:{'ownToken':token}})
}

//获取历史聊天信息
export const ListChatDetail=(chatId)=>{
    return $http.get(`/chat/${chatId}`)
}

//创建新的聊天
export const CreateChat = (data)=>{
    return $http.post('/newChat',data,{'Content-Type':'multipart/form-data'})
}

//买家消费行为对比
export const BehaviorCom = ()=>{
    return $http.get('/analysisAction')
}

//买家性别对比
export const SexCom = ()=>{
    return $http.get('/compareNum')
}

//买家年龄对比
export const AgeCom = ()=>{
    return $http.get('/compareAge')
}

//商品交易量对比
export const CategoryCom = ()=>{
    return $http.get('/topProductCategory')
}

//上传文件
export const UploadFile = (data)=>{
    return $http.post('/ImportCsv',data,{'Content-Type':'multipart/form-data'})
}
//中国地图数据
export const MapCom = ()=>{
    return $http.get('/compareProvince')
}