$(function () {

    //获取账号cookie
    var name1 = getCookie("user")
    //获取大盒子对象
    var box = document.querySelector(".box")
    //获取地址栏中的地址
    var url = location.href
    //获取localStorage中的cartList3
    var cartList = localStorage.getItem("cartList3")
    //把当前cartList字符串转为数组对象
    cartList = JSON.parse(cartList) || []
    //判断当前cookie是否存在
    if (name1) {
        show()
    } else {
        alert("你还没登录，请登录在进入")
        location = "../html/login.html?pathUrl=" + url
    }

    function show() {
        //判断当前localStorage中是否有内容
        if (cartList.length > 0) {
            //获取全选框是否被选中
            var aa = cartList.every(item => {
                //判断当前商品是否被选中
                return item.is_select == 1
            })
            //获取当前被选中商品的种类和价格
            var sum = total1()
            var str2 = `
            <div class="big">
            <div class="nav">
                <input type="checkbox" name="quan" ${aa?"checked":''} >
                全选 <span>商品信息</span> <i>单价（元）</i><i class="shu">数量</i> <b>金额（元）</b> <strong>操作</strong>
            </div>
            <div class="small">
                <input type="checkbox" name="" id="">
                <span>孔夫子自营</span>
            </div>
            
        `
            //遍历数组中所有商品
            cartList.forEach(item => {
                str2 += `
                <div class="bbj">
                <p> <input type="checkbox" class="top_1 " name="xuan" value="nb" ${item.is_select==1?"checked":'' }   data-id="${item.id}"></p>
                <p> <img src="${item.imgsrc}"></p>
                <p>${item.title}</p>
                <p class="price">￥<span>${item.price}</span></p>
                <p>
                    <input class="aa" type="button" value="-" data-id="${item.id}">
                    <input class="cc" type="text" name="wenben" value="${item.cart_number}" data-id="${item.id}">
                    <input class="nnn" type="button" value="+" data-id="${item.id}"></p>
                <p class="xiaoji">￥<span>${item.price*item.cart_number}</span></p>
                <p>移入收藏<input type="button" value="删除" data-id="${item.id}"></p>
            </div>
            
            `
            })
            //给当前字符串拼接结束的标签
            str2 +=
                ` <div class="buttom">
                <p>店铺合计</p>
                <p>￥ <span>${sum}</span></p>
            </div>
        </div>
        <div class="all">
            <div class="w">
                <div class="ye">
                    <p><input type="checkbox" name="quan"  ${aa?"checked":''} > </p>
                    <p>全选</p>
                    <p class="clearall">清空购物车</p>
                    <p>已选择<span class="jian">${total20()[0]}</span>件商品</p>
                    <p>总计不含运费:</p>
                    <p>￥<span class="gggg">${total20()[1]}</span></p>
                    <p>结算</p>
                </div>
            </div>
            </div>
            `
            //最后把拼接好的内容添加到box大盒子中
            box.innerHTML = str2
        } else {
            var str1 = `
            <div>
                <h2>您还没有选择商品</h2>
                <p> <a href="../html/list.html">点我返回</a></p>
            </div>
            `
            //把当前内容添加到box盒子中
            box.innerHTML = str1
        }
    }
    //给box大盒子对象绑定点击事件
    box.onclick = function (e) {
        var e = e || window.event
        //获取点击对象
        var target = e.target || e.srcElement
        //判断当前点击的是否为+
        if (target.value == "+") {
            //获取当前对象中的id属性
            var id = target.getAttribute("data-id")
            // console.log(id);
            //遍历cartList数组对象
            cartList.forEach(item => {
                //判断遍历出来的商品是否为当前操作商品
                if (item.id == id) {
                    item.cart_number++
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
            show()
        }
        //判断当前点击的是否为减法按钮
        if (target.value == '-') {
            //获取当前对象中的id属性
            var id = target.getAttribute("data-id")
            //遍历cartList数组对象
            cartList.forEach(item => {
                //判断遍历出来的商品是否为当前操作商品
                if (item.id == id) {
                    if (item.cart_number <= 1) {
                        item.cart_number = 1
                    } else {
                        item.cart_number--
                    }
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
            show()
        }
        //删除
        if (target.value == "删除") {
            //获取当前点击对象的id
            var id = target.getAttribute("data-id")
            cartList = cartList.filter(item => {
                //过滤被删除的商品
                return item.id != id
            })
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
            show()
        }
        //全选
        if (target.name == "quan") {
            //遍历所有商品
            cartList.forEach(item => {
                //判断当前全选框是否被选中
                if (target.checked) {
                    item.is_select = 1
                } else {
                    item.is_select = 0
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
            show()
        }
        //选中框
        if (target.name == "xuan") {
            //获取当前商品对应的id 
            var id = target.getAttribute("data-id")
            console.log(id);
            //遍历数组中所有的商品对象
            cartList.forEach(item => {
                if (item.id == id) {
                    item.is_select = item.is_select == 1 ? "0" : "1"
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
            show()
        }
        //点击文本框
        if (target.name == "wenben") {
            alert("禁止点击 略略略")
            //获取当前对象中的id属性
            var id = target.getAttribute("data-id")
            // console.log(id);
            //遍历cartList数组对象
            cartList.forEach(item => {
                //判断遍历出来的商品是否为当前操作商品
                if (item.id == id) {
                    item.cart_number == target.value
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
            show()
        }
        //清空购物车
        if (target.innerHTML == "清空购物车") {
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList3", JSON.stringify([]))
            //调用show方法，重新把页面再次渲染
            location = "../html/cart.html"
            show()
        }
        //去结算
        if (target.innerHTML == "结算") {
            //添加确认框
            if (confirm("你确定要购买吗？")) {
                alert("你需要支付：￥" + total())
                cartList = cartList.filter(item => {
                    return item.is_select != 1
                })
                //重新把当前操作完毕的数组添加到localStorage中
                localStorage.setItem("cartList3", JSON.stringify(cartList))
                //调用show方法，重新把页面再次渲染
                show()
            }
        }


    }
    //统计所选商品种类和价格
    function total() {
        var price = 0 //所选商品总价格
        //遍历cartList数组对象
        cartList.forEach(item => {
            //判断当前商品是否被选中
            if (item.is_select == 1) {
                price += item.cart_number * item.price
            }
        })
        return price
    }
    //统计所有商品的价格 直接渲染店铺合计
    function total1() {
        var price1 = 0 //所选商品总价格
        //遍历cartList数组对象
        cartList.forEach(item => {
            //判断当前商品是否被选中
            price1 += item.cart_number * item.price
        })
        return price1
    }
    //统计所选商品种类和价格
    function total20() {
        var num20 = 0 //所选商品种类
        var price20 = 0 //所选商品总价格
        //遍历cartList数组对象
        cartList.forEach(item => {
            //判断当前商品是否被选中
            if (item.is_select == 1) {
                num20 += item.cart_number
                price20 += item.cart_number * item.price
            }
        })
        return [num20, price20]
    }
})