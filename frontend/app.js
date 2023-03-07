const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

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
      console.log(data);
      if (data.status === 200) login();
      if (data.status === 401) alert("Wrong password");
      if (data.status === 404) alert("User not found");
    });
}

function login() {
  document.querySelector("#home").style.display = "block";
  document.querySelector("#login").style.display = "none";
}

function logout() {
  document.querySelector("#home").style.display = "none";
  document.querySelector("#login").style.display = "block";
}

logoutBtn.addEventListener("click", logout);
loginBtn.addEventListener("click", getUser);
