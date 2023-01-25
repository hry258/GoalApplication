const form = document.getElementById("signUp-form");
const inputElements = form.querySelectorAll(".form-section input");
const feedbackGood = "Looks good!";

inputElements.forEach((input) => {
  input.addEventListener("input", () => validateInput(input));
});

form.addEventListener("submit", (e) => {
    let formIsCorrect = true;
    let password = null;
    let confirmation = null;
    inputElements.forEach((input) => {
        if (input.name == "password") {
            password = input.value;
            console.log(password);
        }
        else if (input.name == "password confirmation") {
            confirmation = input.value;
            console.log(confirmation);
        }
        if (!validateFinal(input)) {
            formIsCorrect = false;
        }
    })
    if (formIsCorrect && password != null && confirmation != null && password != confirmation) {
        window.alert("Passwords do not match!");
        e.preventDefault();
    }
    else if (!formIsCorrect) {
        window.alert("Some of the fields have invalid input!");
        e.preventDefault();
    }
    else {
        let message = "";
        inputElements.forEach((input) => {
            message += `${input.name}: ${input.value}\n`;
        })
        window.alert(message);
    }
});

function validateFinal(input) {
    const feedback = validateFormFields(input.name, input.value);
    if (feedback == feedbackGood) {
        return true;
    }
    return false;
}

function validateFormFields(fieldName, value) {
    if (!value) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} should not be empty!`;

    switch (fieldName) {
        case "password": {
            if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value) && value.length >= 12) {
                return feedbackGood;
            }
            else {
                return "Password is not valid!";
            }
        }
        case "password confirmation": {
            if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value) && value.length >= 12) {
                return feedbackGood;
            }
            else {
                return "Password is not valid!";
            }
        }
        default: {
            return false;
        }
    }
}

function validateInput(input) {
    const parent = input.parentElement;
    const message = parent.querySelector(".message");
    const feedback = validateFormFields(input.name, input.value);
    if (!!feedback) {
        message.classList.add("show");
        message.innerHTML = feedback;
        if (feedback == feedbackGood) {
            message.style.color = "#14821D";
            input.classList.add("validInputBorder");
            input.classList.remove("invalidInputBorder")
        }
        else {
            message.style.color = "red";
            input.classList.add("invalidInputBorder");
            input.classList.remove("validInputBorder")
        }
    } 
    else {
        message.classList.remove("show");
        message.innerHTML = "";
    }
}
