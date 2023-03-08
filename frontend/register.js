import { renderHomeCard } from "./home.js";
import { renderLoginCard } from "./login.js";
import { root } from "./app.js";

export function renderRegisterCard() {
  root.innerHTML = "";

  const registerBox = document.createElement("div");
  const h1 = document.createElement("h1");
  const nameInput = document.createElement("input");
  const pwInput1 = document.createElement("input");
  const pwInput2 = document.createElement("input");
  const registerBtn = document.createElement("button");
  const small = document.createElement("small");
  const toggleLogReg = document.createElement("a");
  const br = document.createElement("br");

  registerBox.classList.add("card");
  h1.innerText = "Register";
  nameInput.id = "registerNameInput";
  nameInput.placeholder = "Name";
  pwInput1.id = "registerPwInput1";
  pwInput1.placeholder = "Password";
  pwInput1.type = "password";
  pwInput2.id = "registerPwInput2";
  pwInput2.placeholder = "Confirm Password";
  pwInput2.type = "password";
  registerBtn.innerText = "Register";
  small.innerText = "Already have an account?";
  toggleLogReg.innerText = "Login";

  registerBtn.addEventListener("click", registerNewUser);
  toggleLogReg.addEventListener("click", renderLoginCard);
  registerBox.append(
    h1,
    nameInput,
    pwInput1,
    pwInput2,
    registerBtn,
    small,
    br,
    toggleLogReg
  );
  root.append(registerBox);
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
      if (data.message === "User created") renderHomeCard();
    });
}
