import React, { useState } from 'react';
import { NuiProvider, useNuiEvent } from 'react-fivem-hooks';
import { Link, NavLink, Route, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { IPhoneSettings } from '@project-error/npwd-types';
import { i18n } from 'i18next';
import {
  Theme,
  StyledEngineProvider,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import ThemeSwitchProvider from './ThemeSwitchProvider';
import { AddRounded, ListAltRounded } from '@mui/icons-material';
import Header, { HEADER_HEIGHT } from './components/Header';
import { path } from '../npwd.config';
import Advertisements from './views/Advertisements';
import Create from './views/Create';

const Container = styled(Paper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 100%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.5rem;
  max-height: calc(100% - 3.5rem - ${HEADER_HEIGHT});
  overflow: auto;
`;

const LinkItem = styled(Link)`
  font-family: sans-serif;
  text-decoration: none;
`;

const Footer = styled.footer`
  margin-top: auto;
`;

interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const App = (props: AppProps) => {
  const { pathname } = useLocation();
  const [page, setPage] = useState(pathname);

  const handleChange = (_e: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeSwitchProvider mode={props.theme.palette.mode}>
        <Container square elevation={0}>
          <Header>Advertisements</Header>
          <Content>
            <Route exact path={path}>
              <Advertisements />
            </Route>
            <Route path={`${path}/create`}>
              <Create />
            </Route>
          </Content>

          <BottomNavigation value={page} onChange={handleChange} showLabels>
            <BottomNavigationAction
              label={'Advertisements'}
              value={path}
              component={NavLink}
              icon={<ListAltRounded />}
              to={path}
            />
            <BottomNavigationAction
              label={'Create'}
              value={`${path}/create`}
              color="secondary"
              component={NavLink}
              icon={<AddRounded />}
              to={`${path}/create`}
            />
          </BottomNavigation>
        </Container>
      </ThemeSwitchProvider>
    </StyledEngineProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
