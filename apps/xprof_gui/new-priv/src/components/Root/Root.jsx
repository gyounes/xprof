import React from 'react';
import PropTypes from 'prop-types';
import {
  NavbarContainer,
  MonitoringContainer,
  TracingContainer,
} from '../../containers';
import { Footer } from '../navigation';
import { STATUS_INTERVAL } from '../../constants';

const propTypes = {
  getTraceStatus: PropTypes.func.isRequired,
};
class Root extends React.Component {
  componentWillMount() {
    const { getTraceStatus } = this.props;
    getTraceStatus();
    setInterval(getTraceStatus, STATUS_INTERVAL);
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <MonitoringContainer />
        <TracingContainer />
        <Footer />
      </div>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
