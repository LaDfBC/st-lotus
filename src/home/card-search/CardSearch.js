import Link from '@mui/material/Link';
import {config} from '../../common/config';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/system';
import useUpdateEffect from '../../common/UseUpdateEffect';
import CardStats from './CardStats';
import {Hidden, Typography} from '@mui/material';

const CardImage = styled('img')({
  maxWidth: '400px',
  borderRadius: '19px',
  textAlign: 'center',
  width: '90%',
});

const SearchTextField = styled(TextField)({
  '& label': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white !important',
  },
  '& input': {
    color: 'white',
  },
});

export default function CardSearch() {
  const [searchText, setSearchText] = useState('Black Lotus');
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState({average: 1.3833,
    averageRound: 1,
    card: 'black lotus',
    lotusScore: 99.6,
    numberOfDrafts: 60,
    numberTaken: 60});
  const [suggestion, setSuggestion] = useState(null);
  const [cardImage, setCardImage] = useState('https://c1.scryfall.com/file/scryfall-cards/normal/front/b/3/b3a69a1c-c80f-4413-a6fd-ae54cabbce28.jpg?1559591595');

  useUpdateEffect(() => {
    const populateCardStats = async() => {
      try {
        setLoadingStats(true);
        const {data} = await axios.get(`${config.API_CARD_URL}${encodeURIComponent(searchText)}`);
        if (!data.numberTaken) {
          setStats(data);
          setSuggestion({knownCard: true, suggestion: data.suggestion});
        } else {
          setStats(data);
          setSuggestion(null);
        }
        setLoadingStats(false);
        setLoadingImage(true);
        axios.get(`https://api.scryfall.com/cards/named?fuzzy=${searchText}`).then(({data}) => {
          let image = 'https://c1.scryfall.com/file/scryfall-cards/normal/front/5/8/5865603c-0a5e-45c3-84e3-2dc3b4cf0cf7.jpg?1562915786';
          if (data?.image_uris) {
            image = data?.image_uris?.normal;
          } else if (data?.card_faces) {
            image = data?.card_faces[0]?.image_uris?.normal;
          }

          if (cardImage === image) {
            setLoadingImage(false);
          }
          setCardImage(image);
        });
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
        setStats(null);
        setLoadingStats(false);
      }
    };
    populateCardStats();
  }, [searchText]);

  const handleImageLoad = () => {
    setLoadingImage(false);
  };

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const handleAcceptSuggestion = () => {
    setSearchText(suggestion.suggestion);
  };

  return (
    <Grid
      alignItems="center"
      container
      flexDirection="column"
      sx={{
      backgroundColor: 'grey.800',
      width: '100%',
      marginTop: '-6px',
      paddingTop: 2,
      paddingBottom: 2,
    }}
    >
      <SearchTextField
        InputProps={{
          startAdornment: <InputAdornment position="start"
            sx={{color: 'white'}}
                          >
            <SearchIcon />
          </InputAdornment>,
        }}

        label="Search"
        onChange={handleSearchTextChange}
        onFocus={event => {
        event.target.select();
      }}
        value={searchText}
        variant="standard"
      />
      {suggestion && <Typography color="white"
        sx={{margin: '20px 20px 0'}}
        variant="subtitle1"
                     >
                       {suggestion.knownCard ? `That hasn’t been played in the ${stats?.numberOfDrafts} drafts it’s been available. How about ` : 'Hmmm, can’t find that. Did you mean '}
                     <Link color="primary"
                       onClick={handleAcceptSuggestion}
                       sx={{cursor: 'pointer'}}
                     >{`“${suggestion.suggestion}”`}</Link>
                     {'?'}
                     </Typography>}
      <Grid container
        flexDirection="row"
        sx={{marginTop: '20px'}}
      >
        <Grid
          item
          md={0}
          xs={12}
        >
          <Hidden mdUp>
            {!!stats?.numberTaken && <CardStats averageRound={stats?.averageRound}
              loading={loadingStats}
              lotusScore={stats?.lotusScore}
              numberOfDrafts={stats?.numberOfDrafts}
              numberTaken={stats?.numberTaken}
                                     />}
          </Hidden>
        </Grid>
        <Grid item
          lg={4}
          xs={0}
        />
        <Grid container
          item
          justifyContent="center"
          lg={4}
          md={8}
          xs={12}
        >
          {loadingImage && <Skeleton color="white"
            height="480px"
            sx={{maxWidth: '400px', bgcolor: 'grey.500'}}
            variant="rectangular"
            width="90%"
                           />
          }
          <CardImage alt="Card Image"
            onLoad={handleImageLoad}
            src={cardImage}
            sx={{height: loadingImage ? 0 : 'auto', opacity: loadingImage ? 0 : 1}}
          />
        </Grid>
        <Grid
          item
          md={4}
          xs={0}
        >
          <Hidden mdDown>
            {!!stats?.numberTaken && <CardStats averageRound={stats?.averageRound}
              loading={loadingStats}
              lotusScore={stats?.lotusScore}
              numberOfDrafts={stats?.numberOfDrafts}
              numberTaken={stats?.numberTaken}
                                     />}
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
}
