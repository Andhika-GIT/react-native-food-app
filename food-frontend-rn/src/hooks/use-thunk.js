import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setLoading } from '../store';

// reusable thunk for different state
export const useThunk = (thunk) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    (arg) => {
      dispatch(setLoading(true));

      // wait for http promise and chained with unwrap()
      dispatch(thunk(arg))
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => dispatch(setLoading(false)));
    },
    [dispatch, thunk]
  );

  return [runThunk, error];
};
