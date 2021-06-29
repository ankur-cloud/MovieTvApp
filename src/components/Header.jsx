import { AppBar, Typography } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import React from 'react'
// import '../components/Header.css'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({

    header: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'uppercase',
        fontFamily: "Moneserrat",
        paddingBottom: '15px',
        width: '100%',
        paddingTop: '30px'
    },
    appb: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 28,
        padding: '50 30px',
        paddingBottom: '80px',
        paddingTop: '20px'
    }
})


const Header = () => {

    const classes = useStyles()

    return (
        <AppBar className={classes.appb} color='secondary' onClick={() => window.scrollTo(0, 0)} >
            <Toolbar >
                <Typography variant='h3' className={classes.header} >  Entertainment Hub</Typography>

            </Toolbar>

        </AppBar>

    )
}

export default Header
