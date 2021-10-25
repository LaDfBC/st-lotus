import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Card from './Card';
import SortSelector from './SortSelector';

export default function Deck({deck}) {
  const [sort, setSort] = useState('pick');
  const sortByName = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;

  };
  const decklist = useMemo(() => {
    if (sort === 'cmc') {
      return [...deck.decklist].sort((a, b) => {
        if (a.cmc < b.cmc) {
          return -1;
        }
        if (a.cmc > b.cmc) {
          return 1;
        }
        return sortByName(a, b);
      });
    }
    if (sort === 'color') {
      return [...deck.decklist].sort((a, b) => sortByName(a, b));
    }
    return deck.decklist;
  }, [deck, sort]);

  const handleSortChange = (value) => {
    setSort(value);
  };

  const getPrefix = (card, sort, index) => {
    let prefix;
    if (sort === 'pick') {
      prefix = index + 1;
    }
    if (sort === 'cmc') {
      prefix = card.cmc;
    }
    if (sort === 'color') {
      if (card.colors.length === 1) {
        [prefix] = card.colors;
      } else if (card.colors.length === 0) {
        prefix = 'C';
      } else {
        prefix = 'M';
      }
    }
    return prefix;
  };

  return (
    <>
      <Typography variant="h3">{deck.genre}</Typography>
      <Typography>{`${deck.player}`}{deck.wins !== undefined && deck.losses !== undefined ? ` (${deck.wins}-${deck.losses})` : ''}</Typography>
      <Typography>{deck.date}</Typography>
      <hr/>
      <SortSelector onChange={handleSortChange}
        value={sort}
      />
      <List component="nav">
        {decklist.map((card, i) => <React.Fragment key={card.name}>
            <ListItem button>
              <Card card={card}
                prefix={`${getPrefix(card, sort, i)}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>)}
      </List>
    </>
  );
}

Deck.propTypes = {
  deck: PropTypes.shape({
    date: PropTypes.string.isRequired,
    player: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    wins: PropTypes.number,
    losses: PropTypes.number,
    stLotus: PropTypes.number,
    decklist: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      cmc: PropTypes.number.isRequired,
      colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
  }).isRequired,
};
