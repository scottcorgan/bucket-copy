# Bucket Copy

Copy Amazon S3 bucket objects to another bucket.

## Install

```
npm install bucket-copy --save
```

## Usage

```javascript

var BucketCopy = require('bucket-copy');
var bucketCopy = BucketCopy.connect({
  key: 's3-key',
  secret: 's3-secret',
  srcBucket: 'name-of-the-s3-bucket',
  destBucket: 'name-of-the-s3-bucket'
});


// Copy the object(s)

bucketCopy('some_dirctory_in_a_bucket', function (err) {
  // All done and copied, unless you messed up
});

// OR

bucketCopy('some_dirctory_in_a_bucket', 'new_bucket_directory_prefix', function (err) {
  // All done and copied, unless you messed up
});

```

The directory prefix allows you to put then entire set of copied objects into a new root object when they are copied to the new bucket.
