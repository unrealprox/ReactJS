import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Row from './Row'
import './App.css';


const App = ({ message }) => (
    <div>
        <div className="Field">
            <Row row={0}/>
            <Row row={1}/>
            <Row row={2}/>
        </div>
        <div className="Message">
            {message}
        </div>
    </div>
);

App.propTypes = {
    message: PropTypes.string.isRequired
};

export default connect(
    store => ({
        message: store.message
    })
)(App);
