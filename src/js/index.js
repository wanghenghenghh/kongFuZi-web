$(function () {
    /* 头部 */
    /* 每个span  鼠标划上 添加类 */
    $(".user-info div span").hover(function () {
        $(this).addClass("info")
    }, function () {
        $(this).removeClass("info")
    })
    /* 注册 登录 */
    $(".user-info div:first").hover(function () {
        $(this).find("p")[0].style.display = "block"
    }, function () {
        $(this).find("p").hide()
    })
    $(".deng").click(function () {
        location = "../html/login.html"
    })
    $(".zhu").click(function () {
        location = "../html/login.html"
    })
    /* app二维码 显示隐藏 */
    $(".user-info .app").mouseenter(function () {
        $(this).find("p").fadeIn()
    })
    $(".user-info .app").mouseleave(function () {
        $(this).find("p").fadeOut()
    })
    /* 地址部分 */
    $(".user-info .adress").hover(function () {
        $(this).find("p").show()
    }, function () {
        $(this).find("p").hide()
    })
    $(".adress p a ").on("click", function () {
        // $(".user-info .adress").find("span").eq(1).html($(this).html)
        $(this).parent().prev().html($(this).html())
        $(this).parent().hide()
        console.log($(this).html());
    })

    /* 搜索模块 */
    $("#searchInput").focus(function () {
        $(".searchInput").hide()
    })
    $("#searchInput").blur(function () {
        $(".searchInput").show()
    })
    $(".search-box span").eq(1).click(function () {
        $(this).addClass("bgcred").siblings().removeClass("bgcred")
        $(".searchInput").html("拍品名称")
    })
    $(".search-box span").eq(0).click(function () {
        $(this).addClass("bgcred").siblings().removeClass("bgcred")
        $(".searchInput").html("商品名称、作者、出版社、ISBN")
    })
    $(".search .searchBtn").click(function () {
        var vval = $("#searchInput")[0].value
        if (vval != "") {
            // console.log(vval);
            location = "../html/list.html?id=" + vval
        } else {
            alert("请输入搜索内容")
        }

    })
    /* 滚动 */
    //图书部分距离文档头部的距离
    var scrollTop1 = $(".all").offset().top
    console.log(scrollTop1);

    //页面进行滚动时
    $(window).scroll(function () {
        //文档滚动的距离
        // console.log($(document).scrollTop());
        //文档滚动的距离大于 大盒子 距离文档头部距离时 
        if ($(document).scrollTop() >= scrollTop1) {
            $(".callback").find("p").fadeIn()
        } else {
            $(".callback").find("p").fadeOut()
        }

        //点击返回顶部 就让页面滚动到 0 的位置 animate 只能是元素 做动画
        $(".callback p").click(function () {
            $("body, html").stop().animate({
                scrollTop: 0
            })
        })
    })
})