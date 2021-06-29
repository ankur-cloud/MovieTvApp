import { createMuiTheme, TablePagination, ThemeProvider } from '@material-ui/core'
import React from 'react'
import Pagination from '@material-ui/lab/Pagination';


const dTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})



const CustomPagination = ({ setPage, numofPages = 20 }) => {


    const handlePage = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }
    return (
        <div style={{ width: '100%', justifyContent: 'center', marginTop: 10, display: 'flex' }}>

            <ThemeProvider theme={dTheme}>
                <Pagination count={numofPages} onChange={(event) => handlePage(event.target.textContent)} hideNextButton hidePrevButton color='secondary' />

            </ThemeProvider>

        </div>
    )
}

export default CustomPagination;
