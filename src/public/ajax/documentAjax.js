$(document).ready(function() {
   
    // Save button
    $('#saveBtn').click(function() {
        // Get the docId from the query string
        const urlParams = new URLSearchParams(window.location.search);
        const docId = urlParams.get('id'); // Get docId from the query parameter
        
        const content = $('#editor').val();  
     
        if (!docId)
        {
            alert('Document id is not found');
            return;
        }
        // console.log(docId, content);
        // ajax call for save the document
        $.ajax({
            type: 'POST',
            url: '/api/document/save-document',
            contentType: 'application/json',  // Set the Content-Type to application/json
            data: JSON.stringify({
                docId: docId,
                content: content,
            }),
            success: function(response) {
                alert('Document saved successfully');
            },
            error: function(error) {
                alert('Error while saving the document');
            }
        })
    });
   
    // show all documents
    $('#createDocBtn').click(function(e) {
        e.preventDefault(); // prevent <a href=""> default behavior

        $.ajax({
            type: 'POST',
            url: '/api/document/create',
            success: function(response) {
                if (response.document && response.document.docId) {
                    const newDocId = response.document.docId;
                    let newDocUrl = 'index.html?id=' + newDocId;
                    window.location.href = newDocUrl; // redirect
                } else {
                    alert('Error: Document not created properly');
                }
            },
            error: function(error) {
                console.log(error);
                alert('Error while creating the document');
            }
        });
    });

})