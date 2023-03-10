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
    }
    else if (!formIsCorrect) {
        window.alert("Some of the fields have invalid input!");
    }
    else {
        let message = "";
        inputElements.forEach((input) => {
            message += `${input.name}: ${input.value}\n`;
        })
        window.alert(message);
    }
    e.preventDefault();
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
        case "Email": {
            if (/[a-zA-Z]+([^a-zA-Z\s\d][a-zA-Z]+)*@[a-zA-Z]+\.[a-zA-Z]+/.test(value)) {
                return feedbackGood;
            }
            else {
                return "Email is not valid!";
            }
        }
        case "Username": {
            if (/[A-Z]+.*[\W|\d]+/.test(value) && /^\S*$/.test(value)) {
                return feedbackGood;
            }
            else {
                return "Username is not valid!";
            }
        }
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
        case "Name": {
            if (/[A-Z][a-z]+(\s[A-Z][a-z]+)*/.test(value)) {
                return feedbackGood;
            }
            else {
                return "Name is not valid!";
            }
        }
        case "Country": {
            if (/[A-Z][a-z]+/.test(value)) {
                return feedbackGood;
            }
            else {
                return "Country is not valid!";
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
