import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.fileRestrictions('image', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: 1 * 1024 * 1024,
});

Slingshot.createDirective('fileUploads', Slingshot.S3Storage, {
  bucket: 'uhmbazaar',
  maxSize: 1 * 1024 * 1024,
  acl: 'public-read',
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  AWSAccessKeyId: 'Accesskey',
  AWSSecretAccessKey: 'Secretkey',
  region: 'us-west-1',

  authorize: function () {

    if (!this.userId) {
      const message = 'Please login before posting files';
      throw new Meteor.Error('Login Required', message);
    }

    return true;

  },
  key: function (file) {

    const user = Meteor.users.findOne(this.userId);
    return `{${user.username} / ${file.name}}`;
  },
});
