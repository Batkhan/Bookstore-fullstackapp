import {Routes, Route} from 'react-router-dom';

<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add" element={<AddBook />} />
    <Route path="/edit/:id" element={<EditBook />} />
</Routes>