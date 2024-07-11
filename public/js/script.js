document.addEventListener("DOMContentLoaded", function() {

let addIngridientsBtn = document.getElementById('addIngridientsBtn');
let ingridientList = document.querySelector('.ingridientList');
let ingridientDiv = document.querySelectorAll('.ingridientDiv')[0];



if (addIngridientsBtn && ingridientList && ingridientDiv) {
addIngridientsBtn.addEventListener('click',function(){
    let newIngridients = ingridientDiv.cloneNode(true);
    let input =  newIngridients.getElementsByTagName('input')[0];
    input.value = '';
    ingridientList.appendChild(newIngridients);
});
} else {
    console.error("One or more elements not found");
}

});