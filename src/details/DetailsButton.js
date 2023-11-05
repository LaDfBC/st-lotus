import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
// import {useHistory} from 'react-router-dom';

export default function DetailsButton({card}) {
  const router = useRouter()
  // const history = useHistory();

  const handleDetailsPress = useCallback(() => router.push(`/details/${encodeURIComponent(card)}`), [router, card]);

  return (
    <Button
      color="primary"
      onClick={handleDetailsPress}
      size="large"
    >{'See Details'}</Button>
  );
}

DetailsButton.propTypes = {
  card: PropTypes.string.isRequired,
};
