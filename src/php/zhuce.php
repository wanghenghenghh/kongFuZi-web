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
$sql = "insert into users(name,age) values($u,$p)";
//执行sql语句
$result = mysqli_query($link,$sql);
// var_dump($result);
//判断是否有账号密码
if($result){
    echo "<script>alert('注册成功请登录');location='../html/login.html'</script>";
}else{
    echo "<script>alert('注册失败 请重试');location='../html/login.html'</script>";
}
?>