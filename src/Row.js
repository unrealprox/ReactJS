import React from 'react';
import PropTypes from 'prop-types'

import Square from './Square'

const Row = ({ row }) => (
    <div>
        <Square row={row} col={0} />
        <Square row={row} col={1} />
        <Square row={row} col={2} />
    </div>
);

Row.propTypes = {
    row: PropTypes.number.isRequired
};

export default Row;