// Initialize EmailJS
emailjs.init("cYucH6-NQPhLChBpa");

// HTML Elements
const email = document.getElementById("email");
const otpInput = document.getElementById("otp_inp");
const otpBox = document.querySelector(".otpverify");

let generatedOTP = "";

// Hide OTP box initially
otpBox.style.display = "none";

// Send OTP
function sendOTP() {

    if (email.value.trim() === "") {
        alert("Please enter your email.");
        return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {
        alert("Please enter a valid email.");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    const sendButton = document.querySelectorAll(".btn")[1];
    sendButton.disabled = true;
    sendButton.innerText = "Sending...";

    emailjs.send(
        "service_68obu9d",
        "template_6ocic53",
        {
            to_email: email.value,
            otp: generatedOTP
        }
    )
    .then(() => {

        alert("OTP sent successfully.");

        otpBox.style.display = "flex";

        sendButton.disabled = false;
        sendButton.innerText = "Resend OTP";

    })
    .catch((error) => {

        console.log(error);

        alert("Failed to send OTP.");

        sendButton.disabled = false;
        sendButton.innerText = "Send OTP";

    });

}

// Verify OTP
function verifyOTP() {

    if (otpInput.value.trim() === "") {
        alert("Please enter the OTP.");
        return;
    }

    if (otpInput.value === generatedOTP) {

        otpInput.style.border = "2px solid green";

        alert("✅ Email Verified Successfully!");

        // Redirect after 1 second
        setTimeout(() => {
            window.location.href = "index.html"; // Change this to your first page
        }, 1000);

    } else {

        otpInput.style.border = "2px solid red";

        alert("❌ Invalid OTP");

    }

}