$(function(){var i;$(".content-left ul li").hover(function(){$(this).addClass("border-b").siblings().removeClass(".border-b")},function(){$(this).removeClass("border-b").siblings().removeClass(".border-b")});var t=0;$(".next").on("click",function(){++t==$(".content-right ul li").length&&(t=0),$(".content-right ul li").eq(t).stop().fadeIn(1500,function(){0}).siblings().stop().fadeOut(1500),$(".content-right ol li").eq(t).addClass("hov").siblings().removeClass("hov")}),$(".content-right").hover(function(){clearInterval(i)},function(){i=setInterval(()=>{$(".next").click()},1500)}),i=setInterval(()=>{$(".next").click()},1500),$(".content-right ol li").mouseenter(function(){t=$(this).index(),clearInterval(i),$(".content-right ul li").eq(t).stop().fadeIn(1500,function(){0}).siblings().stop().fadeOut(1500),$(this).addClass("hov").siblings().removeClass("hov")});var n="";$.ajax({url:"../php/index.php",type:"GET",dataType:"json",success:function(i){i.forEach(i=>{n+=`
                <li>
                <a href="../html/xiangqing.html?id=${i.id}"><img src="${i.imgsrc}"></img></a>
                    <h3 >${i.title}</h3>
                    <p>￥${i.price}</p>
                </li>
                `}),$(".wen ul").html(n)}});var l="";$.ajax({url:"../php/index2.php",type:"GET",dataType:"json",success:function(i){i.forEach(i=>{l+=`
                <li>

                <a href="../html/xiangqing.html?id=${i.id}"><img src="${i.imgsrc}"></img></a>
                    <h3 >${i.title}</h3>
                    <p>￥${i.price}</p>

                </li>
                `}),$(".fa ul").html(l)}});var e="";$.ajax({url:"../php/index3.php",type:"GET",dataType:"json",success:function(i){i.forEach(i=>{e+=`
                <li>
                <a href="../html/xiangqing.html?id=${i.id}"><img src="${i.imgsrc}"></img></a>
                    <h3 >${i.title}</h3>
                    <p>￥${i.price}</p>

                </li>
                `}),$(".ertong ul").html(e)}});var o=$(".all").offset().top;console.log(o),$(window).scroll(function(){$(document).scrollTop()>=o?$(".callback").find("p").fadeIn():$(".callback").find("p").fadeOut(),$(".callback p").click(function(){$("body, html").stop().animate({scrollTop:0})})})});