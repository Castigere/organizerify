import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import { Tooltip } from 'components';
import { Button } from 'components/buttons';

import arrowUpUpload from 'assets/arrow_up_upload.svg';

const Container = styled.div`
  background: #fcfcfc;
  margin: 8em;
  margin-top: 2em;
  margin-bottom: 2em;
  height: 14em;
  width: max;
  @media only screen and (max-width: 57em) {
    /* margin: 0.2em;
    margin-top: 2em;
    margin-left: 0em;
    /* margin-right: 1em; */
    /* padding-bottom: 4em; */
    /* width: 90%;  */
    margin: 0;
    margin-left: -10px;
    margin-right: 5px;
    padding: 0;
    margin-top: 1.5em;
  }
`;

const Dropzone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10em;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1em;
  margin-bottom: 1.5em;
  cursor: pointer;
  ${({ isDragActive }) =>
    isDragActive &&
    css`
      box-shadow: inset 0 0 100px 0 #eee;
      transition: box-shadow 0.1s ease-in;
    `}
  @media only screen and (max-width: 57em) {
    /* width: 90%; */
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

const PreviewImage = styled.img`
  /* display: inline; */
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
    console.log(acceptedFiles[0]);
    setFile({ preview: URL.createObjectURL(acceptedFiles[0]) });
  }, []);

  console.log(file);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop
  });
  return (
    <Container>
      <Tooltip arrow text={t('components:imageDropzoneAlt')}>
        <Dropzone
          isDragActive={isDragActive}
          {...getRootProps()}
          alt={t('components:imageDropzoneAlt')}
        >
          <UploadArrow src={arrowUpUpload} isDragActive={isDragActive} />
          <input {...getInputProps()} />
          {file && <PreviewImage src={file.preview} />}
        </Dropzone>
      </Tooltip>
      <Button disabled={file ? false : true} right tooltip="Upload image">
        Upload
      </Button>
    </Container>
  );
};

export default ImageDropzone;
