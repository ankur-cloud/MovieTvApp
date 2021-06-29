import React from 'react'
import './Singlecontent.css'
import { img_300, unavailable } from './../config/config';
import { Badge } from '@material-ui/core';
import Contentmodal from './Modal/Contentmodal';

const Singlecontent = (drops) => {
    const { poster, name, unavailable, title, media_type, date, vote_average, genres, fadate, id } = drops;
    return (
        <Contentmodal media_type={media_type} id={id}>
            <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'}></Badge>
            <img className='poster' src={poster ? `${img_300}/${poster}` : { unavailable }} alt={title} />
            <h1>{name}</h1>
            <b className='title'>{title} </b>
            <span className='subTitle'>
                {media_type === 'tv' ? 'TV series ' : 'Movie '}
                <h6>{genres}</h6>
                <span className='subTitle'>{date}</span>
                <span className='subTitle'>{fadate}</span>
            </span>
        </Contentmodal >
    )
}

export default Singlecontent;

