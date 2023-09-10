import { useEffect } from 'react';
import Listing from "./Listing"
import { useDispatch } from 'react-redux'
import { setListing, setTitle, setHeadings, setKeys, setPage, setUrl, setData, setTotal } from './listingSlice';
import axios from 'axios';

export default function Products() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Get request using axios inside useEffect React hook
        axios.get('https://dummyjson.com/products?limit=10&skip=10')
            .then((response) => {
                dispatch(setHeadings(['Title', 'Description', 'Brand', 'Category', 'Rating']))
                dispatch(setKeys(['title', 'description', 'brand', 'category', 'rating']))
                dispatch(setTitle('Product Listing'))
                dispatch(setListing(response.data.products))
                dispatch(setUrl('https://dummyjson.com/products'))
                dispatch(setPage(1))
                dispatch(setData('products'))
                dispatch(setTotal(response.data.tatal))
            }).catch(error => console.log(error))
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    return (
        <>
            <Listing></Listing>
        </>
    )
}