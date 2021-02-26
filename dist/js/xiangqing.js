var dt,id,search=location.search,box=document.querySelector(".box");search?(id=search.split("=")[1],async function(){dt=await promiseAjax({url:"../php/xiangqing.php",data:"id="+id,datatype:"json"}),console.log(dt);var a=`
        <div class="top clearfix">
            <img src="${dt.imgsrc}" class="clearfix">
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
        `;box.innerHTML=a,$(".bottom h1 span").click(function(){var a=$(this).index();$(this).addClass("current").siblings().removeClass("current"),$(".all div").eq(a).show().siblings().hide()}),$(".gouwuche .gou").html((a=localStorage.getItem("cartList3"),(a=JSON.parse(a)).length))}()):(alert("你还没书本"),location="../html/index.html"),box.onclick=function(a){var t;"加入购物车"==((a=a||window.event).target||a.srcElement).innerHTML&&((a=localStorage.getItem("cartList3"))?(a=JSON.parse(a),t=0,a.forEach(a=>{a.id==dt.id&&(t++,a.cart_number++)}),0==t&&(dt.cart_number=1,a.push(dt)),localStorage.setItem("cartList3",JSON.stringify(a)),$(".gouwuche .gou").html(a.length).toggleClass("bgc")):(dt.cart_number=1,localStorage.setItem("cartList3",JSON.stringify([dt]))))};