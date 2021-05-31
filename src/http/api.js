import $http from "./index";

export const login = (data)=>{
    return $http.post('/login',data)
}

export const register = (data)=>{
    return $http.post('/register',data)
}
export const allProduct = ()=>{
    return $http.get('/product/所有')
}

