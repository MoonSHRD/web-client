import React, { useState } from 'react';

import { getOr } from 'unchanged';

import SendPayment from '../components/organisms/SendPayment';
import PaymentsHistory from '../components/organisms/PaymentsHistory';

import useAbortableFetch from '../components/hooks/useAbortableFetch';

const enrichWithDirection = (response, key, direction) =>
  getOr([], key, response).map(row => ({
    ...row,
    amount: (direction === 'from' && -row.amount) || row.amount,
    direction,
  }));

const useFetchEvents = () => {
  const [, refresh] = useState(null);

  const response = useAbortableFetch('//localhost:3000/api/token/events');

  const data = [
    ...enrichWithDirection(response, 'data.to', 'to'),
    ...enrichWithDirection(response, 'data.from', 'from'),
  ].sort((evOne, evTwo) => evOne.blockNumber - evTwo.blockNumber);

  return [{ ...response, data }, refresh];
};

const Payments = () => {
  const [eventsState, refreshEvents] = useFetchEvents();

  return (
    <div>
      <h2>Payments</h2>

      <div>
        <SendPayment onSubmit={() => refreshEvents()} />
      </div>

      <div>
        <PaymentsHistory {...eventsState} />
      </div>
    </div>
  );
};

export default Payments;
