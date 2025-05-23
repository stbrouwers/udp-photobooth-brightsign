async function fetchFiles() {
    try {
        const response = await fetch('http://localhost:3000/get-files');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error loading files:', err);
        return [];
    }
}

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