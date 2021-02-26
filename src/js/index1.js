$(function () {
    /* 主体部分 */
    $(".content-left ul li").hover(function () {
        $(this).addClass("border-b").siblings().removeClass(".border-b")
    }, function () {
        $(this).removeClass("border-b").siblings().removeClass(".border-b")
    })
    /* 轮播图 */
    var timer;
    var bool = true
    var a = 0
    $(".next").on("click", function () {
        a++
        if (a == $(".content-right ul li").length) {
            a = 0
        }
        $(".content-right ul li").eq(a).stop().fadeIn(1500, function () {
            bool = true
        }).siblings().stop().fadeOut(1500)
        $(".content-right ol li").eq(a).addClass("hov").siblings().removeClass("hov")

    })
    $(".content-right").hover(function () {
        clearInterval(timer)
    }, function () {
        timer = setInterval(() => {
            $(".next").click()
        }, 1500);
    })
    timer = setInterval(() => {
        $(".next").click()
    }, 1500);
    $(".content-right ol li").mouseenter(function () {
        a = $(this).index()
        clearInterval(timer)
        $(".content-right ul li").eq(a).stop().fadeIn(1500, function () {
            bool = true
        }).siblings().stop().fadeOut(1500)
        $(this).addClass("hov").siblings().removeClass("hov")
    })
    /* 图书部分 */
    var str = ''
    $.ajax({
        url: '../php/index.php',
        type: "GET",
        dataType: "json",
        success: function (dt) {

            dt.forEach(item => {
                str += `
                <li>
                <a href="../html/xiangqing.html?id=${item.id}"><img src="${item.imgsrc}"></img></a>
                    <h3 >${item.title}</h3>
                    <p>￥${item.price}</p>
                </li>
                `
            });
            $(".wen ul").html(str)
        }
    })
    var str2 = ''
    $.ajax({
        url: '../php/index2.php',
        type: "GET",
        dataType: "json",
        success: function (dt) {

            dt.forEach(item => {
                str2 += `
                <li>

                <a href="../html/xiangqing.html?id=${item.id}"><img src="${item.imgsrc}"></img></a>
                    <h3 >${item.title}</h3>
                    <p>￥${item.price}</p>

                </li>
                `
            });
            $(".fa ul").html(str2)
        }
    })
    var str3 = ''
    $.ajax({
        url: '../php/index3.php',
        type: "GET",
        dataType: "json",
        success: function (dt) {
            dt.forEach(item => {
                str3 += `
                <li>
                <a href="../html/xiangqing.html?id=${item.id}"><img src="${item.imgsrc}"></img></a>
                    <h3 >${item.title}</h3>
                    <p>￥${item.price}</p>

                </li>
                `
            });
            $(".ertong ul").html(str3)
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