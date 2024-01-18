<?php
header('Access-Control-Allow-Origin: *');
require './connect.php';
mysqli_set_charset($conn, "utf8");
$sql = "SELECT * FROM product_category";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $customers = array();
    while ($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
    echo json_encode($customers, JSON_UNESCAPED_UNICODE);
} else {
    echo "Không có danh mục sản phẩm  nào.";
}

$conn->close();
?>