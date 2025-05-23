let selectedBtn = null

let files = null;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('confirmationbutton').addEventListener("click", function() {
        setContent(selectedBtn.dataset.cid);
    });
});

const icons = {
    image: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M448 80c8.8 0 16 7.2 16 16l0 319.8-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3L48 96c0-8.8 7.2-16 16-16l384 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>`,
    video: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM48 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM48 112l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16L64 96c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM160 128l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32L192 96c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0z"/></svg>`
};

async function init() {
    files = await fetchFiles();
    createSelectorButtons();
}

function createSelectorButtons() {
    const container = document.getElementById('buttoncontainer');
    files.forEach(file => {
        const btn = document.createElement('button');

        btn.textContent = processFileName(file, 'name');
        btn.dataset.path = file;
        btn.dataset.extension = processFileName(file, 'extension');
        btn.dataset.cid = file.charAt(0);
        btn.classList.add("defaultbtn", "selectorbutton");
        btn.addEventListener("click", function() {
            setButtonState(this);
            selectedBtn = this;
            const cid = this.dataset.cid;
            loadPreview(this);
        });

        let icon = null;
        switch (btn.dataset.extension) {
            case 'jpg':
                icon = icons.image;
                break;

            case 'png':
                icon = icons.image;
                break;

            case 'mp4':
                icon = icons.video;
                break;
        }

        btn.innerHTML += `<span class="btn-file-ext">${icon}</span>`
        container.appendChild(btn);
    });
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
    let element = null;
    switch (btn.dataset.extension) {
        case 'jpg':
            element = document.createElement('img');
            break;

        case 'png':
            element = document.createElement('img');
            break;

        case 'mp4':
            element = document.createElement('video');
            element.controls = true;
            break;
    }

    element.src = `../content/${btn.dataset.path}`
    element.classList.add("dynamic-preview-obj");
    container.appendChild(element);
}