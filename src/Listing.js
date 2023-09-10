import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector, useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { setListing, setPage, setSearchError, setSerachFilter } from './listingSlice';
import Alert from 'react-bootstrap/Alert';

export default function Listing() {
    let listing = useSelector((state) => state.listing.listing)
    const title = useSelector((state) => state.listing.title)
    const tHeading = useSelector((state) => state.listing.headings)
    const Keys = useSelector((state) => state.listing.keys)
    let page = useSelector((state) => state.listing.page)
    const url = useSelector((state) => state.listing.url)
    const total = useSelector((state) => state.listing.totalRecord)
    const dataKey = useSelector((state) => state.listing.dataKey)
    const lastPage = total / 10;
    const limit =10;
    const dispatch = useDispatch();
    let searchError = useSelector((state)=>state.listing.searchError)
    let sFilter =  useSelector((state)=>state.listing.searchFilter)
    const headingColor = {
        backgroundColor: "#c0e3e5",
        color: "#322625",
        width: '20',
    }
    const tableMargin = {
        marginLeft: 10
    }
    const titleStyle = {
        marginLeft: 10
    }
    const input = {
            borderRadius: 25,
            border: "2px solid #73AD21",
            padding: 20,
            width: 200,
            height: 30,
            marginTop:10,
            marginLeft:40
    }

    const handlepagination = async ()=>{
        page = page+1;
        let skip =  10*page
        const result = await axios.get(url+'?limit='+limit+'&skip='+skip)
        .then(response => response.data).catch(error => console.log(error))   
        listing = result[dataKey]
        dispatch(setPage(page))
        dispatch(setListing(listing))
    }
    const handlebackpagination =async ()=>{
        if(page > 1){
            page = page-1;
            let skip =  10*page
            const result = await axios.get(url+'?limit='+limit+'&skip='+skip)
            .then(response => response.data).catch(error => console.log(error))   
            listing = result[dataKey]
            dispatch(setPage(page))
            dispatch(setListing(listing))
        }
    }
    const handlefirstpagination = async()=>{
        page = 1;
        let skip =  10
        const result = await axios.get(url+'?limit='+limit+'&skip='+skip)
        .then(response => response.data).catch(error => console.log(error))   
        listing = result[dataKey]
        dispatch(setPage(page))
        dispatch(setListing(listing))
    }
    const handlefilter= (ev)=>{
        let filtr = ev.target.value
       dispatch(setSerachFilter(filtr))
       dispatch(setSearchError(false))
    }
    const applySearch = async (event)=>{
        let searchInput = event.target.value
        if(sFilter !=''){
            if(searchInput == ""){
                let skip =  10*1
                const result = await axios.get(url+'?limit='+limit+'&skip='+skip)
                .then(response => response.data).catch(error => console.log(error))   
                listing = result[dataKey]
                dispatch(setPage(1))
                dispatch(setListing(listing))
            }else{
                const result = await axios.get(url+'?key='+sFilter+'&value='+searchInput)
                .then(response => response.data).catch(error => console.log(error))   
                listing = result[dataKey]
                dispatch(setPage(1))
                dispatch(setListing(listing))
           }
            // key=hair.color&value=Brown
        }else{
            dispatch(setSearchError(true))
            setTimeout(() => {
                dispatch(setSearchError(false))
            }, 10000);
        }
    }
    const setShow=(ev)=>{
        dispatch(setSearchError(false))
    }
    return (
              <>
  {searchError && <Alert Style={{padding:30}} variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Please select filter first.
        </p>
      </Alert>}
            <div style={{ display: "flex", justifyContent: "left", marginBottom:20, marginTop:10  }}>
          
                <h1 style={titleStyle}>{title}</h1>
                 <input type='text' style={input} name='search' placeholder='Search' onChange={applySearch}></input>
                 <h6 style={{marginTop:20, marginLeft:10}}> Select radio and type in serach </h6>
                    {
                        tHeading.map((heading,index)=>{
                            return (
                                <Form.Check style={{marginLeft:20, marginTop:20}} type='radio' id={Keys[index]}>
                                <Form.Check.Input type='radio' value={Keys[index]} name="filter" onChange={handlefilter}/>
                                <Form.Check.Label>{heading}</Form.Check.Label>
                              </Form.Check>
                            )
                        })
                    }
            </div>
        
            <Table responsive style={tableMargin}>
                <thead>
                    <tr>
                        {tHeading.map((value, index) => (
                            <th style={headingColor} key={index}>{value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {listing.map((value, index) => {
                        return (<tr>
                            {
                                Keys.map((_field, key) => {
                                    return(<td>{value[_field]}</td>)
                               })
                            }
                        </tr>)
                    })}

                </tbody>
            </Table>  
            <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination>
                <Pagination.First onClick={handlefirstpagination}/>
                <Pagination.Prev onClick={handlebackpagination}/>
                {page == 0 && <Pagination.Ellipsis /> }
                <Pagination.Item>{page}</Pagination.Item>
                {lastPage > total && <Pagination.Ellipsis /> }
                <Pagination.Next onClick={handlepagination}/>
                <Pagination.Last onClick={handlepagination}/>
            </Pagination>
            </div>
            </>
    );
}