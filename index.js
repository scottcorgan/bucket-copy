var path = require('path');
var assert = require('assert');
var aws2js = require('aws2js');
var async = require('async');
var BucketList = require('bucket-list');

exports.connect = function (opts) {
  try {
    assert.ok(opts, 'AWS S3 options must be defined');
    assert.notEqual(opts.key, undefined, 'Requires S3 AWS Key');
    assert.notEqual(opts.secret, undefined, 'Requres S3 AWS Secret');
    assert.notEqual(opts.srcBucket, undefined, 'Requires AWS S3 source bucket name');
    assert.notEqual(opts.destBucket, undefined, 'Requires AWS S3 destination bucket name');
    
    var s3 = aws2js.load('s3', opts.key, opts.secret);
  }
  catch (e) {
    return function () {
      throw new Error(e.message);
    }
  }
  
  //
  return function (sourceDir, directoryPrefix, callback) {
    if (!callback){
      callback = directoryPrefix;
      directoryPrefix = ''; // no crazy directoryPrefix
    }
    
    var bucket = BucketList.connect({
      key: opts.key,
      secret: opts.secret,
      bucket: opts.srcBucket
    });
    
    // Get our bucket objects
    bucket(sourceDir, function (err, files) {
      async.each(files, copyObject, callback);
    });
    
    function copyObject (file, callback) {
      var srcDir = path.join(opts.srcBucket, file);
      var destDir = path.join(opts.destBucket, directoryPrefix, file);
      
      s3.copyObject(srcDir, destDir, 'public-read', callback);
    }
  }
};