<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require './connect.php';
mysqli_set_charset($conn, "utf8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $tenlienhe = $data["yourname"];
    $mail = $data["mail"];
    $number = $data["number"];
    $message = $data["message"];

    $stmt = $conn->prepare("INSERT INTO `lienhe` (`tenlienhe`, `email`, `sdt`, `noidung`) VALUES (?, ?, ?, ?)");

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Lỗi khi chuẩn bị câu lệnh"]);
    } else {
        $stmt->bind_param("ssss", $tenlienhe, $mail, $number, $message);
        $result = $stmt->execute();

        if ($result) {
            echo json_encode(["success" => true, "message" => "Thêm thành công."]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi thêm liên hệ"]);
        }

        $stmt->close();
    }
} else {
    echo json_encode(["error" => "Phương thức HTTP không được hỗ trợ"]);
}

$conn->close();
?>