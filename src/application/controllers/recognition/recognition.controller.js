const recognitionModule = require('../../../domain/recognition/recognition.module');
const Rx = require('rxjs/Rx');

const getPossiblePlates = (plateImage) => {
    return Rx.Observable.of(plateImage)
        .flatMap((image) => recognitionModule.uploadImage(image))
        .catch((error) => {
            console.log('Upload error:', error);
            return Rx.Observable.throwError(new Error('UPLOAD_ERROR'));
        })
        .flatMap((keyName) => recognitionModule.getPossiblePlates(keyName))
        .catch((error) => {
            console.log('Recognition error:', error);
            return Rx.Observable.throwError(new Error('RECOGNITION_ERROR'));
        });
};

module.exports = {
    getPossiblePlates,
};
