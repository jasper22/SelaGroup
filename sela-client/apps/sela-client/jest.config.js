module.exports = {
  name: 'sela-client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/sela-client',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
