import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import withContext from 'context';
import { useTask } from 'utils/hooks';
import { session, subscriptions } from 'tasks';
import { defaultTheme } from 'themes';

import Routes from 'routes';
import LoadingBar from 'components/LoadingBar';
import { Wrapper, Body, LeftBar, Content, RightBar, Footer, Header } from 'components/layout';

const App = ({ isUserAuthenticated, isAppReady }) => {
  useTask(session.prepareApp);

  useEffect(() => {
    isAppReady && isUserAuthenticated && subscriptions.enableAllSubscriptions();
  }, [isUserAuthenticated, isAppReady]);

  return isAppReady ? (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper>
        <Header />
        <Body>
          <LeftBar />
          <Content>
            <Routes isUserAuthenticated={isUserAuthenticated} />
          </Content>
          <RightBar />
        </Body>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  ) : (
    <LoadingBar />
  );
};

App.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  isAppReady: PropTypes.bool.isRequired
};

const mapStateToProps = (state, selectors) => ({
  isUserAuthenticated: selectors.auth.getAuthenticationStatus(state),
  isAppReady: selectors.preload.getAppStatus(state)
});

export default withContext(App, mapStateToProps);
