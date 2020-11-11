function getBooks(){
    const allBooksApiUrl = "https://localhost:5001/api/books";

    fetch(allBooksApiUrl).then(function(response){
        return response.json();
    }).then(function(json){
        let html = "<table style=\"width:100%\">";
        html += "<tr><th>Book Title</th><th>Book Author</th><th>Delete</th></tr>"
        json.forEach((book)=>{
            html += "<tr key= "+book.id + "><td>" + book.title + 
            "</td><td>" + book.author + "</td>" +
            "<td><button onClick = \"removeBook("+book.id+")\">Delete</button></td></tr>";
        });
        html += "</table>";
        document.getElementById("books").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}


function postBook(){
    const postBookApiUrl = "https://localhost:5001/api/books";
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;

    fetch(postBookApiUrl, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            title: bookTitle,
            author: bookAuthor
        })
    })
    .then((response)=>{
        console.log(response);
        getBooks();
    })

}

function removeBook(id){
    const deleteBookApiUrl = "https://localhost:5001/api/books/"+id;

    fetch(deleteBookApiUrl, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
    })
    .then((response)=>{
        console.log(response);
        getBooks();
    })

}