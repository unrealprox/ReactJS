import React from 'react';
import { connect, dispatch } from 'react-redux';
import PropTypes from 'prop-types'

import { setField } from './actions'
import './Square.css';

const getSquareValue = value => {
    switch (value) {
        case 0:
            return ' ';
        case 1:
            return 'x';
        case -1:
            return 'o';
    }
}

const Square = ({ field, row, col, setField }) => (
    <div className="Square" onClick={setField} data-row={row} data-col={col}>
        {getSquareValue(field[3*row + col])}
    </div>
);

Square.propTypes = {
    field: PropTypes.arrayOf(PropTypes.number).isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    setField: PropTypes.func.isRequired
};

export default connect(
    store => ({
        field: store.field
    }),
    dispatch => ({
        setField: (event) => dispatch(setField(parseInt(event.target.dataset['row']), parseInt(event.target.dataset['col'])))
    })
)(Square);