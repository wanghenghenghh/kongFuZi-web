$(function () {
    $("h2").on("click", function () {
        $(this).addClass("current").siblings().removeClass("current")
        var index = $(this).index()
        console.log(index);
        $(".dd").eq(index).show().siblings(".dd").hide()
    })
    /* 注册模块 */
    $(".xieyi").change(function () {
        if ($(".xieyi").prop("checked")) {
            $(".denglu").removeAttr("disabled")
        } else {
            $(".denglu").attr("disabled", "disabled")
        }
    })
    //获取操作对象
    var submit = document.querySelector('[type="submit"]')
    var user = document.querySelector('[type="text"]')
    var pass = document.querySelector('[type="password"]')
    //获取地址栏中的参数
    var search = location.search
    //给能被点击的登录按钮绑定点击事件
    submit.onclick = function () {
        //获取账号输入框中的value
        var u1 = user.value
        var p1 = pass.value
        console.log(u1, p1);
        //调用ajax发送请求
        Ajax({
            url: '../php/denglu.php',
            data: `text=${u1}&pwd=${p1}`,
            success: function (dt) {
                //判断当前返回值是否等于1
                if (dt == 1) {
                    //判断当前地址栏中是否有参数
                    if (search) {
                        //获取参数中传入的地址
                        var new_url = search.split('=')[1]
                        location.href = new_url
                    } else {
                        location.href = "../html/list.html"
                    }
                    setCookie("user", u1)
                } else {
                    alert("登录失败")
                }
            }
        })
        return false
    }


})