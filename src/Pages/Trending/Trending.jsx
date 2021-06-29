import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Singlecontent from '../../components/Singlecontent';
import './Trending.css'
import '../../App.css'
import CustomPagination from '../../components/Pagination/CustomPagination';
import { makeStyles, Toolbar, Typography } from '@material-ui/core';


const useStyles = makeStyles({
    pageTitle: {
        marginTop: '30px',
        justifyContent: 'center',
        backgroundColor: '#483d8b',

    }
})

const Trending = () => {

    const classes = useStyles()




    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    const fetchTrend = async () => {

        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        setContent(data.results);


    }

    useEffect(() => {
        fetchTrend();
    }, [page])



    return (
        <div>
            <Toolbar variant='dense' className={classes.pageTitle}
            >
                <Typography variant='h4'>
                    Trending
                </Typography> </Toolbar>
            <div className='trending'>
                {
                    content && content.map((c) => {
                        return <Singlecontent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_data || c.release_date} media_type={c.media_type} vote_average={c.vote_average} />
                    })
                }

            </div>
            <CustomPagination setPage={setPage} />
        </div >
    )
}

export default Trending;
