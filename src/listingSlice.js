import { createSlice } from '@reduxjs/toolkit'
export const ListingSlice = createSlice({
  name: 'listing',
  initialState: {
    listing: [],
    title: '',
    headings: [],
    keys: [],
    url: '',
    page: 0,
    dataKey: '',
    totalRecord: 0,
    searchError:false,
    searchFilter:''
  },
  reducers: {
    setHeadings: (state, action) => {
      state.headings = action.payload
    },
    setKeys: (state, action) => {
      state.keys = action.payload
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setListing: (state, action) => {
      state.listing = action.payload
    },
    setUrl: (state, action) => {
      state.url = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setData: (state, action) => {
      state.dataKey = action.payload
    },
    setTotal: (state, action) => {
      state.totalRecord = action.payload
    },
    setSearchError:(state,action)=>{
      state.searchError = action.payload
    },
    setSerachFilter:(state,action) =>{
      state.searchFilter = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setListing, setTitle, setHeadings, setKeys, setUrl, setPage, setData, setTotal, setSearchError, setSerachFilter } = ListingSlice.actions

export default ListingSlice.reducer