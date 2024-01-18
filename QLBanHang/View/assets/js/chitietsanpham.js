import getsanpham from "./getsanpham.js";
import { addCart } from "./giohang.js";
window.addEventListener("load", (event) => {
  let containerInfor = document.querySelector(
    "#section_content .content1 > div "
  );
  let description = document.querySelector("#section_content .content2>p");
  const id = new URLSearchParams(window.location.search).get("id");
  console.log(id);
  const url = `http://localhost/QLBH/QLBanHang/Controller/products.php?id=${id}`;
  // <p class="bought"><span>2,5k</span> đã bán</p>
  // <button class="buynow">
  //                       Mua ngay
  //                   </button>
  getsanpham(url)
    .then((data) => {
      let dt = data.records[0];
      console.log(dt);
      let html = `<div class="img">
                <img src="${dt.image}" alt="">
            </div>
            <div class="info_order">
                <p class="name_product">${dt.name}</p>        
                <p class="price">${dt.price}đ</p>
                <ul class="sale">
                    <li>
                        <i class="fa-solid fa-gift"></i>
                        <span>Khuyến mãi</span>
                    </li>
                    <li>Tặng phiếu mua hàng đặc biệt</li>
                    <li>Tặng evoucher 10% khi mua các sản phẩm phụ kiện </li>
                </ul>
                <div class="set_quantity">
                    <span>Số lượng</span>
                    <div class="quantity">
                        <button class ="left">-</button>
                        <input type="number" value="1" min="1" oninput="validity.valid||(value='1')">
                        <button class ="right">+</button>
                    </div>
                    <span>${dt.quantity} sản phẩm có sẵn</span>
                </div>
                <div class="submit_option">
                    <button class="addcart">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span>Thêm vào giỏ hàng</span>
                    </button>
                    
                </div>
        </div> `;
      let html1 = `${dt.description}`;
      return {
        html: html,
        html1: html1,
      };
    })
    .then((data) => {
      containerInfor.innerHTML = data.html;
      description.innerText = data.html1;
      let addcart = document.querySelector(".addcart");
      let quantity = document.querySelector(".set_quantity input");
      let btnLeft = document.querySelector(".set_quantity .left");
      let btnRight = document.querySelector(".set_quantity .right");

      const storedUsername = JSON.parse(
        sessionStorage.getItem("loggedInUsername")
      );
      btnLeft.onclick = () => {
        let currentValue = parseInt(quantity.value);
        if (currentValue > 1) {
          quantity.value = currentValue - 1;
        }
      };
      btnRight.onclick = () => {
        let currentValue = parseInt(quantity.value);
        quantity.value = currentValue + 1;
      };
      addcart.onclick = () => {
        if (storedUsername) {
          addCart(storedUsername.id, id, quantity.value);
          //console.log(storedUsername.id, id, quantity.value);
        }
      };
    });
});
