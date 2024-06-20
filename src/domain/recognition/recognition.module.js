const s3Service = require('../../infrastructure/services/aws/oncS3Service');
const crypto = require('crypto');

const uploadImage = (base64Img) => {
    const base64Hash = base64Img.replace(/^data:image\/\w+;base64,/, '');
    const type = base64Img.split(';')[0].split('/')[1];
    const fileName = crypto
        .createHash('sha256')
        .update(base64Hash)
        .digest('hex');
    const objectToUpload = {
        bucketName: s3Service.ALL_BUCKETS.plates,
        fileName: fileName,
        hash: base64Hash,
        type: type,
    };

    return s3Service.putImage(objectToUpload).map((uploadResponse) => {
        if (uploadResponse.key) return uploadResponse.key;
        throw new Error(`UPLOAD_ERROR: ${uploadResponse}`);
    });
};

const getPossiblePlates = (keyName) => {
    const plateObject = {
        bucketName: s3Service.ALL_BUCKETS.plates,
        keyName: keyName,
    };

    return s3Service.recognizePlate(plateObject).map((recognitionResponse) => {
        if (recognitionResponse)
            return JSON.parse(recognitionResponse).detectedPlates || [];
        throw new Error(`RECOGNITION_ERROR: ${recognitionResponse}`);
    });
};

module.exports = {
    uploadImage,
    getPossiblePlates,
};
