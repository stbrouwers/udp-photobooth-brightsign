function setContent(id) {
    sendUDP(`return`);
    sendUDP(`set_content_${id}`);
}

function sendUDP(command) {
    fetch(`http://localhost:3000/send/${command}`)
      .then(response => response.text())
      .then(text => console.log(text))
      .catch(err => console.error('Error:', err)
    );
}