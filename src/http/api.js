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
    return $http.get('/product/所有')
}
//根据类别获取数据
export const ProductList = (data)=>{
    return $http.get('/product/'+data,data)
}
