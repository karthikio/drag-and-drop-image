let inputFile = document.getElementById('input-file');
let dropZoneElement = inputFile.closest('#drop-zone');
let dropZone = document.getElementById('drop-zone');
let inputForm = document.getElementById('input-form');
let display = document.querySelector('.drop-zone-display');

let content = document.querySelector('.content');


// renders the dropped file on the screen
function updataContent(file){
  if(file.type.startsWith("image/")){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      content.innerHTML = `
      <img width="500px" src="${fileReader.result}" alt="">
      <p>${inputFile.files[0].name}</p>
      `;
      display.innerHTML = "<h4>Image Added</h4> <h6>Success!</h6>";
    }
  }else{
    display.innerHTML = "<h4>File is not supported.</h4> <h6>Try to upload only images</h6>";
    inputForm.reset();
  }
}

// click upload event
dropZoneElement.addEventListener('click', e => {
  inputFile.click();
  inputFile.onchange = function(e){
    if(inputFile.files){
      updataContent(inputFile.files[0]);
    }
  }
})


// drag and drop functionality
dropZoneElement.addEventListener('drop', e => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  updataContent(inputFile.files[0]);
})

dropZoneElement.addEventListener('dragover', e => {
  e.preventDefault();
})


dropZoneElement.addEventListener('dragenter', e => {
  e.preventDefault();
  if(dropZone.className == 'dropzone'){
    dropZone.classList.remove('dropzone');
    dropZone.classList.add('zone-dragenter');
    display.innerHTML = "<h4>Drop your file</h4>"
  }
})


dropZoneElement.addEventListener('dragleave', e => {
  e.preventDefault();
  if(dropZone.className == 'zone-dragenter'){
    dropZone.classList.remove('zone-dragenter');
    dropZone.classList.add('dropzone');
    display.innerHTML = "<h4>Drag and Drop</h4> <h6>Only Images</h6>";
  }
})
