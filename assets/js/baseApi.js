// 注意 每次调用$.ajax()或者$.post()或者$.get()时
// 会调用这个函数
// 在这个函数中  我们把根目录存进来，会自动给我们拼接一个完整请求地址

$.ajaxPrefilter(function(options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})