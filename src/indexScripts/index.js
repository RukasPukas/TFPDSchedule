import $ from "jquery";
import "../../CSS/style.css";

$(function () {
  $("body").hide().fadeIn(750);
  const $email = $("#email");
  $email.focus();

  // 🔐 LOGIN SUBMIT HANDLER
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    console.log("Submitting login:", email, password);

    $.ajax({
      url: "http://localhost:3000/api/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email, password }),
      success: function (res) {
        console.log("Login success:", res);
        alert("Login successful!");
        // Later: redirect to dashboard
        // window.location.href = "dashboard.html";
      },
      error: function (xhr) {
        console.log("Login error:", xhr.responseJSON || xhr.statusText);
        alert(
          (xhr.responseJSON && xhr.responseJSON.message) ||
          "Login failed. Check email/password."
        );
      }
    });
  });
});
