// js/protection.js
(function () {
  const PASSWORD = "preview2026"; // change your password here

  // Hide page immediately
  document.documentElement.style.display = "none";

  // Check if already authenticated in this session
  if (sessionStorage.getItem("preview_auth") === "1") {
    document.documentElement.style.display = "block";
    return;
  }

  // Ask for password
  const entered = prompt("Enter preview password:");

  if (entered === PASSWORD) {
    sessionStorage.setItem("preview_auth", "1");
    document.documentElement.style.display = "block"; // show page
  } else {
    alert("Wrong password. Access denied.");
    // Optionally redirect to blank page
    document.documentElement.innerHTML = "";
  }
})();
