import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Singlecontent from './../../components/Singlecontent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres';
import useGenre from '../../hooks/useGenre';
import { AppBar, Button, createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { SearchIcon } from '@material-ui/icons/Search';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';





const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#fff',
        },
    },
})
const useStyles = makeStyles({
    pageTitle: {
        marginTop: '30px',
        justifyContent: 'center',
        backgroundColor: '#483d8b',

    }
})

const Movies = () => {
    const classes = useStyles();

    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])
    const [numofpages, setnumofPages] = useState()
    const [selectedGeneres, setSelectedGeneres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenre(selectedGeneres);





    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&with_watch_monetization_types=flatrate`)




        console.log(data);
        setContent(data.results)
        setnumofPages(data.total_pages)
    }

    useEffect(() => {
        fetchMovies();
    }, [page, genreforURL]);


    return (

        <ThemeProvider theme={darkTheme}>

            <Toolbar variant='dense' className={classes.pageTitle}
            >
                <Typography variant='h4'>
                    Movies
                </Typography> </Toolbar>


            <Genres type='movie' selectedGeneres={selectedGeneres} setSelectedGeneres={setSelectedGeneres} setGenres={setGenres} setPage={setPage} genres={genres} page={page} />

            <div className='trending'>


                {
                    content && content.map((c) => {
                        return <Singlecontent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_data || c.release_date} media_type={c.media_type} vote_average={c.vote_average} />
                    })
                }

            </div>

            {
                numofpages > 1 && (
                    <CustomPagination setPage={setPage} numofPages={numofpages} />)
            }


        </ThemeProvider >



    )
}

export default Movies;
