<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require './connect.php';
mysqli_set_charset($conn, "utf8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $mahd = $data["mahd"];
    $products = $data["products"];

    $stmt = $conn->prepare("INSERT INTO `chitiethoadon` (`mahd`, `id_product`, `soluong`) VALUES (?, ?, ?)");

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Lỗi khi chuẩn bị câu lệnh"]);
    } else {
        foreach ($products as $product) {
            $idProduct = $product["idProduct"];
            $quantity = $product["quantity"];

            $stmt->bind_param("iii", $mahd, $idProduct, $quantity);
            $result = $stmt->execute();

            if (!$result) {
                echo json_encode(["success" => false, "message" => "Lỗi khi thêm sản phẩm vào chi tiết hóa đơn"]);
                $stmt->close();
                exit();
            }
        }

        echo json_encode(["success" => true, "message" => "Tạo chi tiết hóa đơn thành công."]);
        $stmt->close();
    }
} else {
    echo json_encode(["error" => "Phương thức HTTP không được hỗ trợ"]);
}

$conn->close();
?>