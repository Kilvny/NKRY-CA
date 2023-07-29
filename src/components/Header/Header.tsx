import React from 'react'
import Navbar from '../Navbar'
import { Theme } from '@mui/material';

const Header = (props: {
    theme: Theme,
    colorMode: {
        toggleColorMode: () => void;
    }
}) => {
    return (
        <div>
            <Navbar {...props} />
        </div>
    )
}

export default Header