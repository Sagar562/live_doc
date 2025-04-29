$(document).ready(function() {
   
    // Save button
    $('#saveBtn').click(function() {
        // Get the docId from the query string
        const urlParams = new URLSearchParams(window.location.search);
        const docId = urlParams.get('id'); // Get docId from the query parameter
        
        const title = $('#titleId').val();
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
                title: title,
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

    // load the content
    const docId = new URLSearchParams(window.location.search).get('id');
    if (docId) {
        $.ajax({
            type: 'GET',
            url: `/api/document/${docId}`,
            success: function(response) {
                if (response.success) {
                    $('#titleId').val(response.document.title);
                    $('#editor').val(response.document.content); // Populate the editor
                } else {
                    alert(response.message);
                }
            },
            error: function(err) {
                console.error(err);
                // alert('Failed to load the document');
                window.location.href = 'not-found.html';
            }
        });
    }
})  