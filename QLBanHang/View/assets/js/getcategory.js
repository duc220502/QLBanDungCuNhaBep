export let categoryId = new URLSearchParams(window.location.search).get(
  "category"
);
const url = "http://localhost/QLBH/QLBanHang/Controller/category.php";
if (categoryId != null) {
}
const getCategory = async () => {
  try {
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error("Lỗi khi tải danh mục sản phẩm.");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default getCategory;
