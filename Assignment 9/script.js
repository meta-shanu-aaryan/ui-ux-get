var numb = 10;
var gender;
(function (gender) {
    gender[gender["male"] = 0] = "male";
    gender[gender["female"] = 1] = "female";
})(gender || (gender = {}));
var Employee = /** @class */ (function () {
    function Employee() {
    }
    return Employee;
}());
var vehicleType;
(function (vehicleType) {
    vehicleType[vehicleType["bicycle"] = 0] = "bicycle";
    vehicleType[vehicleType["bike"] = 1] = "bike";
    vehicleType[vehicleType["car"] = 2] = "car";
    vehicleType[vehicleType["truck"] = 3] = "truck";
})(vehicleType || (vehicleType = {}));
var Vehicle = /** @class */ (function () {
    function Vehicle() {
    }
    return Vehicle;
}());
var passType;
(function (passType) {
    passType[passType["daily"] = 0] = "daily";
    passType[passType["monthly"] = 1] = "monthly";
    passType[passType["yearly"] = 2] = "yearly";
})(passType || (passType = {}));
var CarPass = /** @class */ (function () {
    function CarPass() {
    }
    return CarPass;
}());
var passwordVerify = function (password) {
    var strength = 0;
    var hasUppercase = /[A-Z]/.test(password);
    var hasLowercase = /[a-z]/.test(password);
    var hasSpecialChar = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(password);
    var hasNumeric = /\d/.test(password);
    if (hasUppercase)
        strength++;
    if (hasLowercase)
        strength++;
    if (hasSpecialChar)
        strength++;
    if (hasNumeric)
        strength++;
    return strength;
};
var emp1 = new Employee;
var isNum = function (str) {
    return /\d/.test(str);
};
var empIndex = 0;
var empForm = document.querySelectorAll("#emp-form>div");
var empNext = document.querySelector("#emp-next");
var empEnt = document.querySelectorAll("#emp-form input");
var empRegistrationNumber = 0;
var empObj = {
    "password": "",
    "cnfPassword": "",
    "contact": "",
    "fullName": "",
    "email": "",
    "gender": "",
};
var empFormHandler = function (e) {
    e.preventDefault();
    console.log();
    if (empIndex + 1 == empForm.length) {
        empEnt.forEach(function (inp) {
            if (inp.type === "radio") {
                if (inp.checked) {
                    empObj[inp.name] = inp.value;
                }
            }
            else {
                empObj[inp.name] = inp.value;
            }
        });
        emp1.confirmPassword = empObj.cnfPassword;
        emp1.contact = empObj.password;
        emp1.emailId = empObj.email;
        emp1.fullName = empObj.fullName;
        emp1.gender = empObj.gender === "male" ? gender.male : gender.female;
        var elem = document.getElementById("ticket-no");
        empRegistrationNumber++;
        var currForm = document.getElementById("emp-form");
        currForm !== null && currForm.classList.add("d-none");
        localStorage.setItem("ticketNumber", empRegistrationNumber.toString());
        if (elem !== null)
            elem.innerText = "your ticket number is ".concat(empRegistrationNumber);
        elem !== null && elem.classList.remove("d-none");
        console.log(empObj);
    }
    else {
        var elem = empForm[empIndex].getElementsByTagName("input")[0];
        if (elem.getAttribute("name") === "fullName" && (elem.value.length < 3 || isNum(elem.value))) {
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger");
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3");
        }
        else if ((elem.getAttribute("name") === "password" || elem.getAttribute("name") === "cnfPassword") && passwordVerify(elem.value) !== 4) {
            console.log(passwordVerify(elem.value));
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger");
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3");
        }
        else if (elem.getAttribute("name") === "cnfPassword" && elem.value !== empObj.password) {
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger");
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3");
        }
        else if (elem.getAttribute("name") === "contact" && (!isNum(elem.value) && elem.value.length < 8)) {
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-danger");
            empForm[empIndex].getElementsByTagName("input")[0].classList.add("border-3");
        }
        else {
            empForm[empIndex].classList.add("d-none");
            empForm[++empIndex].classList.remove("d-none");
        }
    }
};
if (empNext !== null) {
    empNext.addEventListener("click", empFormHandler);
}
empEnt.forEach(function (eve) { return (eve.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        empFormHandler(e);
    }
})); });
var passwordInput = document.querySelectorAll("#emp-form input[type=\"password\"]");
passwordInput.forEach(function (passInput) { return (passInput.addEventListener("input", function (e) {
    // console.log(passInput.value)
    if (passInput.value.length < 8) {
        passInput.classList.remove("border");
        passInput.classList.add("border-danger");
        passInput.classList.add("border-3");
    }
    else {
        passInput.classList.remove("border-danger");
        passInput.classList.add("border-success");
    }
})); });
var vehicleInputIndex = 0;
var vehicleForm = document.querySelectorAll("#vehicle-form>div");
var vehicleInput = document.querySelectorAll("#vehicle-form input");
var vehicleFormHandler = function (e) {
    e.preventDefault();
    if (vehicleInputIndex + 1 == vehicleForm.length) {
        var vehForm = document.getElementById("vehicle-form");
        if (vehForm !== null) {
            vehForm.classList.add("d-none");
        }
        var vehConfirmation = document.getElementById("vehicle-confirmation");
        if (vehConfirmation !== null) {
            vehConfirmation.classList.remove("d-none");
        }
    }
    else {
        vehicleForm[vehicleInputIndex].classList.add("d-none");
        vehicleForm[++vehicleInputIndex].classList.remove("d-none");
    }
};
var vehicleNext = document.getElementById("vehicle-next");
vehicleNext.addEventListener("click", vehicleFormHandler);
var displayPriceInDollar = function () {
    document.querySelectorAll(".price-inr").forEach(function (inrPrice) { return (inrPrice.classList.add("d-none")); });
    document.querySelectorAll(".price-yen").forEach(function (yenPrice) { return (yenPrice.classList.add("d-none")); });
    document.querySelectorAll(".price-usd").forEach(function (yenPrice) { return (yenPrice.classList.remove("d-none")); });
};
var displayPriceInYen = function () {
    document.querySelectorAll(".price-inr").forEach(function (inrPrice) { return (inrPrice.classList.add("d-none")); });
    document.querySelectorAll(".price-usd").forEach(function (yenPrice) { return (yenPrice.classList.add("d-none")); });
    document.querySelectorAll(".price-yen").forEach(function (yenPrice) { return (yenPrice.classList.remove("d-none")); });
};
var displayPriceInInr = function () {
    document.querySelectorAll(".price-usd").forEach(function (inrPrice) { return (inrPrice.classList.add("d-none")); });
    document.querySelectorAll(".price-yen").forEach(function (yenPrice) { return (yenPrice.classList.add("d-none")); });
    document.querySelectorAll(".price-inr").forEach(function (yenPrice) { return (yenPrice.classList.remove("d-none")); });
};
var usdBtn = document.getElementById("usd-btn");
if (usdBtn !== null) {
    usdBtn.addEventListener("click", displayPriceInDollar);
}
var inrBtn = document.getElementById("inr-btn");
if (inrBtn !== null) {
    inrBtn.addEventListener("click", displayPriceInInr);
}
var yenBtn = document.getElementById("yen-btn");
if (yenBtn !== null) {
    yenBtn.addEventListener("click", displayPriceInYen);
}
