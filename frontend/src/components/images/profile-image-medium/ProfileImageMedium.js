import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledProfileImageMedium = styled.img`
  padding: 0.2em;
  width: 3.5em;
  height: 3.5em;
`;

const ProfileImageMedium = ({ src, alt, ...props }) => (
  <StyledProfileImageMedium src={src} alt={alt} {...props} />
);

ProfileImageMedium.defaultProps = {
  alt: 'no description'
};

ProfileImageMedium.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired
};

export default ProfileImageMedium;
