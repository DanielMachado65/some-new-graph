"use strict";

const AWS = require("aws-sdk");
const config = require("../../config/aws");
const request = require("request-promise");
const ALL_BUCKETS = {
  plates: "plates-olhonocarro",
};
const s3 = new AWS.S3(config.oncAwsS3Credentials);
const Rx = require("rxjs/Rx");

const putImage = ({ bucketName, fileName, hash, type }) => {
  const uploadPromise = s3
    .upload({
      Bucket: bucketName,
      Key: `${fileName}.${type}`,
      Body: new Buffer.from(hash, "base64"),
      ACL: "public-read-write",
      ContentEncoding: "base64",
      ContentType: type,
    })
    .promise();
  return Rx.Observable.from(uploadPromise);
};

const recognizePlate = ({ bucketName, keyName }) => {
  const params = {
    method: "GET",
    uri: `https://dpqj0f01t9.execute-api.us-east-1.amazonaws.com/dev/recognition/plate?bucket=${bucketName}&name=${keyName}`,
  };
  const recognitionPromise = new Promise((resolve, reject) => {
    request(params)
      .then((response) => {
        if (!response) reject(response);
        resolve(response);
      })
      .catch((error) => reject(error));
  });
  return Rx.Observable.from(recognitionPromise);
};

const upload = async (Bucket, Key, Body) => {
  return new Promise((res, rej) => {
    s3.upload(
      {
        Bucket,
        Key,
        Body,
        ACL: "public-read",
      },
      (err, data) => {
        return err ? rej(err) : res(data);
      }
    );
  });
};

const getObject = async (Bucket, Key) => {
  return new Promise((res, rej) => {
    s3.getObject(
      {
        Bucket,
        Key,
      },
      (err, data) => {
        if (err) return err.code === "NoSuchKey" ? rej(null) : rej(err);
        return res(data);
      }
    );
  });
};

module.exports = {
  ALL_BUCKETS,
  putImage,
  recognizePlate,
  upload,
  getObject,
};
