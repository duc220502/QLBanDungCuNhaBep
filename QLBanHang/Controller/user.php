<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require './connect.php';
mysqli_set_charset($conn, "utf8");
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $address = $data["address"];
    $yourname = $data["yourname"];
    $mail = $data["mail"];
    $number = $data["number"];
    $pass = $data["pass"];
    $sql = "INSERT INTO `user` (`name`, `address`, `email`,`phone`,`password`,`avartar`,`role`) VALUES ('$yourname', '$address', '$mail','$number','$pass','https://th.bing.com/th/id/OIP._pQBuC7BpS2Ha3Z3TamQrAAAAA?rs=1&pid=ImgDetMain',1);";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Thêm thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi thêm user"]);
    }
} else if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $sql = "SELECT email,phone FROM user";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $customers = array();
        while ($row = $result->fetch_assoc()) {
            $customers[] = $row;
        }
        echo json_encode($customers, JSON_UNESCAPED_UNICODE);
    } else {
        echo "Không có user  nào.";
    }
}
$conn->close();
?>