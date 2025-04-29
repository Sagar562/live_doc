const socket = io('http://localhost:4000');


const params = new URLSearchParams(window.location.search);
const documentId = params.get('id'); // example: ?id=4

if (!documentId) {
    alert('No document ID provided in URL!');
    throw new Error('Document ID missing.');
}


$(document).ready(function() {
    // Join document room
    socket.emit('join-document', documentId);

    // Receive initial document content
    socket.on('document', (content) => {
        $('#editor').val(content);
    });

    // Send changes when typing
    $('#editor').on('input', function() {
        const delta = $(this).val();
        socket.emit('changed-document', delta);
    });

    // Receive changes from others
    socket.on('updated-document', (delta) => {
        $('#editor').val(delta);
    });

  

    // Load button (optional, reload manually from API)
    $('#loadBtn').click(function() {
        $.get(`/api/documents/${documentId}`, function(data) {
            $('#editor').val(data.content);
        });
    });
});
