<?php
header("content-type:text/html;charset=utf-8");
//建立连接
$link = mysqli_connect("localhost","root","","aaa");

//判断是否连接成功
if(mysqli_connect_error($link)){
    echo mysqli_connect_error();
}else{
    // echo "成功";
}
//编码
mysqli_set_charset($link,"utf8");

//接受数据
$u= $_GET['text'];
$p = $_GET['pwd'];



//编写sql语句
$sql = "select * from users where name='$u' and age=$p";
//执行sql语句
$result = mysqli_query($link,$sql);
if(mysqli_fetch_assoc($result)){
    echo '1';
}else{
    echo '0';
}
?>