// 使用 ajax 的 ajaxPrefilter 这个方法 统一拼接根路径
// 每次调用 $.get() $.post() $.ajax() 的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数，可以拿到我们给ajax提供的配置对象
// 注意： 引入该 js文件 时，必须放在 jquery.js 后面 自己的js文件 前面
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);
    // //  全局统一使用 complete 函数 ，用来限制用户的访问权限
    options.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
            // 强制清空token
            localStorage.removeItem('token');
            // 强制跳转到 注册页面
            location.href = '../../login.html';
        }
    }
})
