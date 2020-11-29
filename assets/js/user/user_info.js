$(function(){
    // 验证表单规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname:function(value){
            if(value.length >6){
                return '昵称长度必须在 1～6 个字符之间！'
            }
        }
    })
    initUserInfo();
    function initUserInfo(){
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('获取用户基本信息失败！')
                }
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo',res.data);
            }
        })
    }
})