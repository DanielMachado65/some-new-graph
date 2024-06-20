const {
  generateBufferFromDataJson,
} = require("../../infrastructure/utils/excel.util");
const { sendSimpleEmail } = require("../mail/mailSender.service");
const { upload } = require("../../infrastructure/services/aws/oncS3Service");
const {
  REPORTS_ONC,
} = require("../../infrastructure/constants/storages.constant");
const userFacade = require("../user/user/user.facade");

async function getEmailOfUser(userId) {
  const user = await userFacade.getById(userId, { email: 1 });
  return user.email;
}

function generateXLSXBufferOfReport(data, sheetName) {
  return generateBufferFromDataJson(data, sheetName);
}

function sendReportLinkToEmail(to, reportName, url) {
  sendSimpleEmail(
    to,
    `[ONC] Relatório: ${reportName}`,
    `O relatório foi gerado. Faça o download pelo link => ${url}`
  ).finally();
}

const storeReportOnStorageAndGetDownloadLink = async (
  buffer,
  storageFolder
) => {
  const path = `${REPORTS_ONC}/${storageFolder}`;
  const hash = Buffer.from(new Date().toString()).toString("base64");
  const key = `${hash}.xlsx`;
  await upload(path, key, buffer);
  const publicUrl = `https://reports-onc.s3-sa-east-1.amazonaws.com/${storageFolder}/`;
  return publicUrl + key;
};

const sendReportToUserEmail = async ({
  userId,
  reportName,
  sheetName,
  storageFolder,
  reportData,
}) => {
  const buffer = generateXLSXBufferOfReport(reportData, sheetName);
  const [userEmail, reportLink] = await Promise.all([
    getEmailOfUser(userId),
    storeReportOnStorageAndGetDownloadLink(buffer, storageFolder),
  ]);
  sendReportLinkToEmail(userEmail, reportName, reportLink);
};

module.exports = {
  sendReportToUserEmail,
};
