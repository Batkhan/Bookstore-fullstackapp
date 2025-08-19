import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
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
        const {id} = useParams();
        const Navigate = useNavigate();
        // Fetch existing book data
        useEffect(() => {
            const fetchBook = async() => {
            try{
                const res = await axios.get(`/api/books/${id}`);
                console.log("API Response:", res.data); // 🔍 Check data here
                const b = res.data;
                setform({
                title: b.title || '',
                genre: b.genre || '',
                author: b.author || '',
                description: b.description || '',
                publisher: b.publisher || '',
                pages: b.pages || '',
                image_url: b.image_url || b.imageUrl || '',
                price: b.price || '',
                publisher_year: b.publisher_year || b.publisherYear || ''
                });

            }
            catch(err) {
                console.error('Error...failed to fetch existing book,check the id', err);
            }
            };
            fetchBook();
        },[id]);
        const handlechange = (e) => {
            setform({ ...form, [e.target.name]: e.target.value });
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                await axios.put(`/api/books/${id}`, form, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            alert('Book uploaded Successfully');
            Navigate('/api/books');
            }
            catch(error) {
                console.error('Book has issue uploading,pls check again', error);
                alert('failed to update book');
            } };

    return (
        <div className = 'add-book'>
            <h2>Edit Books Here</h2>
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

            <button type="submit">Update Book here</button>
        </form>
        </div>
    );
    };
export default EditBook;