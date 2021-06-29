import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider, Typography,
    Toolbar,
} from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import useGenre from './../../hooks/useGenre';
import CustomPagination from "../../components/Pagination/CustomPagination";
import Singlecontent from './../../components/Singlecontent';

const useStyles = makeStyles({
    pageTitle: {
        marginTop: '30px',
        justifyContent: 'center',
        backgroundColor: '#483d8b',

    }
})

const Search = () => {


    const [type, setType] = useState(0);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [content, setContent] = useState();
    const [numofpages, setNumofpages] = useState();

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#fff',
            },
        },
    })

    const classes = useStyles();

    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`);

        console.log(data)
        setContent(data.results)
        setNumofpages(data.total_pages)

    }

    useEffect(() => {
        window.scroll(0, 0)
        fetchSearch()
    }, [type, page])


    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <Toolbar variant='dense' className={classes.pageTitle}
                >
                    <Typography variant='h4'>
                        Search
                </Typography> </Toolbar>

                <div style={{ display: 'flex', margin: '15px 0' }}>
                    <TextField style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearch(e.target.value)} />
                    <Button variant='contained' onClick={fetchSearch}>
                        <SearchIcon />
                    </Button>


                </div>

                <Tabs value={type} indicatorColor='primary' textColor='primary' onChange={(event, newValue) => {
                    setType(newValue)
                    setPage(1)
                }} style={{ paddingBottom: 5 }}>

                    <Tab style={{ width: '50%' }} label='Search Movies' />
                    <Tab style={{ width: '50%' }} label='Search TV Series' />
                </Tabs>


                <div className='trending'>


                    {
                        content && content.map((c) => {
                            return <Singlecontent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_data || c.release_date} media_type={type ? 'tv' : 'movie'} vote_average={c.vote_average} />
                        })
                    }
                    {
                        search && !content && (type ? <h2>no moseries</h2> : <h2>no moseries</h2>)
                    }

                </div>

                {
                    numofpages > 1 && (
                        <CustomPagination setPage={setPage} numofPages={numofpages} />)
                }





            </ThemeProvider>

        </div >
    )
}

export default Search;
