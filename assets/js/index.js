$(function() {

    // 调用getUserInfo 获取用户基本信息
    getUserInfo()

    // 退出模块
    // 导入layer
    let layer = layui.layer

    $('#btnLoginOut').on('click', function() {
        layer.confirm('确定退出?', { icon: 3, title: '退出提醒' }, function(index) {

            //    清空token
            localStorage.removeItem('token')

            // 跳转页面
            location.href = './login.html'

            // 取消
            layer.close(index);
        });
    })







})

// 定义一个获取用户基本信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        // Headers就是请求头配置对象
        // headers: {

        //     // 从本地存储中 获取 token
        //     Authorization: localStorage.getItem('token') || ''

        // },
        success: function(res) {
            if (res.status !== 0) {

                return layui.layer.msg('获取用户信息失败！')

            }

            //    获取用户信息成功后  渲染用户头像
            // 调用 renderAvatar()
            renderAvatar(res.data)
        },
        // 无论调用成功还是失败 都会调用这个complete回调函数、
        // 权限接口限制
        complete: function(res) {

            // 在complete回调函数中  可以使用 res.responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1强制清空token

                localStorage.removeItem('token')
                    // 2强制跳转登录页面
                location.href = './login.html'
            }
        }
    })
}

// 定义渲染用户头像的函数
function renderAvatar(user) {

    //1 获取用户的文本昵称信息
    // 优先获取Nickname  
    let name = user.nickname || user.username

    // 2 渲染用户的昵称
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 3 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1如果有用户头像  就渲染用户头像

        // 获取图片 更改图片地址 并显示出来
        $('.layui-nav-img').attr('src', user.user_pic).show()

        // 隐藏文字头像
        $('.text-avatar').hide()

    } else {
        // 3.2如果没有  就渲染文字头像
        // 渲染用户的英文名字第一个字母并大写或者中文的第一个字
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
            // 隐藏图片头像
        $('.layui-nav-img').hide()
    }

}