import React from 'react';
import PropTypes from 'prop-types';

import './Bage.css';

const Bage = ({ bage, tooltip, tooltipData }) => (
  <React.Fragment>
    <div styleName="bage">
      {bage}
      {tooltip && (
        <div styleName="tooltip">
          <span>{tooltipData.title}</span>
          <span styleName="tooltipDescription">{tooltipData.description}</span>
        </div>
      )}
    </div>
  </React.Fragment>
);

Bage.propTypes = {
  bage: PropTypes.node.isRequired,
  tooltip: PropTypes.bool,
  tooltipData: PropTypes.object,
};

Bage.defaultProps = {
  tooltip: false,
  tooltipData: {
    title: '',
    description: '',
  },
};

export default Bage;
