import axios from "axios";
//axios.create创建了一个实例，在此编写配置，后续所有通过实例发送的请求都受到配置约束
const $http = axios.create({
    baseURL: 'http://localhost:8181',
    timeout: 100000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
$http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //添加一个头部token，动态接收的
    config.headers.token='122122';
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    return data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default $http
