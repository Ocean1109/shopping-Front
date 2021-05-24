import $http from "./index";

export const login = (data)=>{
    return $http.post('/login',data)
}
export const ReapData = ()=>{
    return $http.get('/login')
}