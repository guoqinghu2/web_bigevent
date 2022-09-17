$(function() {
    // 导入layui的from
    let form = layui.form

    let layer = layui.layer

    // 创建自定义表单规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    // 获取用户信息并渲染的函数
    initUserInfo()

    // 定义一个 获取用户信息并渲染的函数
    function initUserInfo() {

        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            //注意 根据前面导入的/baseApi.js"脚本 这里会自动加上当前的表头 就是token 
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }

                // 调用form.val()快速为表单赋值
                form.val('formUser', res.data)
            }

        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止用户默认重置
        e.preventDefault()
            // 再次调用渲染用户信息函数
        initUserInfo()
    })

    // 监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止默认用户提交
        e.preventDefault()

        // 发起ajax数据请求
        $.ajax({
            method: 'POSt',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                // 调用父页面的渲染头像和昵称的函数
                // window代表当前ifrom页面
                // 调用父页面的getUserInfo() 方法
                // 就可以在把修改了的个人信息上传服务器后 实时渲染
                window.parent.getUserInfo()

                layer.msg('更新用户信息成功！')

            }

        })
    })


})