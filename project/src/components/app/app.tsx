import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import ReviewScreen from '../../pages/review-screen/review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {Film} from '../../types/film';
import {Review} from '../../types/review';

export type AppScreenProps = {
  promoFilm: Film;
  films: Film[];
  reviews: Review[];
}

export default function App (props:AppScreenProps): JSX.Element {
  const {
    promoFilm,
    films,
    reviews,
  } = props;

  const [firstFilm] = films;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreen
              promoFilm={promoFilm}
              films={films}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListScreen films={films}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={
            <FilmScreen
              reviews={reviews}
              promoFilm={promoFilm}
              films={films}
            />
          }
        />
        <Route
          path={AppRoute.Review}
          element={
            <ReviewScreen
              firstFilm={firstFilm}
            />
          }
        />
        <Route
          path={AppRoute.Player}
          element={
            <PlayerScreen
              firstFilm={firstFilm}
            />
          }
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}
