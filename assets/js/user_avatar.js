  $(function() {

      let layer = layui.layer


      // 1.1 获取裁剪区域的 DOM 元素

      var $image = $('#image')
          // 1.2 配置选项
      const options = {
          // 纵横比
          aspectRatio: 1,
          // 指定预览区域
          preview: '.img-preview'
      }

      // 1.3 创建裁剪区域
      $image.cropper(options)


      //   上传点击事件
      $('#btn_sub').on('click', function() {
          $('#file').click()

      })

      //   图片更换  为文件选择框绑定change事件 
      $('#file').on('change', function(e) {
          let filelist = e.target.files

          if (filelist.length === 0) {
              return layer.msg('请选择头像图片')
          }

          //   选择图片后 更换图片
          // 1.拿到用户选择的文件
          let file = e.target.files[0]

          //   2将文件转为路径
          let imgURL = URL.createObjectURL(file)

          //   3.重新初始化裁剪区
          $image
              .cropper('destroy') // 销毁旧的裁剪区域
              .attr('src', imgURL) // 重新设置图片路径
              .cropper(options) // 重新初始化裁剪区域

      })

      //   图片上传
      $('#btnUpload').on('click', function() {
          // 1. 要拿到用户裁剪后的头像
          var dataURL = $image
              // 创建一个 Canvas 画布
              .cropper('getCroppedCanvas', {
                  width: 100,
                  height: 100
              })
              // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
              .toDataURL('image/png')

          $.ajax({
              method: 'POST',
              url: '/my/update/avatar',
              data: {
                  avatar: dataURL
              },
              success: function(res) {
                  if (res.status === 1) {
                      return layer.msg('头像上传失败!')
                  }
                  layer.msg('头像上传成功!')

                  //   渲染新头像  调用父页面的渲染方法
                  window.parent.getUserInfo()
              }
          })

          // 2 调用接口 把头像上传到服务器
      })

  })