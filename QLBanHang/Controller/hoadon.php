<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require './connect.php';
mysqli_set_charset($conn, "utf8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $idUser = $data["idUser"];
    $sdt = $data["sdt"];
    $address = $data["address"];
    $totalprice = $data["totalprice"];
    $date = date('Y-m-d', strtotime($data["date"]));
    $stmt = $conn->prepare("INSERT INTO `hoadon` (`makh`, `sdt`, `diachinhan`, `tongtien`, `ngaydat`) VALUES (?, ?, ?, ?, ?)");

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Lỗi khi chuẩn bị câu lệnh"]);
    } else {
        $stmt->bind_param("issss", $idUser, $sdt, $address, $totalprice, $date);
        $result = $stmt->execute();
        if ($result) {
            echo json_encode(["success" => true, "message" => "Tạo hóa đơn thành công."]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi thêm hóa đơn"]);
        }
        $stmt->close();
    }
} else if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $stmt = $conn->prepare("SELECT mahd FROM hoadon ORDER BY mahd DESC LIMIT 1");

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Lỗi khi chuẩn bị câu lệnh"]);
    } else {
        $stmt->execute();
        $stmt->bind_result($mahd);
        $stmt->fetch();

        echo json_encode(["success" => true, "mahd" => $mahd]);

        $stmt->close();
    }
} else {
    echo json_encode(["error" => "Phương thức HTTP không được hỗ trợ"]);
}

$conn->close();
?>