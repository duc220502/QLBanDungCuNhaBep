import getsanpham from "./getsanpham.js";
import getCategory from "./getcategory.js";
import { openProductDetail } from "./productDetail.js";
let mainPoducts = document.querySelector(".content-main .items");
let quantityProducts = document.querySelector(
  "#section_content .label>div>span"
);
let categoryProducts = document.querySelector(".content .sidebar .category ul");
let titleCategory = document.querySelector(
  "#section_content .label>p span:last-child"
);
let btnTk = document.querySelector(
  ".content .sidebar .filter > div > div button"
);
let inputTk = document.querySelector(".content .sidebar .filter > div input");
console.log(btnTk);
let pagesize = 12;
let currentpage = 1;
let maxpage = 1;

let pagination = document.querySelectorAll(".content-main .pagination span");
// let maxpage = 4;

function setcurrentpage(maxpage) {
  console.log(currentpage);
  pagination[1].innerText = currentpage;
  pagination[3].querySelector("span").innerText = currentpage;
  pagination[3].querySelector("span:last-child").innerText = maxpage;
}

function left() {
  currentpage = Math.max(1, currentpage - 1);
}

function right() {
  currentpage = Math.min(maxpage, currentpage + 1);
}

mainPoducts.addEventListener("click", function (event) {
  const target = event.target;

  const productItem = target.closest("div[data-product-id]");

  if (productItem) {
    const productId = productItem.dataset.productId;
    openProductDetail(productId);
  }
});

function sanpham(url) {
  //let check = true;
  //currentpage = 1;
  console.log(url);
  function getSanphamInternal() {
    console.log(url);

    let url1 = url + `pagesize=${pagesize}&currentpage=${currentpage}`;
    // let url1 = "";
    // if (check) {
    //   url1 = url + `pagesize=${pagesize}&currentpage=${currentpage}`;
    // } else {
    //   url1 = url + `&pagesize=${pagesize}&currentpage=${currentpage}`;
    // }
    console.log(url1);
    getsanpham(url1)
      .then((data) => {
        console.log(data);
        let html = data.records
          .map((item) => {
            return `
                          <div data-product-id='${item.id}'>
                              <div class="img">
                                  <img src="${item.image}" alt="sp1">
                              </div>
                              <p class="name">${item.name}</p>
                              <p class="price">${item.price}đ</p>
                          </div>`;
          })
          .join("");
        return {
          html: html,
          length: data.totalRecord,
        };
      })
      .then((data) => {
        mainPoducts.innerHTML = data.html;
        quantityProducts.innerText = `Hiển thị 1-12 trong ${data.length} kết quả`;
        maxpage = Math.floor(data.length / pagesize) + 1;
        console.log(maxpage, currentpage);
        //check = false;
        setcurrentpage(maxpage);
      });
  }

  function prev() {
    console.log("hello");
    console.log(url);
    left();
    console.log(maxpage, currentpage);
    getSanphamInternal();
  }
  function next() {
    console.log(url);
    console.log("hi");
    right();
    console.log(maxpage, currentpage);
    getSanphamInternal();
  }

  pagination[2].onclick = next;

  pagination[0].onclick = prev;
  getSanphamInternal();
}

let categoryJSON = new URLSearchParams(window.location.search).get("category");
const category = JSON.parse(decodeURIComponent(categoryJSON));
getCategory()
  .then((data) => {
    return data
      .map((item) => {
        console.log(item);
        return `<li data-category-id='${item.id}'>${item.name}</li>`;
      })
      .join("");
  })
  .then((data) => {
    categoryProducts.innerHTML = data;
    let listItemCategory = categoryProducts.querySelectorAll("li");
    let categoryArray = Array.from(listItemCategory);
    categoryArray.forEach((li) => {
      li.addEventListener("click", function (e) {
        const url = `http://localhost/QLBH/QLBanHang/Controller/products.php?category=${e.target.dataset.categoryId}&`;
        sanpham(url);
      });
    });
  });

if (categoryJSON !== null) {
  titleCategory.innerText = " / " + category.nameCategory;
  console.log(category);
  const url = `http://localhost/QLBH/QLBanHang/Controller/products.php?category=${category.categoryId}&`;
  sanpham(url);
} else {
  const url = `http://localhost/QLBH/QLBanHang/Controller/products.php?`;
  sanpham(url);
}

btnTk.addEventListener("click", () => {
  console.log(inputTk.value);
  let url = `http://localhost/QLBH/QLBanHang/Controller/products.php?name=${inputTk.value}&`;
  sanpham(url);
});
