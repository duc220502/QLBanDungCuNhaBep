const url = "https://provinces.open-api.vn/api/";
const getTinh = async (url, element) => {
  try {
    let response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      let data = await response.json();
      console.log(data.length);
      const html = `<option value="0">Nhập tỉnh thành</option>`;
      const optionsHTML =
        html +
        data
          .map(
            (option) =>
              `<option value = "${option.code}">${option.name}</option>`
          )
          .join("");
      console.log(optionsHTML);
      element.innerHTML = optionsHTML;
    } else {
      throw new Error("Lỗi khi tải  tỉnh thành.");
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
const getHuyen = async (value, element) => {
  console.log("hahahaha");
  let url1 = `https://provinces.open-api.vn/api/p/${value}?depth=2`;
  console.log(url1);
  try {
    let response = await fetch(url1, {
      method: "GET",
    });
    if (response.ok) {
      let data = await response.json();
      const html = `<option value="0">Nhập huyện</option>`;
      console.log(data);
      const optionsHTML =
        html +
        data.districts
          .map(
            (option) =>
              `<option value = "${option.code}">${option.name}</option>`
          )
          .join("");
      console.log(optionsHTML);
      element.innerHTML = optionsHTML;
    } else {
      throw new Error("Lỗi khi tải  huyện.");
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
const getXa = async (value, element) => {
  console.log("hahahaha");
  let url1 = `https://provinces.open-api.vn/api/d/${value}?depth=2`;
  console.log(url1);
  try {
    let response = await fetch(url1, {
      method: "GET",
    });
    if (response.ok) {
      let data = await response.json();
      const html = `<option value="0">Nhập xã</option>`;
      console.log(data);
      const optionsHTML =
        html +
        data.wards
          .map(
            (option) =>
              `<option value = "${option.code}">${option.name}</option>`
          )
          .join("");
      console.log(optionsHTML);
      element.innerHTML = optionsHTML;
    } else {
      throw new Error("Lỗi khi tải xã.");
    }
  } catch (error) {
    console.error(error);
    return {};
  }
};
const getUser = async () => {
  try {
    let response = await fetch(
      "http://localhost/QLBH/QLBanHang/Controller/user.php"
    );
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
function checkStrName(strInput) {
  let kyTuDacBiet = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  if (strInput.length < 2 || strInput.length > 50) {
    return "Vui lòng nhập chuỗi có độ dài từ 2-50 kí tự";
  }
  if (kyTuDacBiet.test(strInput)) {
    return "Vui lòng không nhập kí tự đặc biệt";
  }
}

const checkName = (inputName) => {
  let strInput = inputName.value.trim();
  if (checkStrName(strInput)) {
    showError(inputName, checkStrName(strInput));
  } else {
    showSuccess(inputName);
  }
};
function checkStrEmty(strInput) {
  let str = strInput.trim();
  if (!str) {
    return "Vui lòng không để trống trường này";
  }
}
function validateNumberInput(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
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
function checkStrPassword(strPass) {
  if (strPass.length < 2 || strPass.length > 30) {
    return "Vui lòng nhập mật khẩu có độ dài từ 8-30 kí tự";
  }
  // if (!/[A-Z]/.test(strPass)) {
  //   return "Mật khẩu phải chứa ít nhất một chữ hoa";
  // }

  // if (!/[a-z]/.test(strPass)) {
  //   return "Matajh khẩu phải có ít nhất một chữ thường";
  // }

  // if (!/\d/.test(strPass)) {
  //   return "Mật khẩu phải chứa ít nhất một số";
  // }
}
const checkPassword = (inputPassword) => {
  let strInput = inputPassword.value.trim();
  if (checkStrPassword(strInput)) {
    showError(inputPassword, checkStrPassword(strInput));
  } else {
    showSuccess(inputPassword);
  }
};

function checkStrConfirmPass(strConfirmPass, strPass) {
  if (strConfirmPass.length < 2 || strConfirmPass.length > 30) {
    return "Vui lòng nhập mật khẩu có độ dài từ 2-30 kí tự";
  }
  if (strConfirmPass !== strPass) {
    return "Mật khẩu xác nhận không khớp";
  }
}

const checkConfirmPass = (inputConfirmPass, inputPass) => {
  let strInputConfirm = inputConfirmPass.value.trim();
  let strInputPass = inputPass.value.trim();
  if (checkStrConfirmPass(strInputConfirm, strInputPass)) {
    showError(
      inputConfirmPass,
      checkStrConfirmPass(strInputConfirm, strInputPass)
    );
  } else {
    showSuccess(inputConfirmPass);
  }
};

const checkAddress = (province, district, wards) => {
  district == 0 ? "Vui lòng nhập huyện" : "";
  wards == 0 ? "Vui lòng nhập xã" : "";
};
function getParent(elm) {
  return elm.parentElement.parentElement.parentElement;
}
function AddressChange(elmProvince, elmDistrict, elmWards) {
  let small = getParent(elmProvince).querySelector(".showStatus small");
  elmProvince.addEventListener("change", () => {
    let str = elmProvince.value == 0 ? "Vui lòng lựa chọn địa chỉ" : "";
    if (str) {
      small.innerText = str;
      getParent(elmProvince).classList.add("error");
    } else {
      if (elmDistrict.value != 0 && elmWards.value != 0) {
        small.innerText = "";
        getParent(elmProvince).classList.remove("error");
      }
    }
  });
  elmDistrict.addEventListener("change", () => {
    let str = elmDistrict.value == 0 ? "Vui lòng lựa chọn địa chỉ" : "";
    if (str) {
      small.innerText = str;
      getParent(elmDistrict).classList.add("error");
    } else {
      if (elmWards.value != 0) {
        small.innerText = "";
        getParent(elmDistrict).classList.remove("error");
      }
    }
  });
  elmWards.addEventListener("change", () => {
    let str = elmWards.value == 0 ? "Vui lòng lựa chọn địa chỉ" : "";
    if (str) {
      small.innerText = str;
      getParent(elmWards).classList.add("error");
    } else {
      small.innerText = "";
      getParent(elmWards).classList.remove("error");
    }
  });
}

const changeInput = (inputs) => {
  console.log(inputs);
  //let giaTriDaThayDoi;
  let getElm;
  inputs.forEach((element) => {
    switch (element.name) {
      case "yourname":
        element.addEventListener("blur", function (e) {
          checkName(element);
        });
        break;
      case "mail":
        element.addEventListener("blur", function (e) {
          checkMail(element);
        });
        break;
      case "number":
        element.addEventListener("input", function (e) {
          validateNumberInput(element);
        });
        element.addEventListener("blur", function (e) {
          checkNumberPhone(element);
        });
        break;
      case "pass":
        getElm = element;
        element.addEventListener("blur", function (e) {
          checkPassword(element);
        });
        break;
      case "confirm":
        element.addEventListener("blur", function (e) {
          checkConfirmPass(element, getElm);
        });
        break;
      default:
        console.log("Hết lựa chọn!");
    }
  });
};

export function getAddress(elmTinh, elmHuyen, elmXa) {
  getTinh(url, elmTinh);
  console.log(elmTinh, elmHuyen, elmXa);
  elmTinh.onchange = function () {
    let selectedValue = this.value;
    console.log("Selected value:", selectedValue);
    if (selectedValue != 0) {
      getHuyen(selectedValue, elmHuyen);
      elmHuyen.onchange = function () {
        let selectedValue = this.value;
        if (selectedValue != 0) {
          getXa(selectedValue, elmXa);
        } else {
          elmXa.innerHTML = "<option>Nhập xã</option>";
        }
      };
    } else {
      elmHuyen.innerHTML = "<option>Nhập huyện</option>";
      elmXa.innerHTML = "<option>Nhập xã</option>";
    }
  };
}
export function checkDangKi(elmTinh, elmHuyen, elmXa, inputs) {
  changeInput(inputs);
  AddressChange(elmTinh, elmHuyen, elmXa);
}

function checksubmit(elmTinh, elmHuyen, elmXa, smalls, inputs) {
  inputs.forEach((element, index) => {
    if (checkStrEmty(element.value)) {
      showError(element, checkStrEmty(element.value));
    } else {
      showSuccess(element);
    }
  });
  if (checkStrEmty(inputs[4].value)) {
    showError(inputs[4], checkStrEmty(inputs[4].value));
  } else {
    if (inputs[3].value != inputs[4].value) {
      showError(inputs[4], "Mật khẩu xác nhận không chính xác");
    } else {
      showSuccess(inputs[4]);
    }
  }
  console.log(smalls);
  if (elmTinh.value == 0 || elmHuyen.value == 0 || elmXa.value == 0) {
    getParent(elmTinh).querySelector("small").innerText =
      "Vui lòng lựa chọn địa chỉ";
    getParent(elmTinh).classList.add("error");
    return false;
  }
  return !Array.from(smalls).some((element) => {
    return element.innerText != "";
  });

  return true;
}
function getTextSelect(elm) {
  let selectedOption = elm.options[elm.selectedIndex];
  return selectedOption.text;
}
async function HandleSubmit(elmTinh, elmHuyen, elmXa, inputs) {
  const user = {
    address:
      getTextSelect(elmTinh) +
      "," +
      getTextSelect(elmHuyen) +
      "," +
      getTextSelect(elmXa),
  };
  inputs.forEach((input) => {
    if (input.name != "confirm") {
      user[input.name] = input.value;
    }
  });
  console.log(user);
  const response = await fetch(
    "http://localhost/QLBH/QLBanHang/Controller/user.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();

  if (data.success) {
    console.log("Thêm user thành công:", data.message);
  } else {
    console.error("Lỗi khi thêm user:", data.message);
  }
}
export function Submit(elmTinh, elmHuyen, elmXa, smalls, inputs) {
  let strEmail = inputs[1].value;
  let strSdt = inputs[2].value;
  if (checksubmit(elmTinh, elmHuyen, elmXa, smalls, inputs)) {
    getUser()
      .then((data) => {
        console.log(data);
        console.log(strEmail, strSdt);
        return data.some((elm) => {
          return elm.email == strEmail || elm.phone == strSdt;
        });
      })
      .then((check) => {
        console.log(check);
        if (check) {
          alert("Số điện thoại hoặc email đã có người đăng kí");
        } else {
          HandleSubmit(elmTinh, elmHuyen, elmXa, inputs);
          alert("Thêm thành công");
        }
      });
  }
}
