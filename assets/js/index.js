// initialize events
const tbody = document.getElementById('tbody');
// fetch all data
const loadAllData = async () => {
    const data = await fetch(`http://localhost:4000/books`);
    const books = await data.json();

    // map books
    books.map(book => {
        tbody.innerHTML += `
        <tr>
            <td>${book.name}</td>
            <td>$${book.price}</td>
            <td>${book.author}</td>
            <td>
                <button onclick='loadItem("${book._id}")' class="btn edit">EDIT</button>
                <button onclick='deleteItem(event, "${book._id}")' class="btn delete">DELETE</button>
            </td>
      </tr>
        `
    })
}
loadAllData();


// delete item form mongoDB
const deleteItem = (event, id) => {
    fetch(`/delete/${id}`, {
        method:'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if(data){
            event.target.parentNode.parentNode.style.display='none';
        }
    })
}


      // show data using id for update
      const loadItem = (id) => {
        document.querySelector('.modal').style.display = 'block';
        fetch(`/books/${id}`)
        .then(res => res.json())
        .then(book => {
            document.getElementById('updateForm').innerHTML = `
            <div class='modal-content'>
            <div class="close-flex">
                <h3>Do Change</h3>
                <button onclick="closeModal()" class="close">&times;</button>
            </div>
                <div class="inputs">
                <input id='name' type='text' value='${book.name}' />
                <input id='price' type='text' value='${book.price}' />
                <input id='author' type='text' value='${book.author}' />
                <button onclick="updateItem('${book._id}')">Update</button>
                </div>
            </div>
            `

        })

    }



    // update item
    const updateItem = (id) => {

        const name = document.getElementById('name').value ;
        const price = document.getElementById('price').value ;
        const author = document.getElementById('author').value ;
        const bookDetails = {name, price, author};
        fetch(`/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;',
            },
            body: JSON.stringify(bookDetails)

        })
        .then((res) => res.json())
        .then(data => {
            if(data){
                console.log(data)
            }
        });

        document.querySelector('.modal').style.display='none';

    }


// ====================== close modal
// with close btn
const closeModal =()=>{
    document.querySelector('.modal').style.display ='none';
}


// window
window.onclick = function(event) {
    const modal = document.querySelector('.modal') ;
  if (event.target == modal) {
    modal.style.display = "none";
  }
}