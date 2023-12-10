var selectedInput;
const txtSave = [];
const txtDisplay = [];
let index = 0;

function addTextInput() {
    var inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'draggable';
    inputField.placeholder = 'Enter text...';
    inputField.draggable = true;
    inputField.addEventListener('dragstart', function (event) {
        drag(event);
    });

    inputField.addEventListener('focus', function () {
        selectedInput = this;
    });

    inputField.addEventListener('change', function(){
        txtDisplay.push(inputField.value);
    });

    var textBox = document.getElementById('textBox');
    textBox.appendChild(inputField);

    makeDraggable(inputField);

}

function makeDraggable(element) {
    var offsetX, offsetY, isDragging = false;

    element.addEventListener('mousedown', function (event) {
        isDragging = true;
        var rect = element.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
    });

    document.addEventListener('mousemove', function (event) {
        if (isDragging) {
            var x = event.clientX - offsetX;
            var y = event.clientY - offsetY;

            element.style.left = x + 'px';
            element.style.top = y + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
}


function drag(event){
    event.dataTransfer.setData('text/plain',event.target.id);
}

function changeFontStyle(){
    if (selectedInput){
        var selectedFont=document.getElementById('fontList').value;
        selectedInput.style.fontFamily=selectedFont;
    }
}

function changeFontSize(){
    if (selectedInput){
        var fontSize=document.getElementById('FontSize').value;
        selectedInput.style.fontSize=fontSize+'px';
    }
}

function changeFontColor(){
    if (selectedInput){
        var fontColor=document.getElementById('FontColor').value;
        selectedInput.style.color=fontColor;
    }
}

function undoText(){
    if(txtDisplay.length > 0){
        let text=txtDisplay.pop();
        selectedInput.value = text;
        txtSave.push(text);
    }
    console.log("undo text Display"+txtDisplay);
    console.log("undo save Display"+txtSave);
}

function redoText() {
    if (txtSave.length > 0) {
        let text=txtSave.pop();
        selectedInput.value = text;
        txtDisplay.push(text);
        console.log("Rendo text Display"+txtDisplay);
        console.log("Rndo save Display"+txtSave);
    }
}


