const ActionType = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
});

const Input = Object.freeze({
  ACTION: 'action',
  BUILD_ID: 'build-id',
  TYPE: 'type',
  NAME: 'name',
  METADATA: 'metadata',
});

const Output = Object.freeze({
  ID: 'id',
  BUILD_ID: 'build-id',
  NAME: 'name',
  TYPE: 'type',
  TARGETS: 'targets',
  METADATA: 'metadata',
});

const Variable = Object.freeze({
  GITHUB_TOKEN: 'GITHUB_TOKEN',
  NULLPLATFORM_ACCESS_TOKEN: 'NULLPLATFORM_ACCESS_TOKEN',
});

module.exports = {
  Input,
  Output,
  Variable,
  ActionType,
};
