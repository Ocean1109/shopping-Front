import $http from "./index";

export const login = (data)=>{
    return $http.post('/login',data)
}
