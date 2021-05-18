import $http from "./index";

export const getData = $http.get('http://jsonplaceholder.typicode.com/posts')
export const login = (data)=>{
    return $http.post('http://10.28.146.193:8181',data)
}