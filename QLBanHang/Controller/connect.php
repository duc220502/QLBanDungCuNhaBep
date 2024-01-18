<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "qlbanhang";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
}
?>