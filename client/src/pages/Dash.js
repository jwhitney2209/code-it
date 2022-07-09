import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

function Dash() {
  const loggedIn = Auth.loggedIn();

  return (
    <div>
      <div>
      </div>
    </div>
  );
}

export default Dash;
