$(function(){
    getUserInfo();
    // 退出登录操作
    $('#log_out').on('click',function(){
        // 提示用户是否退出
        layer.confirm('确定是否退出?', {icon: 3, title:'提示'}, function(index){  
            // do sth
            // 先清空token
            localStorage.removeItem('token');
            // 跳转至登录界面   
            location.href='../../login.html';  
            // layui自带的关闭 comfirm 询问框
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // 请求头配置对象
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        success:function(res){
           
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvator(res.data);
        },
        // 限制用户的访问权限--用户再未登录的情况下，直接通过修改网页的文件名来跳转到指定的页面  -- 写入了全局统一的baseAPI的js文件
        // complete:function(res){
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //         // 清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转到 注册页面
        //         location.href = '../../login.html';
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvator(user){
    // 获取用户名称  昵称（写在前面） 和 用户名
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染用户头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
    
}

