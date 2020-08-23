import React from 'react';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Form, Fieldset } from 'components/form';
import { Button } from '@castigere/components';
import { ImageDropzone } from 'components/images';

const ProfileImageUpload = () => {
  const { t } = useTranslation();

  return (
    <Form>
      <Fieldset legend={t('userregistration:profileImageUploadLegend')} collapsible>
        <ImageDropzone />
        <Button right type="submit" alt={t('userregistration:profileImageUploadButtonAlt')}>
          {t('userregistration:profileImageUploadButton')}
        </Button>
      </Fieldset>
    </Form>
  );
};

ProfileImageUpload.defaultProps = {};

ProfileImageUpload.propTypes = {};

export default ProfileImageUpload;
