import { root } from "../app.js";
import { renderHomeCard } from "./home.js";
import { renderRegisterCard } from "./register.js";

export function renderLoginCard() {
  root.innerHTML = "";

  const login = document.createElement("div");
  const h1 = document.createElement("h1");
  const nameInput = document.createElement("input");
  const pwInput = document.createElement("input");
  const loginBtn = document.createElement("button");
  const small = document.createElement("small");
  const toggleLogReg = document.createElement("a");
  const br = document.createElement("br");

  login.classList.add("card");
  h1.innerText = "Login";
  nameInput.id = "nameInput";
  nameInput.placeholder = "Username";
  pwInput.id = "pwInput";
  pwInput.placeholder = "Password";
  pwInput.type = "password";
  loginBtn.innerText = "Login";
  small.innerText = "Dont have an account?";
  toggleLogReg.innerText = "Register";

  toggleLogReg.addEventListener("click", renderRegisterCard);
  loginBtn.addEventListener("click", getUser);
  login.append(h1, nameInput, pwInput, loginBtn, small, br, toggleLogReg);
  root.append(login);
}

export function getUser() {
  const nameInput = document.querySelector("#nameInput");
  const pwInput = document.querySelector("#pwInput");
  const user = {
    username: nameInput.value,
    password: pwInput.value,
  };
  fetchUser(user);
}

export function fetchUser(user) {
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Login successful") renderHomeCard();
      if (data.message === "Wrong password") alert("Wrong password");
      if (data.message === "User not found") alert("User not found");
    });
}
