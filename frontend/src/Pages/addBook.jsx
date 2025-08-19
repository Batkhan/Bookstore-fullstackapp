import React,{ useState } from "react";
import axios from "axios";


const AddBook = () => {
    const [form,setform] = useState({
        title: '',
        genre: '',
        author: '',
        description: '',
        publisher: '',
        pages: '',
        image_url: '',
        price: '',
        publisher_year: '',
    });
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('api/books', form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Book added successfully');
        }
        catch(err) {
            console.error(err)
            alert('failed to add book');
        }
    };

return (
    <div className = 'add-book'>
        <h2>Add new Book</h2>
        <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" value={form.title} onChange={handlechange} required />

        <label>Author</label>
        <input type="text" name="author" value={form.author} onChange={handlechange} required />

        <label>Genre</label>
        <input type="text" name="genre" value={form.genre} onChange={handlechange} />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handlechange} />

        <label>Image URL</label>
        <input type="text" name="image_url" value={form.image_url} onChange={handlechange} />

        <label>Price</label>
        <input type="number" step="any" name="price" value={form.price} onChange={handlechange} />

        <label>Pages</label>
        <input type="number" name="pages" value={form.pages} onChange={handlechange} />

        <label>Publish Year</label>
        <input type="number" name="publisher_year" value={form.publisher_year} onChange={handlechange} />

        <label>Publisher Name</label>
        <textarea name="publisher" value={form.publisher} onChange={handlechange} />

        <button type="submit">Add Book</button>
      </form>
    </div>
);
};
export default AddBook;
