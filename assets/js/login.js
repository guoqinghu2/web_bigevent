$(function() {

    // 点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 表单验证
    // 首先从layui上获取 form 对象
    let form = layui.form

    // 到处弹出层
    let layer = layui.layer

    // 校验密码
    // 通过form.verify()函数 自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则  用于校验密码
        'pwd': [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        'repwd': function(value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致 请重新输入'
            }
        }
    })


    // 注册模块
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {

        // 阻止表单默认提交
        e.preventDefault()

        // 获取到表单输入的注册用户名和密码
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }

        // 发送一个携带了注册用户名和密码的post请求
        $.post('/api/reguser', data, function(res) {

            // 请求失败
            if (res.status !== 0) {
                return layer.msg('注册失败' + res.message)
            }
            layer.msg('注册成功 请登录')

            // 注册成功后 自动跳转到登录页面
            // 获取到跳转登录按钮 然后模拟人的点击行为
            $('#link_login').click()

        })
    })


    // 登录模块
    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交
        e.preventDefault()

        // 获取表单中提交的用户名和数据


        // 发起一个携带用户名和密码的post请求
        $.ajax({
            url: '/api/login',
            method: 'POST',

            //使用jquery中打serialize()  获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {

                // 登录失败
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }

                // 登录成功提示信息
                layer.msg('登录成功')

                // 登录成功后 将token存入本地存储中
                localStorage.setItem('token', res.token)
                    // // 跳转到首页
                location.href = '../大事件后后台管理项目/index.html'
            }
        })


    })




})