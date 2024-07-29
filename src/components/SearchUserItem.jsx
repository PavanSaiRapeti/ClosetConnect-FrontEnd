import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserItemRequest } from '../store/actions/searchActions';
import ReactPaginate from 'react-paginate';

const SearchUserItem = () => {
    const [userId, setUserId] = useState('');
    const [itemName, setItemName] = useState('');
    const [size, setSize] = useState('');
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(state => state.search);

    const handleSearch = () => {
        dispatch(searchUserItemRequest({ itemName, size, page }));
    };

    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected);
        dispatch(searchUserItemRequest({ userId, itemName, size, page: selectedPage.selected }));
    };

    return (
        <div>
            <h1>Search User Item</h1>
            <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <div>
                    <h2>Results:</h2>
                    <pre>{JSON.stringify(data.items, null, 2)}</pre>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={data.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchUserItem;