import React from 'react';

import SendPayment from '../components/organisms/SendPayment';
import PaymentsHistory from '../components/organisms/PaymentsHistory';

const Payments = () => (
  <div>
    <h2>Payments</h2>

    <div>
      <SendPayment />
    </div>

    <div>
      <PaymentsHistory />
    </div>
  </div>
);

export default Payments;
