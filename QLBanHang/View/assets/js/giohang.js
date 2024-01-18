import { getAddress } from "./Dangki.js";
export async function addCart(idUser, idProduct, Quantity) {
  const urlTk = `http://localhost/QLBH/QLBanHang/Controller/giohang.php?idUser=${idUser}&idProduct=${idProduct}`;
  getGioHang(urlTk).then((data) => {
    console.log(data);
    if (Array.isArray(data)) {
      console.log(data);
      let cart = {
        idUser: idUser,
        idProduct: idProduct,
        quantity: parseInt(Quantity) + parseInt(data[0].quantity),
      };
      console.log(cart);
      handleAddCart(cart, "PATCH");
    } else {
      let cart = {
        idUser: idUser,
        idProduct: idProduct,
        quantity: Quantity,
      };
      handleAddCart(cart, "POST");
    }
  });
}
async function handleAddCart(dataCart, method) {
  const response = await fetch(
    "http://localhost/QLBH/QLBanHang/Controller/giohang.php",
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCart),
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.success) {
    alert("Thêm vào giỏ hàng thành công");
    // console.log("Thêm vào giỏ hàng thành công:", data.message);
  } else {
    console.error("Lỗi khi thêm vào giỏ hàng:", data.message);
  }
}
async function deleteItemCart(dataCart) {
  const response = await fetch(
    "http://localhost/QLBH/QLBanHang/Controller/giohang.php",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCart),
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.success) {
    //alert("Thêm vào gò hàng thành công")
    console.log("Xóa  thành công:", data.message);
  } else {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", data.message);
  }
}
const storedUsername = JSON.parse(sessionStorage.getItem("loggedInUsername"));

// console.log(storedUsername.id);

const elmContainer = document.querySelector("#section_content_GH .content2");
const getGioHang = async (url) => {
  try {
    let response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error("Lỗi khi tải giỏ hàng.");
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
if (storedUsername) {
  const url = `http://localhost/QLBH/QLBanHang/Controller/giohang.php?id=${storedUsername.id}`;
  getGioHang(url).then((data) => {
    console.log(renderGioHang(data));
    console.log(elmContainer);
    if (elmContainer) {
      elmContainer.innerHTML = renderGioHang(data);

      let listItem = document.querySelectorAll(".content2 .delete");
      Array.from(listItem).forEach((elm) => {
        elm.onclick = () => {
          let parentElm = elm.parentElement;
          let productId = parentElm.dataset.productId;
          let Itemcart = {
            idUser: storedUsername.id,
            idProduct: productId,
          };
          deleteItemCart(Itemcart).then((data) => {
            window.location.href = "Giohang.html";
          });
          console.log(Itemcart);
        };
      });
      let listItemUl = document.querySelectorAll(
        ".content2 ul[data-product-id]"
      );
      let viewPayment = document.querySelector(
        "#section_content_GH .payment .inforToTalPrice"
      );
      console.log(listItemUl);
      let total = 0;
      let quantity = 0;
      let myArrr = [];
      Array.from(listItemUl).forEach((elm, index) => {
        let elmCheckbox = elm.querySelector("li input[type=checkbox]");
        let totalPrice = elm.querySelector(".totalprice");
        let elmQuantity = elm.querySelector(".quantity");
        let elmName = elm.querySelector(".name");
        let elmPrice = elm.querySelector(".price");
        let productId = elm.dataset.productId;
        let itemArray = {
          productId: productId,
          name: elmName.innerText,
          price: elmPrice.innerText,
          quantity: elmQuantity.innerText,
        };
        console.log(itemArray);
        elmCheckbox.addEventListener("change", function () {
          if (elmCheckbox.checked) {
            console.log("Checkbox is checked");
            quantity++;
            total += parseFloat(totalPrice.innerText.replace(/\./g, ""));
            console.log(total);
            myArrr.push(itemArray);
            console.log(myArrr);
          } else {
            console.log("Checkbox is unchecked");
            total -= parseFloat(totalPrice.innerText.replace(/\./g, ""));
            quantity--;
            console.log(total);
            myArrr = myArrr.filter((item) => {
              return item.productId !== productId;
            });
            console.log(myArrr);
          }
          renderPayment(quantity, total, viewPayment);
        });
      });
      renderPayment(quantity, total, viewPayment);

      let btnshowHD = document.querySelector(
        "#section_content_GH .payment button"
      );
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      let formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      let elmTinh = document.querySelector("#container .hoadon .address #tinh");
      let elmHuyen = document.querySelector(
        "#container .hoadon .address #huyen"
      );
      let elmXa = document.querySelector("#container .hoadon .address #xa");
      let inputChkSdt = document.querySelector(
        "#container .hoadon .sdt input[type='checkbox']"
      );
      let inputTextSdt = document.querySelector(
        "#container .hoadon .sdt input[type='text']"
      );
      let inputAddress = document.querySelector(
        "#container .hoadon .address input[type='text']"
      );
      if (btnshowHD) {
        btnshowHD.addEventListener("click", () => {
          if (total == 0) {
            alert("Không có mặt hàng nào lựa chọn để thanh toán");
          } else {
            containerHoadon.classList.remove("hide");

            renderSubmitPayment(
              elmTinh,
              elmHuyen,
              elmXa,
              storedUsername.name,
              storedUsername.phone,
              total,
              formattedDate,
              myArrr
            );
            let btnsubmitPayment = document.querySelector(
              "#container .hoadon .submit_TT"
            );

            btnsubmitPayment.onclick = () => {
              let sdt;
              if (inputChkSdt.checked) {
                sdt = storedUsername.phone;
              } else {
                sdt = inputTextSdt.value;
              }
              let address = `${inputAddress.value},${getTextSelect(
                elmTinh
              )},${getTextSelect(elmHuyen)},${getTextSelect(elmXa)}`;
              let datahoadon = {
                idUser: storedUsername.id,
                sdt: sdt,
                address: address,
                totalprice: total,
                date: formattedDate,
              };
              let datacthd = [];
              myArrr.forEach((elm) => {
                datacthd.push({
                  idProduct: elm.productId,
                  quantity: elm.quantity,
                });
              });

              console.log(datacthd);
              createOrder(datahoadon, datacthd);
            };
          }
        });
      }
    }
  });
}

const renderGioHang = (data) => {
  let html = `<ul>
        <li>Sản phẩm</li>
        <li>Đơn giá</li>
        <li>Số lượng</li>
        <li>Giá tiền</li>
        <li>Thao tác</li>
      </ul>`;
  console.log(data);
  if (Array.isArray(data)) {
    html =
      html +
      data
        .map((element) => {
          return `<ul data-product-id='${element.id}'>
              <li>
                  
                  <input type="checkbox" name="checkbox">
                  <div class="img"><img src="${element.image}" alt="anh"></div>
                  <div>
                      <p class="name">${element.name}</p>
                      <p><i class="fa-solid fa-check"></i> Đổi trả hàng trong 7 ngày</p>
                  </div>
              </li>
              <li class="price">${element.price}đ</li>
              <li class="quantity">${element.quantity}</li>
              <li class="totalprice">${(
                parseFloat(element.price.replace(/\./g, "")) * element.quantity
              ).toLocaleString("vi-VN")}</li>
              <li class="delete">Xóa <i class="fa-solid fa-trash"></i></li>
          </ul>`;
        })
        .join("");
  }
  return html;
};
let containerHoadon = document.querySelector("#container .hoadon");
let closeHd = document.querySelector(
  "#container .hoadon .hd_content .icon_closeHd"
);

if (closeHd) {
  closeHd.addEventListener("click", () => {
    containerHoadon.classList.add("hide");
  });
}

function renderPayment(quantity, total, container) {
  container.innerHTML = `
  <input type="checkbox">
  <span>Chọn tất cả(10)</span>
  <span class="delete">Xóa</span>
  <span>Tổng thanh toán (${quantity}) sản phẩm:<span>${total.toLocaleString(
    "vi-VN"
  )}đ</span></span>
  `;
}
function renderSubmitPayment(
  elmTinh,
  elmHuyen,
  elmXa,
  namekh,
  phonedefault,
  totalPrice,
  formattedDate,
  listProduct
) {
  let elmTenkh = document.querySelector("#container .hoadon .namekh");
  let elmPhoneDefault = document.querySelector(
    "#container .hoadon .phonedefault"
  );
  let elmTimeNow = document.querySelector("#container .hoadon .timenow");
  let elmTotalPrice = document.querySelector("#container .hoadon .totalPrice");
  let elmTableProduct = document.querySelector("#container .hoadon .table");
  getAddress(elmTinh, elmHuyen, elmXa);
  elmTenkh.innerText = namekh;
  elmPhoneDefault.innerText = `SDT Mặc định (${phonedefault})`;

  elmTimeNow.innerText = formattedDate;
  elmTotalPrice.innerText = totalPrice.toLocaleString("vi-VN") + "đ";

  let html = `
    <table>
    <thead>
        <tr>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Gía</th>
        </tr>
    </thead>
    ${listProduct
      .map((elm) => {
        return `<tr>
        <td>${elm.name}</td>
        <td>${elm.quantity}</td>
        <td>${elm.price}</td>
      </tr>`;
      })
      .join("")}
    
  </table>
  `;
  console.log(html);
  elmTableProduct.innerHTML = html;
}

async function createOrder(datahd, datacthd) {
  try {
    const response = await fetch(
      "http://localhost/QLBH/QLBanHang/Controller/hoadon.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datahd),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Hóa đơn đã được tạo thành công.");
      const latestOrderId = await getLatestOrderId();
      let data = {
        mahd: latestOrderId,
        products: datacthd,
      };
      addProductsToOrder(data);
    } else {
      console.error(`Lỗi: ${result.message}`);
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
  }
}
async function getLatestOrderId() {
  try {
    const response = await fetch(
      "http://localhost/QLBH/QLBanHang/Controller/hoadon.php",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.mahd;
    } else {
      console.error(`Lỗi: ${result.message}`);
      return null;
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    return null;
  }
}
async function addProductsToOrder(data) {
  try {
    const response = await fetch(
      "http://localhost/QLBH/QLBanHang/Controller/chitiethoadon.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.success) {
      alert("Thanh toán thành công");
      console.log("Thêm sản phẩm vào chi tiết hóa đơn thành công.");
      data.products.forEach((product) => {
        let Itemcart = {
          idUser: storedUsername.id,
          idProduct: product.idProduct,
        };
        let itemProduct = {
          idProduct: product.idProduct,
          quantity: product.quantity,
        };
        console.log(itemProduct);
        deleteItemCart(Itemcart);
        updateQuantity(itemProduct);
        window.location.href = "Giohang.html";
      });
    } else {
      console.error(`Lỗi: ${result.message}`);
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
  }
}
function getTextSelect(elm) {
  let selectedOption = elm.options[elm.selectedIndex];
  return selectedOption.text;
}
async function updateQuantity(dataCart) {
  const response = await fetch(
    "http://localhost/QLBH/QLBanHang/Controller/products.php",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCart),
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.success) {
    //alert("Thêm vào gò hàng thành công")
    console.log("Cập nhật thành công:", data.message);
  } else {
    console.error("Lỗi khi cập nhật số lượng:", data.message);
  }
}
