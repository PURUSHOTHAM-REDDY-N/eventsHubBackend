import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIA6ODUZMWB45UUNMQE',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

// export  const s3 = new AWS.S3();

export default s3;