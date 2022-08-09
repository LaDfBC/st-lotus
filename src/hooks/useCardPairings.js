import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {useCallback, useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import {config} from '../common/config';

const useCardPairings = (searchText) => {
  const [synergies, setSynergies] = useState([]);
  const [loadingSynergies, setLoadingSynergies] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const cardSynergies = useCallback((text) => axios.get(`${config.API_SYNERGIES_URL}`.replace('{CARD_NAME}', encodeURIComponent(text))), []);
  const getCardSynergies = useMemo(() => AwesomeDebouncePromise(cardSynergies, 300), [cardSynergies]);

  useEffect(() => {
    (async() => {
      try {
        //eslint-disable-next-line
        console.log('fetching data');
        const {data} = await getCardSynergies(searchText.trim());
        setLoadingSynergies(true);
        if (data.statusCode) {
          setSynergies([]);
          setSuggestion({knownCard: true, suggestion: data.suggestion});
        } else {
          setSynergies(data);
          setSuggestion(null);
        }
        setLoadingSynergies(false);
      } catch (e) {
        const response = e?.response;
        const errorMessage = response?.data?.message;
        if (response?.status === 404) {
          // Clearing the errors for expected 404s
          // eslint-disable-next-line no-console
          console.clear();
        }
        if (errorMessage) {
          setSuggestion({knownCard: false, suggestion: errorMessage});
        } else {
          setSuggestion(null);
        }
        setSynergies([]);
        setLoadingSynergies(false);
      }
    })();
  }, [searchText, getCardSynergies]);

  return {synergies, loadingSynergies, suggestion};
};

export default useCardPairings;
