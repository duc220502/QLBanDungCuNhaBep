const storedUsername = JSON.parse(sessionStorage.getItem("loggedInUsername"));
console.log(storedUsername);
function showError(input, message) {
  let prElm = input.parentElement;
  prElm.classList.add("error");
  let sm = prElm.querySelector("small");
  sm.innerText = message;
}
function showSuccess(input) {
  let prElm = input.parentElement;
  prElm.classList.remove("error");
  let sm = prElm.querySelector("small");
  sm.innerText = "";
}
function checkStrEmty(strInput) {
  let str = strInput.trim();
  if (!str) {
    return "Vui lòng không để trống trường này";
  }
}
const checkMail = (inputMail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputMail.value)) {
    showError(
      inputMail,
      checkStrEmty(inputMail.value) ||
        "Vui lòng nhập đúng định dạng địa chỉ email"
    );
  } else {
    showSuccess(inputMail);
  }
};
function validateNumberInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}
const checkNumberPhone = (inputNumber) => {
  const numberPhoneRegex = /^(0[2-9][0-9]|848[1-9]|849[0-8])\d{6,7}$/;
  if (!numberPhoneRegex.test(inputNumber.value)) {
    showError(
      inputNumber,
      checkStrEmty(inputNumber.value) ||
        "Vui lòng nhập đúng định dạng số điện thoại"
    );
  } else {
    showSuccess(inputNumber);
  }
};
function checkError() {
  let inputs = document.querySelectorAll(
    "#section_content .form .form_field input"
  );
  let smalls = document.querySelectorAll(
    "#section_content .form .form_field small"
  );
  console.log(smalls);
  Array.from(inputs).forEach((elm) => {
    switch (elm.name) {
      case "yourname":
        elm.value = storedUsername.name;
        elm.addEventListener("blur", function (e) {
          console.log(elm);
          if (checkStrEmty(elm.value)) {
            showError(elm, checkStrEmty(elm.value));
          } else {
            showSuccess(elm);
          }
        });
        break;
      case "mail":
        elm.value = storedUsername.email;
        elm.addEventListener("blur", function (e) {
          checkMail(elm);
        });
        break;
      case "number":
        elm.value = storedUsername.phone;
        elm.addEventListener("input", function (e) {
          validateNumberInput(elm);
        });
        elm.addEventListener("blur", function (e) {
          checkNumberPhone(elm);
        });
        break;
      default:
        console.log("Hết lựa chọn!");
    }
  });
}

checkError();
let textarea = document.querySelector(
  "#section_content .form .form_field textarea"
);

console.log(textarea.value);
function checksubmit() {
  let inputs = document.querySelector(
    "#section_content .form .form_field input"
  );
  let smalls = document.querySelectorAll(
    "#section_content .form .form_field small"
  );

  Array.from(inputs).forEach((elm) => {
    if (checkStrEmty(elm.value)) {
      showError(elm, checkStrEmty(elm.value));
    } else {
      showSuccess(elm);
    }
  });
  if (checkStrEmty(textarea.value)) {
    showError(textarea, checkStrEmty(textarea.value));
  }
  return !Array.from(smalls).some((element) => {
    return element.innerText != "";
  });
}

let btnSend = document.querySelector("#section_content .form .submit");

btnSend.onclick = (e) => {
  e.preventDefault();
  if (checksubmit()) {
    let inputs = document.querySelectorAll(
      "#section_content .form .form_field input"
    );
    let message = document.querySelector(
      "#section_content .form .form_field #message"
    );

    let data = {
      message: message.value,
    };
    Array.from(inputs).forEach((elm) => {
      data[elm.name] = elm.value;
    });
    addLienhe(data);
  } else {
    console.log("lỗi");
  }
};
async function addLienhe(datalh) {
  const response = await fetch(
    "http://localhost/QLBH/QLBanHang/Controller/lienhe.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datalh),
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.success) {
    alert("Thêm liên hệ thành công");
    window.location.href = "lienhe.html";
  } else {
    console.error("Lỗi khi thêm liên hệ:", data.message);
  }
}
