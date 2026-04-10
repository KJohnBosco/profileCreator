"use strict";
const uploadImageInput = document.querySelector("#uploadImageInput");
const newEmp = document.querySelector("#newEmp");
const addEmpBtn = document.querySelector("#addEmp");
const discard = document.querySelector("#discard");
const optMenu = document.querySelector("#optMenu");
const proprev = document.querySelector("#proprev");
const userName = document.querySelector("#userName");
const jobTitle = document.querySelector("#jobTitle");
const trashCan = document.querySelector("#trashCan");
const userEmail = document.querySelector("#userEmail");
const menuIcon = document.querySelector("#menuIcon");
const introBtn = document.querySelector("#introBtn");
const infoBtn = document.querySelector("#infoBtn");
const msgContents = document.querySelector("#msgContents");
const introMessage = document.querySelector("#introMessage");
const newEmployeeForm = document.querySelector("#newEmployeeForm");
const employeeCardsContainer = document.querySelector(
  "#employeeCardsContainer",
);
let proImage;

class Employee {
  constructor(fullName, email, title) {
    this.name = fullName;
    this.email = email;
    this.title = title;
    this.profileImage = proImage ?? "";

    Emp.push({
      name: this.name,
      email: this.email,
      title: this.title,
      profileImage: this.profileImage,
    });

    store();

    showCards();
  }
}

// Store
const store = function () {
  localStorage.setItem("employess", JSON.stringify(Emp));
  Emp = JSON.parse(localStorage.getItem("employess")) ?? [];

  // console.log(Emp); // Test output

  return Emp;
};

let Emp = JSON.parse(localStorage.getItem("employess")) ?? [];
///////////////////////////////////

newEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Set trach mechanism
employeeCardsContainer.addEventListener("click", (e) => {
  //   console.log(e.target.dataset.index); //Test output

  trashCan.dataset.trash = e.target.dataset.index;

  if (e.target.dataset.index) {
    optMenu.style.transform = "scale(1)";
  }
});

// Display menu
menuIcon.addEventListener("click", () => {
  if (optMenu.style.transform === "scale(1)") {
    optMenu.style.transform = "scale(0)";
  } else {
    optMenu.style.transform = "scale(1)";
  }
});

// Add new profile data
addEmpBtn.addEventListener("click", () => {
  new Employee(userName.value, userEmail.value, jobTitle.value);

  userName.value = "";
  userEmail.value = "";
  jobTitle.value = "";
  proprev.setAttribute("src", "");

  newEmp.style.display = "none";
});

///////////////////////////////////////////
optMenu.addEventListener("click", (e) => {
  switch (e.target.dataset.role) {
    case "add":
      newEmp.style.display = "flex";
      break;
    case "edit":
      alert("Edit functionality in progress");
      break;
    case "trash":
      trashCan.getAttribute("data-trash")
        ? true
        : alert("Select an employee to remove");
      break;
    case "profile":
      alert("Profile functionality in progress");
      break;
    case "search":
      alert("Search functionality in progress");
      break;
  }
});

// hide new emp form
discard.addEventListener("click", () => {
  newEmp.style.display = "none";
});

// preview profile image
uploadImageInput.addEventListener("change", () => {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    proprev.setAttribute("src", reader.result);
    proImage = reader.result;
    console.log(proImage);
  });

  reader.readAsDataURL(uploadImageInput.files[0]);
});

// Display employees
const showCards = function () {
  employeeCardsContainer.innerHTML = "";

  Emp.forEach((employee, i) => {
    const card = `
    <div class="card" data-index='${i}'>
    <h3>${employee.name}</h3>
    <p>${employee.title}</p>
    <img src="${employee.profileImage}" alt="profile image" />
    <p>${employee.email}</p>
    </div>`;

    employeeCardsContainer.insertAdjacentHTML("afterbegin", card);
  });
};
showCards();

// Trash Employee
trashCan.addEventListener("click", () => {
  let target = trashCan.getAttribute("data-trash");

  // console.log(target); //Test output

  if (target === "") {
    //
  } else {
    Emp.splice(Number(target), 1);
    store();
    showCards();
    alert("Employee Removed successfully");
  }
});

// Welcome Message
introBtn.addEventListener("click", () => {
  introMessage.style.display = "none";
  infoBtn.style.display = "flex";
  introBtn.style.display = "none";
});

// On page load show intro message
document.addEventListener("DOMContentLoaded", () => {
  intro();
});

infoBtn.addEventListener("click", () => {
  if (introMessage.style.display === "flex") {
    introMessage.style.display = "none";
  } else {
    introMessage.style.display = "flex";
  }
});

// intro message
const intro = function () {
  setTimeout(() => {
    introMessage.style.display = "flex";

    setTimeout(() => {
      msgContents.style.transform = "scale(1)";
    }, 200);
  }, 1200);
};
