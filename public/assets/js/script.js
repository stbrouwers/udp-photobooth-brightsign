let selectedBtn = null

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('confirmationbutton').addEventListener("click", function ()  {
        setImage(selectedBtn.dataset.cid);
    });
});

fetch('http://localhost:3000/get-files')
  .then(response => response.json())
  .then(files => {
    const container = document.getElementById('buttoncontainer');
    files.forEach(file => {
        const btn = document.createElement('button');
        
        btn.textContent = processFileName(file, 'name');
        btn.dataset.path = file;
        btn.dataset.extension = processFileName(file, 'extension');
        btn.dataset.cid = file.charAt(0);
        btn.classList.add("defaultbtn", "selectorbutton");
        btn.addEventListener("click", function () {
            setButtonState(this);
            selectedBtn = this;
            const cid = this.dataset.cid;
            loadPreview(this);
    });
        container.appendChild(btn);
    });
  })
.catch(err => console.error('Error loading files:', err));

function processFileName(file, type) {
    file = file.slice(3); // help
    const fileParts = file.split('.');
    const fileName = fileParts.slice(0, -1).join('.');
    const fileExtension = fileParts[fileParts.length - 1]; 

    const TruncatedFile = fileName.length > 30 ? file.substring(0, 30) + '...' : fileName;

    if (type == 'extension') {
        return fileExtension;
    }
    return TruncatedFile;
}

function setButtonState(btn) {
    btn.classList.add("button-active");

    if (selectedBtn) {
        selectedBtn.classList.remove("button-active")
    } 
}

function loadPreview(btn) {
    document.getElementById('confirmationbutton').classList.remove('hidden');
    const container = document.getElementById('preview');
    container.innerHTML = '';
    console.log(btn.dataset.extension);
    let element = null
    switch(btn.dataset.extension) {
        case 'png':
            element = document.createElement('img');
            element.src = `../content/${btn.dataset.path}`
            break;

        case 'mp4':
            break;
    }
    container.appendChild(element);
}

function setImage(id) {
    sendUDP(`return`);
    sendUDP(`set_image_${id}`);
}

function sendUDP(command) {
    fetch(`http://localhost:3000/send/${command}`)
      .then(response => response.text())
      .then(text => console.log(text))
      .catch(err => console.error('Error:', err)
    );
}