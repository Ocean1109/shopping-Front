import $http from "./index";

//登录
export const login = (data)=>{
    return $http.post('/login',data)
}

//注册
export const register = (data)=>{
    return $http.post('/register',data)
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
export const ShoppingDelete = (data)=>{
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