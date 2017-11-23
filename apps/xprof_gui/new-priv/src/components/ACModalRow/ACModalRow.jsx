import PropTypes from 'prop-types';
import React from 'react';

const defaultProps = {
  isHighlighted: false,
};

const propTypes = {
  functionClick: PropTypes.func.isRequired,
  functionName: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool,
};

const ACModalRow = ({ functionClick, functionName, isHighlighted }) => (
  <tr
    className={isHighlighted ? 'row-highlight' : ''}
    onClick={() => functionClick(functionName)}
  >
    <td>{functionName}</td>
  </tr>
);

ACModalRow.defaultProps = defaultProps;
ACModalRow.propTypes = propTypes;

export default ACModalRow;
