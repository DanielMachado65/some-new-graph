'use strict';

// https://099473953433.signin.aws.amazon.com/console
// USUARIO: olhonocarro
// SENHA: olho@2018

const AWS = require('aws-sdk');
const Q = require('q');
const config = require('../../config/aws');

const ALL_BUCKETS = {
    users: 'olhonocarro.users',
    billings: 'olhonocarro.billings',
    invoices: 'olhonocarro.invoices',
    reports: {
        queries: 'olhonocarro/reports/queries',
    },
};

const LOCATION = 'sa-east-1';

const s3 = new AWS.S3(config.checktudoAwsS3Credentials);

// Lista todos os buckets disponiveis
const listBuckets = async () => {
    let deferred = Q.defer();
    s3.listBuckets(function (err, data) {
        if (err) {
            return deferred.reject(err);
        } else {
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// Cria um novo bucket com as configurações padrão
const createBucket = async (bucketName) => {
    let deferred = Q.defer();
    let params = {
        Bucket: bucketName,
        ACL: 'public-read',
        CreateBucketConfiguration: {
            LocationConstraint: LOCATION,
        },
    };
    s3.createBucket(params, function (err, data) {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

//Criar uma nova pasta em algum bucket
const createFolderOnBucket = async (bucketName, folderName) => {
    let deferred = Q.defer();
    bucketName = bucketName ? bucketName : ALL_BUCKETS.users;
    let params = {
        Bucket: bucketName,
        Key: `${folderName}/`,
        ACL: 'public-read',
        CreateBucketConfiguration: {
            LocationConstraint: LOCATION,
        },
        Body: String(),
    };
    s3.upload(params, function (err, data) {
        if (err) {
            return deferred.reject(err);
        } else {
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

const emptyFolderOnBucket = async (bucketName, folderName) => {
    let deferred = Q.defer();
    try {
        bucketName = bucketName ? bucketName : ALL_BUCKETS.users;
        let prefix = folderName ? folderName + '/' : null;
        let lists = await listObjectsV2(ALL_BUCKETS.users, 10, prefix);

        let objectsToDelete = [];

        lists.Contents.forEach(function (content) {
            objectsToDelete.push({ Key: content.Key });
        });
        await deleteObjects(null, objectsToDelete);
        deferred.resolve(true);
    } catch (error) {
        deferred.reject(false);
    }
    return deferred.promise;
};

// Deleta o bucket( todos os objetos dentro do bucket deve ser excluído antes que o próprio Bucket seja excluído)
const deleteBucket = async (bucketName) => {
    let deferred = Q.defer();
    let params = {
        Bucket: bucketName,
    };
    s3.deleteBucket(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// Busca a política de controle de acesso ao Bucket (permissões do Bucket)
const getBucketAcl = async (bucketName) => {
    let deferred = Q.defer();
    let params = {
        Bucket: bucketName,
    };
    s3.getBucketAcl(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// Retorna a região em que o Bucket esta hospedado
const getBucketLocation = async (bucketName) => {
    let deferred = Q.defer();
    let params = {
        Bucket: bucketName,
    };
    s3.getBucketLocation(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// Cria uma cópia de um objeto que já existe no Bucket
const copyObject = async (destinationBucket, source, object) => {
    let deferred = Q.defer();
    let params = {
        Bucket: destinationBucket,
        CopySource: source,
        Key: object,
    };

    s3.copyObject(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

const getObject = async (Bucket = ALL_BUCKETS.users, Key) => {
    return new Promise((res, rej) => {
        s3.getObject(
            {
                Bucket,
                Key,
            },
            (err, data) => {
                if (err) return err.code === 'NoSuchKey' ? rej(null) : rej(err);
                return res(data);
            },
        );
    });
};

// Retorna o controle de acesso de um objeto do Bucket
const getObjectAcl = async (bucketName, object) => {
    let deferred = Q.defer();
    let params = {
        Bucket: bucketName,
        Key: object,
    };

    s3.getObjectAcl(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// Retorna um número pré-determinado ou os 1000 objetos que estão no Bucket
const listObjects = async (bucketName, maxKeys, prefix) => {
    let deferred = Q.defer();

    let params = {
        Bucket: bucketName,
        MaxKeys: maxKeys,
        Prefix: prefix,
    };

    s3.listObjects(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// Retorna um número pré-determinado ou os 1000 objetos que estão no Bucket - API revisada, reomendável a utilização desse método
const listObjectsV2 = async (bucketName, maxKeys, prefix) => {
    let deferred = Q.defer();

    let params = {
        Bucket: bucketName,
        MaxKeys: maxKeys,
        Prefix: prefix,
    };

    s3.listObjectsV2(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// Remove a versão null do objeto e insere um marcador de exclusão, se não houver a versão nula o objeto não será removido
const deleteObject = async (bucketName, object) => {
    let deferred = Q.defer();
    bucketName = bucketName ? bucketName : ALL_BUCKETS.users;
    let params = {
        Bucket: bucketName,
        Key: object,
    };

    s3.deleteObject(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// TODO
// Remove múltiplos objetos utilizando uma única requisição http
const deleteObjects = async (bucketName, arrObjects) => {
    let deferred = Q.defer();
    bucketName = bucketName ? bucketName : ALL_BUCKETS.users;
    let params = {
        Bucket: bucketName,
        Delete: {
            Objects: arrObjects,
        },
    };

    s3.deleteObjects(params, (err, data) => {
        if (err) {
            return deferred.reject(err);
        } else {
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

const putBufferObject = async (
    Bucket = ALL_BUCKETS.users,
    Key,
    Body,
    ContentType,
) => {
    return new Promise((res, rej) => {
        s3.putObject(
            {
                Bucket,
                Key,
                Body,
                ACL: 'private',
                ContentEncoding: 'buffer',
                ContentType,
            },
            (err, data) => {
                return err ? rej(err) : res(data);
            },
        );
    });
};

const putObject = async (
    Bucket = ALL_BUCKETS.users,
    { key, contentType, base64 },
) => {
    const buffer = new Buffer(base64.replaceAll('\n', ''), 'base64');
    return new Promise((res, rej) => {
        s3.putObject(
            {
                Bucket,
                Key: key,
                Body: buffer,
                ACL: 'public-read-write',
                ContentEncoding: 'base64',
                ContentType: contentType,
            },
            (err, data) => {
                return err ? rej(err) : res(data);
            },
        );
    });
};

// Restaura uma cópia do objeto
const restoreObject = async (bucketName, object) => {
    let deferred = Q.defer();

    let params = {
        Bucket: bucketName,
        Key: object,
    };

    s3.restoreObject(params, (err, data) => {
        if (err) {
            console.log(err);
            return deferred.reject(err);
        } else {
            console.log(data);
            return deferred.resolve(data);
        }
    });
    return deferred.promise;
};

// Faz o upload para um determinado bucket criando um objeto informando o tipo de conteúdo do arquivo
const upload = async (bucketName, key, body) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: body,
        ACL: 'public-read', //temp
    };
    return new Promise((res, rej) => {
        s3.upload(params, (err, data) => {
            if (err) {
                return rej(err);
            }
            return res(data);
        });
    });
};

const hasObjectOnBucket = async (Bucket, Key) => {
    return new Promise((res, rej) => {
        s3.headObject(
            {
                Bucket,
                Key,
            },
            (err, data) => {
                return err && err.statusCode !== 404 ? rej(err) : res(data);
            },
        );
    });
};

module.exports = {
    // ** BUCKETS INTERFACE **
    listBuckets,
    createBucket,
    createFolderOnBucket,
    emptyFolderOnBucket,
    deleteBucket,
    getBucketAcl,
    getBucketLocation,
    // ** OBJECTS INTERFACE **
    copyObject,
    getObject,
    getObjectAcl,
    listObjects,
    listObjectsV2,
    deleteObject,
    deleteObjects,
    putObject,
    restoreObject,
    upload,
    hasObjectOnBucket,
    putBufferObject,
    ALL_BUCKETS,
};
