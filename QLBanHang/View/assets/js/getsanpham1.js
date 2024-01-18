const url = "http://localhost/QLBH/QLBanHang/Controller/products.php";
const getCategory = async () => {
  try {
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error("Lỗi khi tải  sản phẩm.");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default getCategory;
