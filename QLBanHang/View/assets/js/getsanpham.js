const getsanpham = async (url) => {
  try {
    let response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error("Lỗi khi tải  sản phẩm.");
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
export default getsanpham;
