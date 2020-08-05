import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import withContext from 'context';
import { user } from 'tasks';

import { ProfileImageMedium } from 'components/images';
import { Button } from 'components/buttons';

import defaultImage from 'assets/default-user.svg';

const StyledUserStatusWidget = styled.div`
  width: 14em;
  grid-template-columns: 4em 10em;
  padding-top: 0.5em;
  padding-bottom: 0.2em;
  display: grid;
  justify-items: right;

  @media only screen and (max-width: 57em) {
    max-width: 4em;
    grid-template-columns: 4em;
  }
`;

const UserName = styled.div`
  font-weight: 500;
  height: 50%;
`;

const RightContainer = styled.div`
  border-left: 1px solid black;
  padding-left: 0.7em;

  @media only screen and (max-width: 57em) {
    display: none;
  }
`;

const UserStatus = ({ username }) => (
  <StyledUserStatusWidget>
    <ProfileImageMedium src={defaultImage} alt="profile image" />
    <RightContainer>
      <UserName>{username || ''}</UserName>
      <Button type="button" onClick={() => user.logoutUser()}>
        LOGOUT
      </Button>
    </RightContainer>
  </StyledUserStatusWidget>
);

UserStatus.propTypes = {
  username: PropTypes.string.isRequired
};

const mapStateToProps = (state, selectors) => {
  return {
    username: selectors.user.getUserFullName(state)
  };
};

export default withContext(UserStatus, mapStateToProps);
