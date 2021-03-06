import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,500,600,700&display=swap&subset=latin-ext'); */

    *,*::before, *::after{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    /* happy rems :) */
    html{
        font-size: 62.5%;
    }
    /* lepiej urzyć fontu bez szeryfowego !!! */
    body{

        font-size: 1.6rem;
        font-family: sans-serif;
        /* color:red; */
        /* font-family: 'Playfair Display', serif; */
    }
`;
export default GlobalStyle;
