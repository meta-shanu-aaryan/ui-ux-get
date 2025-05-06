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
var isNum = function (str) {
    return /\d/.test(str);
};
var empIndex = 0;
var empForm = document.querySelectorAll("#emp-form>div");
var empNext = document.querySelector("#emp-next");
var empEnt = document.querySelectorAll("#emp-form input");
var empRegistrationNumber = 0;
var empObj = {};
var empFormHandler = function (e) {
    e.preventDefault();
    console.log();
    if (empIndex + 1 == empForm.length) {
        empEnt.forEach(function (inp) {
            if (inp.type === "radio") {
                if (inp.checked) {
                    localStorage.setItem(inp.tagName, inp.value);
                    console.log(inp.value);
                }
            }
            else {
                localStorage.setItem(inp.tagName, inp.value);
                console.log(inp.value);
            }
        });
        var elem = document.getElementById("ticket-no");
        empRegistrationNumber++;
        var currForm = document.getElementById("emp-form");
        currForm !== null && currForm.classList.add("d-none");
        localStorage.setItem("ticketNumber", empRegistrationNumber.toString());
        elem !== null && elem.innerText === "your ticket number is ".concat(empRegistrationNumber);
        elem !== null && elem.classList.remove("d-none");
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
        else {
            var inpElem = empForm[empIndex].querySelectorAll("input");
            inpElem.forEach(function (ever) {
                if (ever.type === "radio") {
                    if (ever.checked) {
                        empObj["".concat(ever.name)] = ever.value;
                    }
                }
                else {
                    empObj["".concat(ever.name)] = ever.value;
                }
            });
            console.log(empObj);
            empForm[empIndex].classList.add("d-none");
            empForm[++empIndex].classList.remove("d-none");
        }
    }
};
if (empNext !== null) {
    empNext.addEventListener("click", empFormHandler);
}
empEnt.forEach(function (eve) { return (eve.addEventListener("keypress", function (e) {
    console.log("dadedad");
    if (e.key === "Enter") {
        empFormHandler(e);
    }
})); });
