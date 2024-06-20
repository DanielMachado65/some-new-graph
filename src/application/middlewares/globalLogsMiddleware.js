"use strict";

const axios = require("axios");
const jwt = require("../../infrastructure/utils/jsonwebtokenLogicLayer");

function creatUniqueIdentifier(key) {
  return Buffer.from(`${key}:${process.env.APPLICATION_ID}`).toString("base64");
}

function requestBodyFactory(
  id,
  ip,
  host,
  rawBody,
  rawHeaders,
  method,
  secure,
  originalUrl
) {
  return {
    original_url: originalUrl,
    id,
    ip,
    host,
    raw_body: rawBody,
    raw_headers: rawHeaders,
    method,
    secure,
  };
}

const doRequest = (body) => {
  const url =
    "https://lmvg4jubmi.execute-api.us-east-1.amazonaws.com/prod/global-logs/create";
  axios
    .post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    })
    .finally();
};

function isACommandRequest(method) {
  return method !== "GET";
}

async function getUserIdFromToken(request) {
  const token = request.headers["authorization"];
  if (!token) return;
  const { data } = await jwt.isACommonSecureRequest(token);
  return data;
}

async function createLog(ctx) {
  try {
    const { request, method } = ctx;
    const userId = await getUserIdFromToken(request);
    if (userId && isACommandRequest(method)) {
      const id = creatUniqueIdentifier(userId);
      const {
        originalUrl,
        method,
        secure,
        request: { rawBody, headers },
      } = ctx;
      const ip = headers["x-forwarded-for"];
      const host = headers["host"];
      const rawHeaders = JSON.stringify(headers);
      doRequest(
        requestBodyFactory(
          id,
          ip,
          host,
          null,
          rawHeaders,
          method,
          secure,
          originalUrl
        )
      );
    }
  } catch (e) {
    console.error(e);
  }
}

module.exports = async (ctx, next) => {
  if (next) {
    createLog(ctx).finally();
    return next();
  }
};
