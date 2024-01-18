import { tippyLogin } from "./configlibary.js";
let isError = true;
let objCheckEmty = {};
let url = "http://localhost/QLBH/QLBanHang/Controller/login.php";
function checkEmtyEror(listInput) {
  listInput.forEach((element) => {
    element.addEventListener("input", function (e) {
      element.value = element.value.trim();
      if (!element.value) {
        showError(element, "Vui lòng không để trống trường này!");
      } else {
        showSuccess(element);
      }
      objCheckEmty[element.name] = element.value;
      console.log(objCheckEmty);
    });
  });
}
function isValidPhoneNumber(input) {
  console.log(input);
  const phoneRegex = /^0\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  input.addEventListener("blur", function (e) {
    console.log(objCheckEmty[input.name]);
    if (
      objCheckEmty[input.name] != "" &&
      objCheckEmty[input.name] != undefined
    ) {
      if (!phoneRegex.test(input.value) && !emailRegex.test(input.value)) {
        showError(input, "Vui lòng nhập đúng theo yêu cầu");
      } else {
        showSuccess(input);
      }
    }
  });

  return phoneRegex.test(input.value);
}
export function FormItemEror(listInput) {
  checkEmtyEror(listInput);
  isValidPhoneNumber(listInput[1]);
}

export function FormValid(listInput, formLogin, contentContainer, userLogin) {
  let check =
    Object.keys(objCheckEmty).length == listInput.length ? true : false;
  if (check) {
    // Object.keys(objCheckEmty).forEach((element) => {
    //   if (!objCheckEmty[element]) {
    //         isError = true;
    //   }
    // });

    // if(isError){

    // }
    let arrError = Array.from(listInput).filter((element) => {
      let value = element.parentElement.querySelector("small").innerText;
      return value != "";
    });
    isError = arrError.length == 0 ? true : false;
    let elemRemove = formLogin.querySelector("p");
    if (isError) {
      getUser(url)
        .then((data) => {
          let checkSuccess = false;
          console.log(data);
          data.forEach((element) => {
            if (
              element.phone == objCheckEmty.phone &&
              element.email == objCheckEmty.username &&
              element.password == objCheckEmty.pass
            ) {
              console.log("Đăng nhập thành công");
              sessionStorage.setItem(
                "loggedInUsername",
                JSON.stringify(element)
              );
              if (elemRemove) {
                formLogin.removeChild(elemRemove);
              }
              contentContainer.innerHTML = "";
              contentContainer.classList.remove("formcss");
              if (element.avartar) {
                userLogin.innerHTML = `<div class="img_user">
                  <img src="${element.avartar}">
                    </div>`;
                tippyLogin(element.name);
              } else {
                console.log("không có img");
              }

              checkSuccess = true;
              window.location.href = "trangchu.html";
            }
          });
          return checkSuccess;
        })
        .then((check) => {
          console.log(check);
          let showMassage = formLogin.querySelector(".showmassage span");
          console.log(showMassage, formLogin);
          if (!check) {
            console.log("Đăng nhập thất bại");
            showMassage.innerText = "Tài khoản hoặc mật khẩu không chính xác";
            // let newElement = document.createElement("p");
            // newElement.textContent = "Tài khoản hoặc mật khẩu không chính xác";
            // formLogin.appendChild(newElement);
          } else {
            let test = document.querySelector(".custom-tooltip-user");

            console.log(liElements);
            console.log(test);
            console.log("HẾ LÔ AE NHÉ");
          }
        });
    } else {
      if (elemRemove) {
        formLogin.removeChild(elemRemove);
      }
    }
  } else {
    listInput.forEach((element) => {
      showError(element, "Vui lòng không để trống trường này");
    });
  }
}
function showError(input, message) {
  let prElm = input.parentElement;
  prElm.classList.add("error");
  let sm = prElm.querySelector("small");
  console.log(sm);
  sm.innerText = message;
}
function showSuccess(input) {
  let prElm = input.parentElement;
  prElm.classList.remove("error");
  let sm = prElm.querySelector("small");
  console.log(sm);
  sm.innerText = "";
}
const getUser = async () => {
  try {
    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw new Error("Lỗi khi tải user.");
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
