import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';

function Dash() {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div>
      {loggedIn && (
        <div className="col-12 mb-3">
          
        </div>
      )}
      </div>
    </main>
  );
}

export default Dash;
