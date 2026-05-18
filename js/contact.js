const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";
    formStatus.className = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (name === "") {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    if (email === "") {
      emailError.textContent = "Please enter your email.";
      isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (subject === "") {
      subjectError.textContent = "Please enter a subject.";
      isValid = false;
    }

    if (message === "") {
      messageError.textContent = "Please enter your message.";
      isValid = false;
    } else if (message.length < 10) {
      messageError.textContent = "Message must be at least 10 characters long.";
      isValid = false;
    }

    if (!isValid) {
      formStatus.textContent = "Please fix the errors above.";
      formStatus.classList.add("error");
      return;
    }

    formStatus.textContent = "Thank you! Your message has been received.";
    formStatus.classList.add("success");

    contactForm.reset();
  });
}