import { configureStore } from '@reduxjs/toolkit'
import listingReducer from './listingSlice'

export default configureStore({
    reducer: {
        listing: listingReducer,
    },
}) 