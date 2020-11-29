$(function(){
    // 自定义表单密码框校验
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd:function(value){
            if($('[name=oldpwd]').val() === value){
                return '新旧密码不能相同';
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newpwd]').val()){
                return '两次密码不一致！'
            }
        }
    })


    // 发送重置密码请求的功能
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg('更改密码失败!')
                }
                layui.layer.msg('更改密码成功!')
            }
            
        })

    })    
})