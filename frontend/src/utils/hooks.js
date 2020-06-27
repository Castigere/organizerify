/* eslint-disable import/prefer-default-export */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export const useTask = (operation, args) =>
  useEffect(() => {
    operation(args);
  }, [operation]);
