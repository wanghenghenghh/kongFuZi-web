//获取当前地址栏中的参数信息
var search = location.search
//获取大盒子对象
var box = document.querySelector(".box")
var dt;
//判断当前search对象中是否有值
if (search) {
    //分割search字符串
    var id = search.split('=')[1];

    (async function () {
        dt = await promiseAjax({
            url: '../php/xiangqing.php',
            data: 'id=' + id,
            datatype: 'json'
        })
        console.log(dt);
        //创建拼接所有内容的字符串
        var str =
            `
        <div class="top clearfix">
            <img src="${dt.imgsrc}" class="clearfix" alt="${dt.title}" title="${dt.title}">
            <div class="right clearfix">
                <h3>${dt.title}</h3>
                <p><span>${dt.zuozhe} 著</span> <span>${dt.chubanshe}</span> <span>${dt.chubanriqi}</span></p>
                <h2>
                    售价 ￥ <span>${dt.price}</span>
                </h2>
                <a href="../html/cart.html">立即购买</a>
                <a href="javascript:;" class="join">加入购物车</a>
            </div>
        </div>
        <div class="bottom clearfix">
            <h1>
                <span class="current">商品图片</span>
                <span>商品简介</span>
            </h1>
            <div class="all">
                <div class="tupian">
                    <img src="${dt.imgsrc}">
                </div>
                <div class="jianjie">
                    ${dt.jianjie}
                </div>
            </div>
        </div>
        `
        //把当前拼接好的字符串，添加到row盒子中
        box.innerHTML = str
        $(".bottom h1 span").click(function () {
            var index = $(this).index()
            $(this).addClass("current").siblings().removeClass("current")
            $(".all div").eq(index).show().siblings().hide()
        })

        $(".top > img").on("click", function () {
            window.open(`${dt.imgsrc}`)
        })
        $(".gouwuche .gou").html(carts())

        function carts() {
            //获取localStorage中的cartList3
            var cartList = localStorage.getItem("cartList3")
            //把当前cartList字符串转为数组对象
            cartList = JSON.parse(cartList)
            return cartList.length
        }
    })()

} else {
    alert("你还没书本")
    location = "../html/index.html"
}

//给大盒子对象绑定点击事件
box.onclick = function (e) {
    var e = e || window.event
    //获取点击对象
    var target = e.target || e.srcElement
    //判断点击的对象是否为加入购物车按钮
    if (target.innerHTML == "加入购物车") {
        //获取localStorage中的cartList3
        var cartList = localStorage.getItem("cartList3")
        //判断当前获取的cartList是否存在
        if (cartList) {
            //把localStorage中获取的内容转为数组对象
            cartList = JSON.parse(cartList)
            var a = 0 //判断当前添加的商品是否在localStorage中存在
            //遍历数组中所有元素啊
            cartList.forEach(item => {
                //判断当前遍历的商品是否等于要添加的商品
                if (item.id == dt.id) {
                    a++
                    item.cart_number++
                }
            })
            //判断a变量是否等于0
            if (a == 0) {
                //修改商品数量
                dt.cart_number = 1
                //把当前对象追加到数组中
                cartList.push(dt)
            }
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
            $(".gouwuche .gou").html(cartList.length).toggleClass("bgc")
        } else {
            //修改当前商品数量
            dt['cart_number'] = 1
            //把当前商品添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify([dt]))
        }

    }
}