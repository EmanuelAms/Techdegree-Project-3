/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

// I am aiming for an "Exceeds Expectations" grade only.

/*
Set focus on the first text field
*/

const nameInput = document.getElementById('name') ;
nameInput.focus() ;

/*
”Job Role” section
*/

// Hiding the "Other" Job role input field.

const OtherJobRole = document.getElementById('other-title');
const OtherJobLabel = document.getElementById('other-label');
const SelectJobRole = document.getElementById('title');

OtherJobRole.style.visibility = 'hidden' ; 
OtherJobLabel.style.visibility = 'hidden' ;

// Making the "Other" Job role input field appear when it is selected in the "Job role" drop down menu.

SelectJobRole.addEventListener('change', (event) => {

if (event.target.value == "other") {
    OtherJobRole.style.visibility = 'visible' ; 
    OtherJobLabel.style.visibility = 'visible' ; 
    }
    else {
    OtherJobRole.style.visibility = 'hidden' ; 
    OtherJobLabel.style.visibility = 'hidden' ; 
    }
});

/*
”T-Shirt Info” section
*/

// Until a Design Theme has been selected, the Design field reads "Select theme".

const shirtDesignOptions = document.querySelectorAll('#design option');

shirtDesignOptions[0].selected =  true ;

// Until a Design Theme has been selected, the Color label and drop down menu are hidden.

const shirtColorSection = document.querySelector('#shirt-colors') ;

shirtColorSection.hidden = true ;

// When a new theme is selected from the "Design" menu, both the "Color" field and drop down menu is updated.

const shirtDesignSelect = document.querySelector('#design');
const shirtColorOptions = document.querySelectorAll('#color option');

shirtDesignSelect.addEventListener('change', (event) => {

  shirtColorSection.hidden = false ;

    if(event.target.value === 'js puns'){
        shirtColorOptions[0].hidden = false ;
        shirtColorOptions[1].hidden = false ;
        shirtColorOptions[2].hidden = false ;
        shirtColorOptions[3].hidden = true ;
        shirtColorOptions[4].hidden = true ;
        shirtColorOptions[5].hidden = true ;
        shirtDesignOptions[0].hidden = true ;
        shirtColorOptions[0].selected =  true ;
    }

    if(event.target.value === 'heart js'){
        shirtColorOptions[0].hidden = true ;
        shirtColorOptions[1].hidden = true ;
        shirtColorOptions[2].hidden = true ;
        shirtColorOptions[3].hidden = false ;
        shirtColorOptions[4].hidden = false ;
        shirtColorOptions[5].hidden = false ;
        shirtDesignOptions[0].hidden = true ;
        shirtColorOptions[3].selected =  true ;
    }
});

/*
”Register for Activities” section
*/

// As a user selects activities, TotalCost is updated and the running total is displayed.

const checkboxes = document.querySelectorAll('.activities input') ;
const activities = document.querySelector('.activities') ;

const RunningTotal = document.createElement('div') ;
activities.appendChild(RunningTotal);
let TotalCost = 0 ;

activities.addEventListener('change', (e) => {

  const clicked = e.target ;
  const clickedDayTime = clicked.getAttribute('data-day-and-time') ;
  const clickedCost = parseInt(clicked.getAttribute('data-cost')) ;

  if(clicked.checked){
    TotalCost += clickedCost ;
}
  else{
    TotalCost -= clickedCost ;
}

RunningTotal.innerText = `The total amount is $${TotalCost}.` ;

// If the checkbox selected has the same day and time as another checkbox, then the other one is disabled and the text color turns to gray.

for(let i = 0 ; i < checkboxes.length ; i ++){
    const checkboxDayTime = checkboxes[i].getAttribute('data-day-and-time') ;
    const checkboxCost = checkboxes[i].getAttribute('data-cost') ;
    if( clickedDayTime === checkboxDayTime && clicked !== checkboxes[i] ){
       
        if(clicked.checked){
            checkboxes[i].disabled = true ;
            checkboxes[i].parentElement.style.color = "gray" ;
        }
        else{
            checkboxes[i].disabled = false ;
            checkboxes[i].parentElement.style.color = "black" ;
        }
    }
}
});

/*
"Payment Info" section
*/

// The payment option selected by default is the credit card. The paypal and bitcoin information texts are thus hidden.

const paymentSelect = document.querySelector('#payment');
const paymentOptions = document.querySelectorAll('#payment option');
paymentOptions[0].hidden =  true ;
paymentOptions[1].selected =  true ;

const creditCardInfo = document.querySelector('#credit-card');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');

creditCardInfo.hidden = false ;
paypalInfo.hidden = true ;
bitcoinInfo.hidden = true ;

// The credit card input field, paypal, and bitcoin texts, are displayed depending on the option selected in the drop down menu.

paymentSelect.addEventListener('change', (e) => {
    
    const clicked = e.target.value ;
    if (clicked === 'paypal') {
        creditCardInfo.hidden = true ;
        paypalInfo.hidden = false ;
        bitcoinInfo.hidden = true ;
    }

    if (clicked === 'bitcoin') {
        creditCardInfo.hidden = true ;
        paypalInfo.hidden = true ;
        bitcoinInfo.hidden = false ;
    }

    if (clicked === 'credit card') {
        creditCardInfo.hidden = false ;
        paypalInfo.hidden = true ;
        bitcoinInfo.hidden = true ;
    }

});

/*
Form validation section
*/

/*
This section creates elements with message errors which are displayed when the input fields are not correctly filled in, upon
submitting the form. The error is also displayed by coloring the borders, or the text, in red.
*/

// Displaying a "Fill in your name" message when the name input field is empty, and coloring the border red.

const nameParent = nameInput.parentElement ;
const nameError = document.createElement('div') ;
nameParent.insertBefore(nameError, nameInput) ;
nameError.textContent = "Fill in your name" ;
nameError.hidden = true ;

const nameValidator = () => {

    if(nameInput.value.length > 0){
      nameInput.style.borderColor = 'white' ;
      nameError.hidden = true ;
      return true ;
    }
    else{
      nameInput.style.borderColor = 'red' ;
      nameError.hidden = false ;
      return false ;
    }
}

// Displaying a "Fill in your email address" message when the email input field is not a valid email address, and coloring the border red.

const email = document.querySelector("#mail");

const emailParent = email.parentElement ;
const emailError = document.createElement('div') ;
emailParent.insertBefore(emailError, email) ;
emailError.textContent = "Fill in your email address" ;
emailError.hidden = true ;

const emailValidator = () => {

   if(/^[^@]+@[^@.]+\.[a-z]{2,3}$/i.test(email.value) === true){
    email.style.borderColor = 'white' ;
    emailError.hidden = true ;
    return true ;
  }
   else{
    email.style.borderColor = 'red ' ;
    emailError.hidden = false ;
    return false ;
  }
}

// The same message error is displayed in real time as long as the email input field is not correctly filled in.

email.addEventListener('keyup', () => {

  if(/^[^@]+@[^@.]+\.[a-z]{2,3}$/i.test(email.value) === true || email.value.length == 0) {
    email.style.borderColor = 'white' ;
    emailError.hidden = true ;
    return true ;
  }
   else{
    email.style.borderColor = 'red ' ;
    emailError.hidden = false ;
    return false ;
  }
})

// Displaying a "Select a least one activity" message as long as no checkbox has been selected in the activities section, and coloring
// the text lines in red.

const activitiesError = document.createElement('div') ;
activities.insertBefore(activitiesError, checkboxes[0].parentElement) ;
activitiesError.textContent = "Select at least one activity" ;
activitiesError.hidden = true ;

const activitiesValidator = () => {

let checkedBoxes = 0 ;

for(let i = 0 ; i < checkboxes.length ; i ++) {

  if(checkboxes[i].checked === true){
      checkedBoxes += 1 ; 
  }
}

if(checkedBoxes > 0) {
  for(let i = 0 ; i < checkboxes.length ; i ++) {
    checkboxes[i].parentElement.style.color = "black  " ;
  }
  activitiesError.hidden = true ;
  return true ;
}
  else {
  for(let i = 0 ; i < checkboxes.length ; i ++) {
  checkboxes[i].parentElement.style.color = "red" ;
}
  activitiesError.hidden = false ;
  return false ;
}

}

// Displaying an error message and coloring the border red if the credit card input field is empty.
// Displaying a second error message and coloring the border red if the credit card number is not a number between 13 and 16 digits.

const creditCardNumber = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const CVV = document.querySelector("#cvv");

const creditCardNumberParent = creditCardNumber.parentElement ;
const creditCardNumberError = document.createElement('div') ;
creditCardNumberParent.insertBefore(creditCardNumberError, creditCardNumber) ;
creditCardNumberError.textContent = "Fill in your credit card number" ;
creditCardNumberError.hidden = true ;

const creditCardNumberErrorB = document.createElement('div') ;
creditCardNumberParent.appendChild(creditCardNumberErrorB) ;
creditCardNumberErrorB.textContent = "Fill a number between 13 and 16 digits" ;
creditCardNumberErrorB.hidden = true ;

const creditCardNumberValidator = () => {

    if (paymentOptions[1].selected = true){

      if(creditCardNumber.value.length == 0){
        creditCardNumber.style.borderColor = 'white' ;
        creditCardNumberError.hidden = false ;
      }
      else {
        creditCardNumber.style.borderColor = 'red' ;
        creditCardNumberError.hidden = true ;
      } ;

      if(/^[0-9]{13,16}$/.test(creditCardNumber.value) === true){
        creditCardNumber.style.borderColor = 'white' ;
        creditCardNumberErrorB.hidden = true ;
        return true ;
      }
      else {
        creditCardNumber.style.borderColor = 'red' ;
        creditCardNumberErrorB.hidden = false ;
        return false ;
      } ;

    }
  }

// Displaying an error message and coloring the border red if the zip code is not a 5 digits number.

const zipCodeParent = zipCode.parentElement ;
const zipCodeError = document.createElement('div') ;
zipCodeParent.insertBefore(zipCodeError, zipCode) ;
zipCodeError.textContent = "Fill in your zip code" ;
zipCodeError.hidden = true ;

const zipCodeValidator = () => {

        if (paymentOptions[1].selected = true){

      if(/^[0-9]{5}$/.test(zipCode.value) === true){
        zipCode.style.borderColor = 'white' ;
        zipCodeError.hidden = true ;
        return true ;
      }
      else {
        zipCode.style.borderColor = 'red' ;
        zipCodeError.hidden = false ;
        return false ;
      } ;
    }
 }

 // Displaying an error message and coloring the border red if the CVV is not a 3 digits number.

const CVVParent = CVV.parentElement ;
const CVVError = document.createElement('div') ;
CVVParent.insertBefore(CVVError, CVV) ;
CVVError.textContent = "Fill in your CVV" ;
CVVError.hidden = true ;

const CVVValidator = () => {

        if (paymentOptions[1].selected = true){
          
      if(/^[0-9]{3}$/.test(CVV.value) === true){
        CVV.style.borderColor = 'white' ;
        CVVError.hidden = true ;
        return true ;
      }
      else {
        CVV.style.borderColor = 'red' ;
        CVVError.hidden = false ;
        return false ;
      } ;
    }
  }

// Creating an event on the "Register" button, so that, when clicked, it checks for errors in the sections above.

const form = document.querySelector('form') ;

form.addEventListener('submit', (e) => {

  if(!nameValidator()) {
    e.preventDefault() ;
  }

  if(!emailValidator()) {
    e.preventDefault() ;
  }

  if(!activitiesValidator()) {
    e.preventDefault() ;
  }

  if (paymentOptions[1].selected = true) {

    if(!creditCardNumberValidator()) {
      e.preventDefault() ;
    }

    if(!zipCodeValidator()) {
      e.preventDefault() ;
    }

    if(!CVVValidator()) {
      e.preventDefault() ;
    }
}

});