import { FormValid, FormItemEror } from "./validateform.js";
import { tippyLogin } from "./configlibary.js";
import { test } from "./Dangki.js";

const userLogin = document.getElementById("user-icon");
const storedUsername = JSON.parse(sessionStorage.getItem("loggedInUsername"));
console.log(storedUsername);
if (storedUsername) {
  console.log(storedUsername);
  userLogin.innerHTML = `<div class="img_user">
                  <img src="${storedUsername.avartar}">
                    </div>`;
  tippyLogin(storedUsername.name);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    const userIcon = userLogin.querySelector("i");
    const contentContainer = document.getElementById("form_SignUp");
    userIcon.addEventListener("click", function () {
      //load();
      loadContent("Dangnhap.html");
    });

    function loadContent(fileName) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          contentContainer.innerHTML = xhr.responseText;
          const closeBtn = document.querySelector(".close");
          const signUpBtn = document.querySelector(".signup-button");
          const listInput = document.querySelectorAll(
            "#login .login_content .form li input"
          );
          let btnLogin = document.querySelector(
            "#login .login_content form div button"
          );
          let formLogin = document.querySelector("#login .login_content .form");
          const user = document.querySelector("#username");
          const select = document.querySelector(".select #cars");
          const btnSignUp = document.querySelector("#sign_Up .submit");
          console.log(select);
          if (btnLogin) {
            FormItemEror(listInput);
            btnLogin.addEventListener("click", function (e) {
              e.preventDefault();
              console.log(listInput);
              FormValid(listInput, formLogin, contentContainer, userLogin);
            });
          }
          if (btnSignUp) {
            console.log(select);
            //getTinh(select);
            test(select);
          }
          if (signUpBtn) {
            signUpBtn.addEventListener("click", () => {
              loadContent("Dangki.html");
            });
          }
          const loginBtn = document.querySelector(".btn_login");

          if (loginBtn) {
            loginBtn.addEventListener("click", function () {
              loadContent("Dangnhap.html");
            });
          }
          if (closeBtn) {
            closeBtn.addEventListener("click", function () {
              // Xử lý sự kiện đóng
              contentContainer.innerHTML = "";
              contentContainer.classList.remove("formcss");
            });
          }
        }
      };

      xhr.open("GET", fileName, true);
      xhr.send();
      contentContainer.classList.add("formcss");
    }
  });
}
