import { renderLoginCard } from "./login.js";

export function renderHomeCard() {
  root.innerHTML = "";

  const home = document.createElement("div");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const logoutBtn = document.createElement("button");

  home.classList.add("card");
  h1.innerText = "Welcome!";
  p.innerText = "Not much to do here..... Try logging out!";
  logoutBtn.innerText = "Logout";

  logoutBtn.addEventListener("click", renderLoginCard);
  home.append(h1, p, logoutBtn);
  root.append(home);
}
