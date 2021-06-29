import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500 } from '../../config/config';
import { unavailable, unavailableLandscape } from './../../config/config';
import { SearchIcon } from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './Contentmodal.css'
import Caraosel from '../Caraosel/Caraosel'


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#39445a',
        border: '2px solid #282c34',
        borderRadius: 10,
        color: 'white',
        width: '90%',
        height: '80%',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 2),
    },
}));

export default function Contentmodal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [video, setVideo] = useState();
    const [content, setContent] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };




    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        // console.log(data)

        setContent(data)
    }


    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        // console.log(data.results)

        setVideo(data.results[0]?.key);
    }


    useEffect(() => {
        fetchData();
        fetchVideo();
    }, [])

    return (
        <>
            <div type="button" className='media' onClick={handleOpen} className='media'>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className='contentM'>
                                <img className='content_porait' alt={content.name || content.title} src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} />

                                <img className='content_lands ' alt={content.name || content.title} src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} />


                                <div className='contentMA'>
                                    <span className='contentMT'>
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_date || content.release_date || "--------"
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {content.tagline && (
                                        <i className='tagline'>{content.tagline}</i>
                                    )}
                                    <span className='contentMD'>
                                        {content.overview}
                                    </span>


                                    <div>
                                        <Caraosel media_type={media_type} id={id} />

                                    </div>
                                    <Button variant='contained' startIcon={<YouTubeIcon />} target='_blank' color='secondary' href={`https://www.youtube.com/watch?v=${video}`}>
                                        watch the trrailer
                                    </Button>



                                </div>
                            </div>


                        </div>)}
                </Fade>
            </Modal>


        </>
    );
}
