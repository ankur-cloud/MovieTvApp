import { Divider } from '@material-ui/core';
import { Chip, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';



const Genres = ({ setPage, page, type, selectedGeneres, setSelectedGeneres, genres, setGenres }) => {


    const handleAdd = (genre) => {
        setSelectedGeneres([...selectedGeneres, genre]);
        setGenres(
            genres.filter((zge) => zge.id !== genre.id));
        setPage(1);

    }
    const handleRem = (genre) => {
        setSelectedGeneres(
            selectedGeneres.filter((zgee) => zgee.id !== genre.id));
        setGenres([...genres, genre]);

        setPage(1);

    }

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)


        setGenres(data.genres)
        // console.log(data);


    }

    // console.log(genres)


    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres({});
        }
    }, [page])


    return (
        <Grid item>
            {selectedGeneres && selectedGeneres.map((genre) => {
                return <Chip label={genre.name} style={{ margin: 2 }} clickable size='small' color='primary' key={genre.id} color='primary' onDelete={() => handleRem(genre)} />
            })}
            <Divider />

            {genres && genres.map((genre) => {
                return <Chip label={genre.name} style={{ margin: 2, color: '#fff' }} clickable size='small' key={genre.id} onClick={() => handleAdd(genre)} />
            })}

        </Grid>

    )
}

export default Genres
