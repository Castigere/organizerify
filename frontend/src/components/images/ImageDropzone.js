import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'components';

import arrowUpUploadIcon from 'assets/arrow_up_upload.svg';
import settingsIcon from 'assets/settings.svg';
import trashcanIcon from 'assets/trashcan.svg';

const Container = styled.div`
  margin: 12em;
  margin-top: 2em;
  margin-bottom: 2em;
  height: 20em;
  padding-bottom: 1em;
  width: max;
  @media only screen and (max-width: 57em) {
    margin: 0;
    padding: 0;
    margin-top: 1.5em;
    padding-bottom: 4em;
  }
`;

const Dropzone = styled.div`
  background: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding-bottom: 1.5em;
  padding-top: 1em;
  margin-bottom: 2.4em;
  cursor: pointer;
  ${({ isDragActive }) =>
    isDragActive &&
    css`
      box-shadow: inset 0 0 100px 0 #eee;
      transition: box-shadow 0.1s ease-in;
    `}
  @media only screen and (max-width: 57em) {
    margin-bottom: 1.15em;
  }
`;

const UploadArrow = styled.img`
  position: absolute;
  height: 5em;
  width: 5em;
  opacity: 12%;
  ${({ isDragActive }) =>
    isDragActive &&
    css`
      opacity: 100;
      transition: opacity 0.3s ease-in;
    `}
`;

const PreviewContainer = styled.div`
  z-index: 1000;
  height: 100%;
`;

const PreviewIconsContainer = styled.div`
  position: absolute;
  margin-top: -0.15em;
  margin-left: 0.1em;
`;

const PreviewIcon = styled.img`
  height: 1.3em;
  margin-right: 1em;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 40%;
    }
  }

  animation: 0.5s 0s ease-in fadeIn;
`;

const PreviewImage = styled.img`
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 #ccc;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 0.5s 0s ease-in fadeIn;
`;

const ImageDropzone = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState();
  const onDrop = useCallback(acceptedFiles => {
    setFile({ preview: URL.createObjectURL(acceptedFiles[0]) });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    noDragEventsBubbling: true,
    onDrop
  });

  const removeImagePreview = () => {
    URL.revokeObjectURL(file.preview);
    setFile();
  };

  return (
    <Container>
      <Dropzone
        isDragActive={isDragActive}
        {...getRootProps({
          onClick: e => {
            // Stop prpgagation so we can manually trigger onClicks if an image is previewed
            file && e.stopPropagation();
          }
        })}
        alt={t('components:imageDropzoneAlt')}
      >
        <UploadArrow src={arrowUpUploadIcon} isDragActive={isDragActive} />
        <input {...getInputProps()} />
        {file && (
          <PreviewContainer>
            <PreviewImage src={file.preview} />
            <PreviewIconsContainer>
              <Tooltip arrow text={t('components:imageDropzoneUploadAlt')}>
                <PreviewIcon src={arrowUpUploadIcon} />
              </Tooltip>
              <Tooltip arrow text={t('components:imageDropzoneCropAlt')}>
                <PreviewIcon src={settingsIcon} />
              </Tooltip>
              <Tooltip arrow text={t('components:imageDropzoneDiscardAlt')}>
                <PreviewIcon src={trashcanIcon} onClick={removeImagePreview} />
              </Tooltip>
            </PreviewIconsContainer>
          </PreviewContainer>
        )}
      </Dropzone>
    </Container>
  );
};

export default ImageDropzone;
