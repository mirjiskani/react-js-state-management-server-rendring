import { useEffect } from 'react';
import Listing from "./Listing"
import { useDispatch } from 'react-redux'
import { setListing, setTitle, setHeadings, setKeys, setPage, setUrl, setData, setTotal } from './listingSlice';
import axios from 'axios';
export default function Users() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Get request using axios inside useEffect React hook
        axios.get('https://dummyjson.com/users?limit=10&skip=10')
            .then((response) => {
                dispatch(setHeadings(['First Name', 'Last Name', 'Email', 'Age', 'Phone', 'Gender']))
                dispatch(setKeys(['firstName', 'lastName', 'email', 'age', 'phone', 'gender']))
                dispatch(setTitle('User Listing'))
                dispatch(setListing(response.data.users))
                dispatch(setUrl('https://dummyjson.com/users'))
                dispatch(setPage(1))
                dispatch(setData('users'))
                dispatch(setTotal(response.data.tatal))
            }).catch(error => console.log(error))
    }, []);
    return (
        <>
            <Listing></Listing>
        </>
    )

}