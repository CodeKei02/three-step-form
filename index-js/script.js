let formStepsContainer = document.querySelectorAll('.form-step');
let stepNumber = document.querySelector('.step-number');
let form = document.querySelector('.form');
let userName = document.querySelector('.user-name');
let userEmail = document.querySelector('.user-email');
let topicOption = document.querySelectorAll('.topic-option');
let stepCircle = document.querySelectorAll('.step-circle');
let topicSelected = [];
let countSteps = 1;

function disabledStep(stepIndex) {
    formStepsContainer[stepIndex].classList.add('disabled');
    stepCircle[stepIndex].classList.remove('step-circle-shadow');
};

function enableStep(stepIndex) {
    formStepsContainer[stepIndex].classList.remove('disabled');
    stepCircle[stepIndex].classList.add('step-circle-shadow');
};

function updateStepNumber() {
    stepNumber.innerHTML = countSteps;
};

function displayError(messageError, index, message) {
    messageError[index].innerHTML = message;
};

function clearErrors(messageError) {
    messageError.forEach((msg) => msg.innerHTML = "");
};

function validateForm(name, email) {
    let messageError = document.querySelectorAll('.message-error');
    clearErrors(messageError);

    let isValid = true;

    if (name === "" || typeof name !== 'string' || name.length === 0) {
        displayError(messageError, 0, "Ingrese un nombre valido!");
        isValid = false;
    } else {
        userName.innerHTML = name;
    }

    if (!validateEmail(email) || email.length == 0) {
        displayError(messageError, 1, "Ingrese un correo valido!");
        isValid = false;
    } else {
        userEmail.innerHTML = email;
    }

    return isValid;
};

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formName = document.querySelector('#form-name').value;
    let formEmail = document.querySelector('#form-email').value;

    if (validateForm(formName, formEmail)) {
        goToStep(1);
    }
});

document.getElementById('button-continue').addEventListener('click', () => {
    if (topicSelected.length > 0) {
        goToStep(2);
    } else {
        alert('Error, debe seleccionar al menos un tema!');
    }
});

document.getElementById('button-confirm').addEventListener('click', messageSuccess);

function goToStep(stepIndex) {
    formStepsContainer.forEach((step, index) =>{
        if(index === stepIndex){
            enableStep(index);
        }else{
            disabledStep(index);
        }
    });
    countSteps = stepIndex + 1;
    updateStepNumber();
};
function topicsItemList() {
    let topicList = ['Software Development', 'User Experience', 'Graphic Design'];
    topicOption.forEach((btnTopic, index) => {
        btnTopic.addEventListener('click', function () {
            this.classList.toggle('topic-option-selected');

            let topicIndex = topicSelected.indexOf(topicList[index]);

            if (topicIndex > -1) {
                topicSelected.splice(topicIndex, 1);
            } else {
                topicSelected.push(topicList[index]);
            }

            updateList();

        });
    });
};
function messageSuccess() {
    goToStep(0);

    form.submit();
    return alert('✅ Success');
};
function updateList() {
    let ul = document.querySelector('.item-list');
    ul.innerHTML = "";
    topicSelected.forEach((topic) => {
        const li = document.createElement('li');
        li.textContent = topic;
        ul.appendChild(li);
    });
};

topicsItemList();