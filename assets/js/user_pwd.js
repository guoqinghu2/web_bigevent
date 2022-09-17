$(function() {

    let form = layui.form

    // 定义密码校验规则
    form.verify({
        // 定义密码长度限制
        pwd: [
            /^[\S]{6,16}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 定义新密码与旧密码是否一致规则
        samPwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码与原密码一致'
            }
        },

        // 检验两次密码是否一致规则
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致!'
            }
        }
    })

    // 密码修改提交
    // 给表单绑定一个submit提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
            //    发起一个ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')

                // 重置表单
                // 将jquery对象转换为原生对象 调用reset方法
                $('.layui-form')[0].reset()
            }
        })
    })



})