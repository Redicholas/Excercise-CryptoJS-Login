const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const registerBtn = document.querySelector("#registerBtn");
const toggleLogReg = document.querySelectorAll(".toggleLogReg");

function getUser() {
  const nameInput = document.querySelector("#nameInput");
  const pwInput = document.querySelector("#pwInput");
  const user = {
    username: nameInput.value,
    password: pwInput.value,
  };
  fetchUser(user);
}

function fetchUser(user) {
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Login successful") login();
      if (data.message === "Wrong password") alert("Wrong password");
      if (data.message === "User not found") alert("User not found");
    });
}

function registerNewUser() {
  const nameInput = document.querySelector("#registerNameInput");
  const pwInput1 = document.querySelector("#registerPwInput1");
  const pwInput2 = document.querySelector("#registerPwInput2");
  if (pwInput1.value !== pwInput2.value) {
    alert("Passwords do not match");
    return;
  }
  const user = {
    username: nameInput.value,
    password: pwInput1.value,
  };
  fetchRegister(user);
}

function fetchRegister(user) {
  fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Username already taken")
        alert("Username already taken");
      if (data.message === "User created") login();
    });
}

function toggleLoginRegister() {
  const loginBox = document.querySelector("#login");
  const registerBox = document.querySelector("#registerBox");

  if (loginBox.style.display === "none") {
    loginBox.style.display = "block";
    registerBox.style.display = "none";
  } else {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
  }
}

function login() {
  document.querySelector("#home").style.display = "block";
  document.querySelector("#login").style.display = "none";
}

function logout() {
  document.querySelector("#home").style.display = "none";
  document.querySelector("#login").style.display = "block";
}

toggleLogReg.forEach((btn) => {
  btn.addEventListener("click", toggleLoginRegister);
});
logoutBtn.addEventListener("click", logout);
loginBtn.addEventListener("click", getUser);
registerBtn.addEventListener("click", registerNewUser);
