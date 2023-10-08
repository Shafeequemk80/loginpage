function validateForm() {
  document.getElementById("email-error").textContent = "";
  document.getElementById("password-error").textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !email.include("@")) {
    document.getElementById("email-error").textContent = "Enter E-mail";
  }
  if (!password) {
    document.getElementById("password-error").textContent = "Enter Password";
  }
  return true;
}
