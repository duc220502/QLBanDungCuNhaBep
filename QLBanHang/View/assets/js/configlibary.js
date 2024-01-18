import getCategory from "./getcategory.js";
if (typeof Swiper !== "undefined") {
  const swiper = new Swiper(".swiper", {
    autoplay: {
      delay: 3000,
    },
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: false,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
}

getCategory().then((data) => {
  tippy("#header .nav_categotry", {
    content: `<ul class='custom-tooltip-list'>${data
      .map((elem) => {
        return `<li class='category-item' data-category-id='${elem.id}'>${elem.name}</li>`;
      })
      .join("")}</ul>`,
    placement: "bottom",
    allowHTML: true,
    interactive: true,
    theme: "material",
  });
});
export function tippyLogin(username) {
  tippy("#header .user #user-icon .img_user", {
    content: `<ul class='custom-tooltip-user'>
        <li>${username}</li>
        <li>Xem chi tiết</li>
        <li data-action="logout">Đăng xuất</li>
    </ul>`,
    placement: "bottom",
    allowHTML: true,
    interactive: true,
    theme: "material",
    onShow(instance) {
      const liElements = instance.popper.querySelectorAll("li");
      console.log(liElements);
      liElements.forEach((li) => {
        li.onclick = (event) => {
          const action = event.currentTarget.dataset.action;
          handleAction(action);

          instance.hide();
        };
      });
    },
  });
}
function handleAction(action) {
  if (action === "logout") {
    console.log("logout");
    sessionStorage.removeItem("loggedInUsername");
    alert("Đăng xuất thành công");
    window.location.href = "trangchu.html";
  }
}
document.addEventListener("click", function (event) {
  // console.log(event.target);
  if (event.target.classList.contains("category-item")) {
    const nameCategory = event.target.innerText;
    const categoryId = event.target.dataset.categoryId;
    const category = {
      nameCategory: nameCategory,
      categoryId: categoryId,
    };
    const categoryJSON = JSON.stringify(category);
    window.location.href = `Cuahang1.html?category=${categoryJSON}`;
  }
});
