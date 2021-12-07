import Container from '@mui/material/Container';
import SpacedHeader from '../common/SpacedHeader';
import React from 'react';
import ArticlePreview from './ArticlePreview';
import Grid from '@mui/material/Grid';

export default function Articles() {
  return (
    <Container maxWidth="lg">
      <SpacedHeader
        component="h1"
        sx={{marginTop: 10}}
        variant="h2"
      >{'Articles'}</SpacedHeader>
      <Grid container>
        <Grid
          item
          md={6}
          xs={12}
        >
            <ArticlePreview author="Stephen Hagan"
              date={new Date(2021, 10, 6)}
              heading="Planeswalkers in VRD"
              image="https://c1.scryfall.com/file/scryfall-cards/art_crop/front/c/8/c8817585-0d32-4d56-9142-0d29512e86a9.jpg?1598304029"
              link="/articles/2021-11-06/Planeswalkers in VRD"
              text="After St. Lotus VRD 7 there is some discussion about the ascendency of planeswalker cards to the top of the format. Brandon Curry’s powerful Balance/planeswalker deck was built around getting a 3 mana walker of some type (Oko, Thief of Crowns, Teferi, Time Raveler, or Dovin, Hand of Control) out on turn 2 as often as he could. Packing 8 maindeck walkers his strategy carried him to a 5-2 + a play off win against Eric Levine’s"
            />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
            <ArticlePreview author="Mark Katerberg"
              date={new Date(2021, 10, 25)}
              heading="Combos in VRD"
              image="https://c1.scryfall.com/file/scryfall-cards/art_crop/front/f/4/f4459187-de64-456f-bb66-56dea40d5c3e.jpg?1562057371"
              link="/articles/2021-11-25/Combos in VRD"
              text="Vintage Rotisserie Draft is well known as a format where combo decks can run rampant. While aggressive and controlling strategies often rely on redundancy (either of threats or of answers), combination decks generally rely on a few powerful pieces, with replaceable filtering pieces that aid in finding the crucial parts that are needed to win the game"
            />
        </Grid>
      </Grid>
    </Container>
  );
}
