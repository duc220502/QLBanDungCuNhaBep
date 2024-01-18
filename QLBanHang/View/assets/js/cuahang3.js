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
let pagesize = 12;
let currentpage = 1;
let maxpage = 1;
// function left() {
//   currentpage++;
//   setcurrentpage(4);
// }
// function right() {
//   currentpage--;
//   setcurrentpage(4);
// }
// // let currentpage = 1;
// let pagesize = 12;
// let pagination = document.querySelectorAll(".content-main .pagination span");
// pagination[2].addEventListener("click", right);
// pagination[0].addEventListener("click", left);
// setcurrentpage(4);
// function setcurrentpage(maxpage) {
//   pagination[1].innerText = currentpage;
//   pagination[3].querySelector("span").innerText = currentpage;
//   if (currentpage == 1) {
//     pagination[0].removeEventListener("click", left);
//     // pagination[0].classList.add("hide");
//     console.log(currentpage);
//   } else {
//     pagination[0].addEventListener("click", left);
//     // pagination[0].classList.remove("hide");
//     console.log(currentpage);
//   }
//   console.log(maxpage, currentpage);
//   if (currentpage == maxpage) {
//     // pagination[2].classList.add("hide");
//     pagination[2].removeEventListener("click", right);
//     console.log(currentpage);
//   } else {
//     pagination[2].addEventListener("click", right);
//     // pagination[2].classList.remove("hide");
//     console.log(currentpage);
//   }
// }

// let pagesize = 12;

let pagination = document.querySelectorAll(".content-main .pagination span");
// let maxpage = 4;

function setcurrentpage(maxpage) {
  console.log(currentpage);
  pagination[1].innerText = currentpage;
  pagination[3].querySelector("span").innerText = currentpage;
  pagination[3].querySelector("span:last-child").innerText = maxpage;
  if (currentpage === 1) {
    pagination[0].removeEventListener("click", left);
  } else {
    pagination[0].addEventListener("click", left);
  }

  if (currentpage === maxpage) {
    pagination[2].removeEventListener("click", right);
  } else {
    pagination[2].addEventListener("click", right);
  }
}

function left() {
  // Xử lý khi nút "Previous" được nhấn
  currentpage = Math.max(1, currentpage - 1);
  // setcurrentpage(maxpage); // Thay 4 bằng maxpage thực tế của bạn
}

function right() {
  // Xử lý khi nút "Next" được nhấn
  currentpage = Math.min(maxpage, currentpage + 1);
  // setcurrentpage(maxpage); // Thay 4 bằng maxpage thực tế của bạn
}

mainPoducts.addEventListener("click", function (event) {
  const target = event.target;

  const productItem = target.closest("div[data-product-id]");

  if (productItem) {
    const productId = productItem.dataset.productId;
    openProductDetail(productId);
  }
});
// function sanpham(url, pagesize, currentpage) {
//   getsanpham(url)
//     .then((data) => {
//       console.log(data);
//       let html = data.records
//         .map((item) => {
//           return `
//                           <div data-product-id='${item.id}'>
//                               <div class="img">
//                                   <img src="${item.image}" alt="sp1">
//                               </div>
//                               <p class="name">${item.name}</p>
//                               <p class="price">${item.price}đ</p>
//                           </div>`;
//         })
//         .join("");
//       return {
//         html: html,
//         lenght: data.totalRecord,
//       };
//     })
//     .then((data) => {
//       mainPoducts.innerHTML = data.html;
//       quantityProducts.innerText = `Hiển thị 1-12 trong ${data.lenght} kết quả`;
//       let maxpage = Math.floor(data.lenght / pagesize) + 1;
//       let check = true;
//       pagination[2].addEventListener("click", () => {
//         right(maxpage, currentpage);
//         check = false;
//         sanpham(url, pagesize, currentpage);
//       });
//       pagination[0].addEventListener("click", () => {
//         console.log(maxpage, currentpage);
//         left(maxpage, currentpage);
//         check = false;
//         sanpham(url, pagesize, currentpage);
//       });

//       console.log(maxpage, currentpage);

//       if (check) {
//         sanpham(url, pagesize, currentpage);
//       }
//     });
// }
function sanpham(url) {
  let check = true; // Biến kiểm tra lặp vô hạn
  currentpage = 1;
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

        setcurrentpage(maxpage);
      });
  }

  pagination[2].addEventListener("click", () => {
    console.log("hello");
    right();
    console.log(maxpage, currentpage);
    getSanphamInternal();
  });
  pagination[0].addEventListener("click", () => {
    console.log("hi");
    left();
    console.log(maxpage, currentpage);
    getSanphamInternal();
  });

  // Gọi hàm lần đầu tiên
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

// .then((data) => {
//   if (categoryJSON !== null) {
//     const category = JSON.parse(decodeURIComponent(categoryJSON));
//     let listItemCategory = categoryProducts.querySelectorAll("li");
//     let element = Array.from(listItemCategory).find((item) => {
//       return item.innerText === category.nameCategory;
//     });
//   }
// });
// async function fetchData(id) {
//   try {
//     const response = await fetch(
//       `http://localhost/QLBH/QLBanHang/Controller/products.php?category=${
//         id ? id : category.categoryId
//       }`,
//       {
//         method: "GET",
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
if (categoryJSON !== null) {
  titleCategory.innerText = " / " + category.nameCategory;
  console.log(category);
  const url = `http://localhost/QLBH/QLBanHang/Controller/products.php?category=${category.categoryId}&`;
  sanpham(url);
} else {
  const url = `http://localhost/QLBH/QLBanHang/Controller/products.php?`;
  sanpham(url);
}

// let categoryJSON = new URLSearchParams(window.location.search).get("category");
// async function fetchData() {
//   try {
//     const response = await fetch(
//       `http://localhost/QLBH/QLBanHang/Controller/products.php?category=${category.categoryId}`,
//       {
//         method: "GET",
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
// Promise.all([fetchData(), getCategory()]).then(
//   ([sanphamData, categoryData]) => {
//     console.log("sanphamdata", sanphamData, "categorydata", categoryData);
//     let html = sanphamData
//       .map((item) => {
//         return `
//                 <div>
//                     <div class="img">
//                         <img src="${item.image}" alt="sp1">
//                     </div>
//                     <p class="name">${item.name}</p>
//                     <p class="price">${item.price}đ</p>
//                 </div>`;
//       })
//       .join("");

//     mainPoducts.innerHTML = html;
//     quantityProducts.innerText = `Hiển thị 1-12 trong ${sanphamData.length} kết quả`;

//     let categoryHTML = categoryData
//       .map((item) => {
//         return `<li>${item.name}</li>`;
//       })
//       .join("");

//     categoryProducts.innerHTML = categoryHTML;

//     if (categoryJSON !== null) {
//       const category = JSON.parse(decodeURIComponent(categoryJSON));
//       titleCategory.innerText = " / " + category.nameCategory;

//       const matchingLi = Array.from(categoryProducts.children).find(
//         (li) => li.innerText === category.nameCategory
//       );
//       if (matchingLi) {
//         matchingLi.classList.add("highlighted-category");
//       }

//       console.log(category);

//       console.log(categoryProducts);

//       fetchData(category.categoryId);
//     } else {
//       console.log("Tham số 'category' không tồn tại trong URL.");
//     }
//   }
// );
