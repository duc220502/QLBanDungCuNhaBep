<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET,PATCH,DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require './connect.php';
mysqli_set_charset($conn, "utf8");

$page_size = isset($_GET['pagesize']) ? $_GET['pagesize'] : 12;
$page = isset($_GET['currentpage']) ? $_GET['currentpage'] : 1;
$start = ($page - 1) * $page_size;
if($_SERVER["REQUEST_METHOD"] === "GET") {
    if(isset($_GET['category'])) {
        $categoryID = $_GET['category'];
        $sql = "SELECT * FROM product WHERE Id_category = ".$categoryID." order by id asc Limit ".$start.",".$page_size;
        $sql1 = "SELECT * FROM product WHERE Id_category = ".$categoryID;

    } else if(isset($_GET['id'])) {
        $productId = $_GET['id'];
        $sql = "SELECT * FROM product WHERE id = ".$productId." order by id asc Limit ".$start.",".$page_size;
        $sql1 = "SELECT * FROM product WHERE id = ".$productId;
    } else if(isset($_GET['name'])) {
        $name = $_GET['name'];
        $sql = "SELECT * FROM product WHERE name LIKE '%".$name."%' ORDER BY id ASC LIMIT ".$start.",".$page_size;
        $sql1 = "SELECT * FROM product WHERE name LIKE '%".$name."%'";
        //$sql = "SELECT * FROM `product` WHERE CAST(REPLACE(price, '.', '') AS UNSIGNED) BETWEEN $minPrice AND $maxPrice";
    } else {
        $sql = "SELECT * FROM product order by id asc Limit ".$start.",".$page_size;
        $sql1 = "SELECT * FROM product";
    }
    $result = $conn->query($sql);

    $data = new stdClass();

    if($result->num_rows > 0) {
        $products = array();
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }

        $data->records = $products;

    } else {
        echo json_encode(['status' => 'error', 'message' => 'Không có sản phẩm nào.']);
    }

    $result = $conn->query($sql1);
    $data->totalRecord = $result->num_rows;
    error_log("JSON data: ".json_encode($data, JSON_UNESCAPED_UNICODE));
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
} else if($_SERVER["REQUEST_METHOD"] === "PATCH") {
    $data = json_decode(file_get_contents("php://input"), true);
    $idProduct = $data["idProduct"];
    $quantity = $data["quantity"];

    $updateQuery = "UPDATE product SET quantity = quantity - $quantity WHERE id = $idProduct";
    $updateResult = $conn->query($updateQuery);

    if($updateResult) {
        echo json_encode(["success" => true, "message" => "Cập nhật thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi cập nhật giỏ hàng"]);
    }
} else {
    echo json_encode(["error" => "Phương thức HTTP không được hỗ trợ"]);
}

$conn->close();
exit;
?>