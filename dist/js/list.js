var name1,search=location.search,shop=document.querySelector(".shop"),pagination1=document.querySelector(".pagination");search?(name1=search.split("=")[1],async function(){var i=await promiseAjax({url:"../php/list.php",data:"name="+name1,datatype:"json"});new Pagination(pagination1,{pageInfo:{pagenum:1,pagesize:8,totalsize:i.length,totalpage:Math.ceil(i.length/8)},textInfo:{first:"首页",prev:"上一页",next:"下一页",last:"尾页"},cb:function(a){var a=i.slice(8*(a-1),8*a),n="";a.forEach(a=>{n+=`
                    <div class="list1 clearfix">
                    <a href="../html/xiangqing.html?id=${a.id}"><img src="${a.imgsrc}"></img></a>
                    <div class="right">
                        <h2><a href="../html/xiangqing.html?id=${a.id}">${a.title}</a></h2>
                        <p>${a.zuozhe} 著</p>
                        <p><span>${a.chubanshe}</span><span>/${a.chubanriqi}</span> <span>/￥${a.price}</span></p>
                    </div>
                </div>
                    `}),shop.innerHTML=n}}),$(window).scroll(function(){console.log($(document).scrollTop()),500<=$(document).scrollTop()?$(".callback").find("p").fadeIn():$(".callback").find("p").fadeOut(),$(".callback p").click(function(){$("body, html").stop().animate({scrollTop:0})})})}()):(alert("请选择类型"),location="../html/index.html");