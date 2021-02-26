$(function(){var t=getCookie("user"),c=document.querySelector(".box"),e=location.href,s=localStorage.getItem("cartList3");function n(){var t,e,a,i;0<s.length?(t=s.every(t=>1==t.is_select),i=0,s.forEach(t=>{i+=t.cart_number*t.price}),e=i,a=`
            <div class="big">
            <div class="nav">
                <input type="checkbox" name="quan" ${t?"checked":""} >
                全选 <span>商品信息</span> <i>单价（元）</i><i class="shu">数量</i> <b>金额（元）</b> <strong>操作</strong>
            </div>
            <div class="small">
                <input type="checkbox" name="" id="">
                <span>孔夫子自营</span>
            </div>
            
        `,s.forEach(t=>{a+=`
                <div class="bbj">
                <p> <input type="checkbox" class="top_1 " name="xuan" value="nb" ${1==t.is_select?"checked":""}   data-id="${t.id}"></p>
                <p> <img src="${t.imgsrc}"></p>
                <p>${t.title}</p>
                <p class="price">￥<span>${t.price}</span></p>
                <p>
                    <input class="aa" type="button" value="-" data-id="${t.id}">
                    <input class="cc" type="text" name="wenben" value="${t.cart_number}" data-id="${t.id}">
                    <input class="nnn" type="button" value="+" data-id="${t.id}"></p>
                <p class="xiaoji">￥<span>${t.price*t.cart_number}</span></p>
                <p>移入收藏<input type="button" value="删除" data-id="${t.id}"></p>
            </div>
            
            `}),a+=` <div class="buttom">
                <p>店铺合计</p>
                <p>￥ <span>${e}</span></p>
            </div>
        </div>
        <div class="all">
            <div class="w">
                <div class="ye">
                    <p><input type="checkbox" name="quan"  ${t?"checked":""} > </p>
                    <p>全选</p>
                    <p class="clearall">清空购物车</p>
                    <p>已选择<span class="jian">${r()[0]}</span>件商品</p>
                    <p>总计不含运费:</p>
                    <p>￥<span class="gggg">${r()[1]}</span></p>
                    <p>结算</p>
                </div>
            </div>
            </div>
            `,c.innerHTML=a):c.innerHTML=`
            <div>
                <h2>您还没有选择商品</h2>
                <p> <a href="../html/list.html">点我返回</a></p>
            </div>
            `}function r(){var e=0,a=0;return s.forEach(t=>{1==t.is_select&&(e+=t.cart_number,a+=t.cart_number*t.price)}),[e,a]}s=JSON.parse(s)||[],t?n():(alert("你还没登录，请登录在进入"),location="../html/login.html?pathUrl="+e),c.onclick=function(t){var e,a,i=(t=t||window.event).target||t.srcElement;"+"==i.value&&(e=i.getAttribute("data-id"),s.forEach(t=>{t.id==e&&t.cart_number++}),localStorage.setItem("cartList3",JSON.stringify(s)),n()),"-"==i.value&&(e=i.getAttribute("data-id"),s.forEach(t=>{t.id==e&&(t.cart_number<=1?t.cart_number=1:t.cart_number--)}),localStorage.setItem("cartList3",JSON.stringify(s)),n()),"删除"==i.value&&(e=i.getAttribute("data-id"),s=s.filter(t=>t.id!=e),localStorage.setItem("cartList3",JSON.stringify(s)),n()),"quan"==i.name&&(s.forEach(t=>{i.checked?t.is_select=1:t.is_select=0}),localStorage.setItem("cartList3",JSON.stringify(s)),n()),"xuan"==i.name&&(e=i.getAttribute("data-id"),console.log(e),s.forEach(t=>{t.id==e&&(t.is_select=1==t.is_select?"0":"1")}),localStorage.setItem("cartList3",JSON.stringify(s)),n()),"清空购物车"==i.innerHTML&&(localStorage.setItem("cartList3",JSON.stringify([])),n()),"结算"==i.innerHTML&&confirm("你确定要购买吗？")&&(alert("你需要支付：￥"+(a=0,s.forEach(t=>{1==t.is_select&&(a+=t.cart_number*t.price)}),a)),s=s.filter(t=>1!=t.is_select),localStorage.setItem("cartList3",JSON.stringify(s)),n())}});