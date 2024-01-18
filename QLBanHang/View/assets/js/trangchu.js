// document.addEventListener("DOMContentLoaded", function () {
//   const userIcon = document.getElementById("user-icon");
//   const contentContainer = document.getElementById("form_SignUp");

//   userIcon.addEventListener("click", function () {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         contentContainer.innerHTML = xhr.responseText;
//         const closeBtn = document.querySelector(".close");
//         if (closeBtn) {
//           closeBtn.addEventListener("click", function () {
//             // Xử lý sự kiện đóng
//             contentContainer.innerHTML = "";
//             contentContainer.classList.remove("formcss");
//           });
//         }
//       }
//     };

//     xhr.open("GET", "Dangnhap.html", true);
//     xhr.send();
//     contentContainer.classList.add("formcss");
//   });
// });

// import { FormValid, FormItemEror } from "./validateform.js";

// document.addEventListener("DOMContentLoaded", function () {
//   const userLogin = document.getElementById("user-icon");
//   const userIcon = userLogin.querySelector("i");
//   const contentContainer = document.getElementById("form_SignUp");
//   userIcon.addEventListener("click", function () {
//     loadContent("Dangnhap.html");
//   });

//   function loadContent(fileName) {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         contentContainer.innerHTML = xhr.responseText;
//         const closeBtn = document.querySelector(".close");
//         const signUpBtn = document.querySelector(".signup-button");
//         const listInput = document.querySelectorAll(
//           "#login .login_content .form li input"
//         );
//         let btnLogin = document.querySelector(
//           "#login .login_content form div button  "
//         );
//         let formLogin = document.querySelector("#login .login_content .form");
//         const user = document.querySelector("#username");
//         if (btnLogin) {
//           FormItemEror(listInput);
//           btnLogin.addEventListener("click", function (e) {
//             e.preventDefault();
//             FormValid(listInput, formLogin, contentContainer, userLogin);
//           });
//         }
//         if (signUpBtn) {
//           signUpBtn.addEventListener("click", function () {
//             loadContent("Dangki.html");
//           });
//         }
//         const loginBtn = document.querySelector(".btn_login");
//         if (loginBtn) {
//           loginBtn.addEventListener("click", function () {
//             loadContent("Dangnhap.html");
//           });
//         }
//         if (closeBtn) {
//           closeBtn.addEventListener("click", function () {
//             // Xử lý sự kiện đóng
//             contentContainer.innerHTML = "";
//             contentContainer.classList.remove("formcss");
//           });
//         }
//       }
//     };

//     xhr.open("GET", fileName, true);
//     xhr.send();
//     contentContainer.classList.add("formcss");
//   }
// });
