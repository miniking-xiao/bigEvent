$(function(){
    // 验证表单规则
    var form = layui.form
    var layer = layui.layer
  
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })
  
    initUserInfo()
  
    // 初始化用户的基本信息
    function initUserInfo() {
      $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('获取用户信息失败！')
          }
          // console.log(res)
          // 调用 form.val() 快速为表单赋值
          form.val('formUserInfo', res.data)
        }
      })
    }
    

    // 实现重置表单的数据--回到修改前，而不是清空
    $('#btnReset').on('click',function(e){
        e.preventDefault(); //防止清空表单内容
        initUserInfo();
    })

    // 实现表单数据提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                 // 调用父页面中的方法，重新渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
           
        })
    })
})