<!DOCTYPE html>
<html>

<head>
    <title>Đăng ký thành viên</title>
    <style type="text/css">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        text-align: center;
        margin: 0;
        padding: 0;
    }

    h2 {
        background-color: #333;
        color: #fff;
        padding: 10px;
    }

    form {
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 20px;
        width: 400px;
        margin: 20px auto;
        border-radius: 5px;
    }

    label {
        display: inline-block;
        text-align: left;
        margin: 10px 0;
        width: 30%;
        /* Điều chỉnh chiều rộng của label */
    }

    input,
    select,
    textarea {
        width: 65%;
        /* Điều chỉnh chiều rộng của input */
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    button {
        background-color: #333;
        color: #fff;
        border: none;
        padding: 10px 20px;
        margin: 10px 0;
        cursor: pointer;
    }

    button:hover {
        background-color: #555;
    }
    </style>
</head>

<body>
    <h2>Đăng ký thành viên</h2>
    <form action="register.php" method="post" onsubmit="return validateForm();">
        <label for="full_name">Họ và tên:</label>
        <input type="text" name="full_name" required><br>

        <label for="username">Tên đăng nhập:</label>
        <input type="text" name="username" required><br>

        <label for="password">Mật khẩu:</label>
        <input type="password" name="password" id="password" required><br>

        <label for="confirm_password">Nhập lại mật khẩu:</label>
        <input type="password" name="confirm_password" id="confirm_password" required><br>

        <label for="gender">Giới tính:</label>
        <select name="gender" required>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
        </select><br>

        <label for="birthdate">Ngày sinh:</label>
        <input type="date" name="birthdate" required><br>

        <label for="email">Email:</label>
        <input type="email" name="email" required><br>

        <label for="phone">Số điện thoại:</label>
        <input type="text" name="phone" pattern="[0-9]{10}" required><br>

        <label for="address">Địa chỉ:</label>
        <textarea name="address" required></textarea><br>

        <button type="submit" name="register">Đăng ký</button>
    </form>
    <?php
    if (isset($_POST['register'])) {
        ini_set('display_errors', 1);
        $conn = mysqli_connect("localhost", "root", "", "qldki");
        mysqli_set_charset($conn, 'utf8');
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $full_name = $_POST['full_name'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];
        $gender = $_POST['gender'];
        $birthdate = $_POST['birthdate'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $address = $_POST['address'];

        if ($password != $confirm_password) {
            die("Mật khẩu không trùng khớp.");
        }

        $sql = "INSERT INTO dangki (full_name, username, password, gender, birthdate, email, phone, address)
            VALUES ('$full_name', '$username', '$password', '$gender', '$birthdate', '$email', '$phone', '$address')";


        if ($conn->query($sql) !== TRUE) {
            echo "Lỗi: " . $conn->error;
        }
        $conn->close();
    }
    ?>
    <script>
    function validateForm() {
        var password = document.getElementById('password').value;
        var confirm_password = document.getElementById('confirm_password').value;

        if (password !== confirm_password) {
            alert('Mật khẩu không trùng khớp. Vui lòng thử lại.');
            document.getElementById('confirm_password').value = '';
            return false;
        } else {
            alert('Thêm thành công');
        }
    }
    </script>

</body>

</html>