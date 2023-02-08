import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => (
    <div id='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>


        <Link to='/'>Home</Link>
    </div>
);
