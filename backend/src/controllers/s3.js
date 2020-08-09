import AWS from 'aws-sdk';
import uuid from 'uuid';

import { S3_ACCESS_KEY, S3_SECRET_KEY, S3_ENDPOINT } from '../config';

const s3 = new AWS.S3({
  endpoint: S3_ENDPOINT,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY
});

async function getPresignedUploadUrl(bucket, directory) {
  const key = `${directory}/${uuid.v4()}`;
  const url = await s3
    .getSignedUrl('putObject', {
      Bucket: bucket,
      Key: key,
      ContentType: 'image/*',
      Expires: 300
    })
    .promise();
  return url;
}

const uploadImage = () => {
  return (req, res) => {
    console.log('REQUEST', req.headers);
    console.log('REQUEST', req.body);
  };
};

export { uploadImage };
