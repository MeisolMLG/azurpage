// ZAPIER CONNECTION

const name = document.getElementById("name-input");
const email = document.getElementById("email-input");
const phone = document.getElementById("phone-input");
const gdpr = document.getElementById("gdpr-checkbox");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const gdprError = document.getElementById("gdpr-error");
const title = document.getElementById("register-title");
const text = document.getElementById("register-text");
const form = document.getElementById("register-form");
const sent = document.getElementById("register-sent");
const success = document.getElementById("form-success");

const validateEmail = (email) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
    email
  );
};

const validateForm = (name, email, phone, gdpr) => {
  let nameValid = true;
  let emailValid = true;
  let phoneValid = true;

  if (name === "") {
    nameValid = false;
    nameError.classList.remove("hidden");
  }

  if (email === "" || !validateEmail(email)) {
    emailValid = false;
    emailError.classList.remove("hidden");
  }

  if (phone === "") {
    phoneValid = false;
    phoneError.classList.remove("hidden");
  }

  if (!gdpr) gdprError.classList.remove("hidden");

  return nameValid && emailValid && phoneValid && gdpr;
};

const zapierRequest = (data) => {
  const request = new XMLHttpRequest();

  return new Promise(function (resolve, reject) {
    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status >= 200 && request.status < 300) {
        resolve(request);
      } else {
        reject(
          new Error({
            status: request.status,
            statusText: request.statusText,
          })
        );
      }
    };
    if (title && text && form && sent) {
      title.classList.add("hidden");
      text.classList.add("hidden");
      sent.classList.remove("hidden");
    }
    request.open(
      "POST",
      "https://hooks.zapier.com/hooks/catch/15990774/3mxnr2h/",
      true
    );
    request.send(JSON.stringify(data));
  });
};

console.log("Sumbit ok");
document.querySelector("#btn-send").onclick = () => {
  if (!nameError.classList.contains("hidden"))
    nameError.classList.add("hidden");

  if (!emailError.classList.contains("hidden"))
    emailError.classList.add("hidden");

  if (!phoneError.classList.contains("hidden"))
    phoneError.classList.add("hidden");

  if (!gdprError.classList.contains("hidden"))
    gdprError.classList.add("hidden");

  if (validateForm(name.value, email.value, phone.value, gdpr.checked))
    zapierRequest({
      name: name.value,
      email: email.value,
      phone: phone.value,
      source: umt.source,
      medium: umt.medium,
      campaign: umt.campaign,
      content: umt.content,
      pipelineKey: 33,
      stageKey: 305,
    })
      .then(() => {
        success.classList.remove('hidden')
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
};

const umt = {};
