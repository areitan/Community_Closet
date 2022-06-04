const dotenv = require("dotenv");
const AWS = require("aws-sdk");

dotenv.config();

const region = "us-west-2";
const bucketName = "community-closet-s3-bucket";
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL() {
  const imageName = "clothing name";

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 300,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports = generateUploadURL;

//use fetch to get the body and pass in the data into uploadURL

