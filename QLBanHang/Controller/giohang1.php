<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require './connect.php';
mysqli_set_charset($conn, "utf8");
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $idUser = $data["idUser"];
    $idProduct = $data["idProduct"];
    $quantity = $data["quantity"];

    $sql = "INSERT INTO `shopping_cart` (`id_user`, `id_product`, `quantity`) VALUES ($idUser, $idProduct, $quantity);";
    $result = $conn->query($sql);
    if ($result) {
        echo json_encode(["success" => true, "message" => "Thêm thành công."]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi thêm vào giỏ hàng"]);
    }
} else if ($_SERVER["REQUEST_METHOD"] === "GET") {
    if (isset($_GET['idProduct']) && isset($_GET['idUser'])) {
        $userid = $_GET["idUser"];
        $productid = $_GET["idProduct"];
        $sql = "SELECT * from shopping_cart where shopping_cart.id_user = " . $userid . "and shopping_cart.id_product = " . $productid;

    } else if (isset($_GET['id'])) {
        $userid = $_GET["id"];
        $sql = "SELECT product.id,product.name,product.image,shopping_cart.quantity,product.price from product INNER JOIN shopping_cart on product.id = shopping_cart.id_product where shopping_cart.id_user = " . $userid;

    } else {
        echo json_encode(['error' => 'Thiếu tham số']);
    }
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $customers = array();
        while ($row = $result->fetch_assoc()) {
            $customers[] = $row;
        }
        echo json_encode($customers);
    } else {
        echo json_encode(["success" => false, "message" => "Không có sản phẩm trong giỏ hàng"]);
    }
}
$conn->close();
?>