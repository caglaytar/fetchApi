const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const bookList = document.getElementById("bookList");
const addButton = document.getElementById("addBook");
const title = document.getElementById("bookTitle");

async function getBook() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        displayBooks(books);
    } catch (e) {
        console.error("Error:", e);
        bookList.innerHTML = "<h1>Hata oluştu!</h1>";
    }
}

function displayBooks(books) {
    bookList.innerHTML = "";
    books.forEach(element => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-item";

        const bookTitle = document.createElement("span");
        bookTitle.textContent = element.title;

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteBookItem(element.id);
        });

        bookItem.appendChild(bookTitle);
        bookItem.appendChild(deleteButton);
        bookList.appendChild(bookItem);
    });
}

addButton.addEventListener("click", async () => {
    const titleValue = title.value.trim();
    if (!titleValue) {
        alert("Title alanı boş bırakılamaz!");
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: titleValue })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newBook = await response.json();
        alert(`Kitap eklendi: ${newBook.title}`);
        title.value = "";
        getBook();
    } catch (err) {
        console.error("Error:", err);
        alert("Bir hata oluştu!");
    }
});

// Delete book
async function deleteBookItem(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Kitap silindi!");
        getBook();
    } catch (err) {
        console.error("Error:", err);
        alert("Bir hata oluştu!");
    }
}

getBook();
