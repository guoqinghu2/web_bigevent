// 注意 每次调用$.ajax()或者$.post()或者$.get()时
// 会对$.ajax()或者$.post()或者$.get() 进行一个预处理
// 在这个函数中  我们把根目录存进来，会自动给我们拼接一个完整请求地址

$.ajaxPrefilter(function(options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 当有需要有权限的请求才会携带token
    // 所以对url地址进行一个筛选 
    // 如果 url 中有 /my 
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载限制非权限接口
    // options.complete = function(res) {
    //     // 在complete回调函数中  可以使用 res.responseJSON拿到服务器响应回来的数据
    //     if (res.res.responseJSON.status === 1 && res.res.responseJSON.message === '身份认证失败!') {
    //         // 1强制清空token
    //         localStorage.removeItem('token')
    //             // 2强制跳转登录页面
    //         location.href = './login.html'
    //     }
    // }


})