//获取当前地址栏中的参数信息
var search = location.search
//获取操作对象
var shop = document.querySelector('.shop');
var pagination1 = document.querySelector('.pagination');
if (search) {
    //分割search字符串
    var name1 = search.split('=')[1];
    (async function () {
        var dt = await promiseAjax({
            url: '../php/list.php',
            data: 'name=' + name1,
            datatype: 'json'
        })
        //创建分页器对象
        new Pagination(pagination1, {
            pageInfo: {
                pagenum: 1,
                pagesize: 8,
                totalsize: dt.length,
                totalpage: Math.ceil(dt.length / 8)
            },
            textInfo: {
                first: '首页',
                prev: "上一页",
                next: "下一页",
                last: "尾页"
            },
            cb(m) {
                if (dt.length == 0) {
                    alert("暂时没有查到 嘤嘤嘤")
                    location = "../html/index.html"
                } else {
                    console.log(dt);
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 8, m * 8)
                    //创建拼接所有数据的字符串
                    var str = ''
                    //遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                    <div class="list1 clearfix">
                    <a href="../html/xiangqing.html?id=${item.id}"><img src="${item.imgsrc}"></img></a>
                    <div class="right">
                        <h2><a href="../html/xiangqing.html?id=${item.id}">${item.title}</a></h2>
                        <p>${item.zuozhe} 著</p>
                        <p><span>${item.chubanshe}</span><span>/${item.chubanriqi}</span> <span>/￥${item.price}</span></p>
                    </div>
                </div>
                    `
                    })
                    //把当前拼接好的字符串，添加到row盒子中
                    shop.innerHTML = str
                }
            }
        })
        /* 滚动 */
        //图书部分距离文档头部的距离
        var scrollTop1 = 500;
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
    })()
} else {
    alert("请选择类型")
    location = "../html/index.html"
}