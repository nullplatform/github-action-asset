const dotenv = require('dotenv');
const core = require('@actions/core');
const HttpClient = require('./client');
const { isEmpty } = require('./validate');
const {
  Input, Output, ActionType,
} = require('./enums');

dotenv.config();

const inputToKey = (input) => (!isEmpty(input) ? input.replace(/-/g, '_') : null);

const client = new HttpClient();

const getAction = () => core.getInput(Input.ACTION);

const setFailed = (error) => {
  core.setFailed(error);
  process.exit(1);
};

const createAsset = () => {
  core.info('Validating inputs...');

  const buildId = core.getInput(Input.BUILD_ID);
  const name = core.getInput(Input.NAME);
  const type = core.getInput(Input.TYPE);
  const url = core.getInput(Input.URL);

  if (isEmpty(buildId)) {
    setFailed(`Input "${Input.BUILD_ID}" cannot be empty`);
  }

  if (isEmpty(type)) {
    setFailed(`Input "${Input.TYPE}" cannot be empty`);
  }

  if (isEmpty(url) && isEmpty(name)) {
    setFailed(`Input "${Input.NAME}" and ${Input.URL} cannot be both empty`);
  }

  const body = {
    [inputToKey(Input.BUILD_ID)]: parseInt(buildId, 10),
    [inputToKey(Input.TYPE)]: type,
    metadata: {},
  };

  if (!isEmpty(url)) {
    body[inputToKey(Input.URL)] = url;
  }

  if (!isEmpty(name)) {
    body[inputToKey(Input.NAME)] = name;
  }

  return client.post(`build/${buildId}/asset`, body);
};

async function run() {
  try {
    const action = getAction();
    let asset = null;
    if (action === ActionType.CREATE) {
      asset = await createAsset();
      core.info(`Successfully created asset with id "${asset.id}"`);
    } else if (action === ActionType.UPDATE) {
      core.setFailed(`Unsupported action type "${action}"`);
    } else {
      core.setFailed(`Invalid action type "${action}"`);
    }
    const {
      id,
      build_id: buildId,
      name,
      type,
      targets,
      metadata,
    } = asset;
    core.setOutput(Output.ID, id);
    core.setOutput(Output.BUILD_ID, buildId);
    core.setOutput(Output.NAME, name);
    core.setOutput(Output.TYPE, type);
    core.setOutput(Output.TARGETS, targets);
    core.setOutput(Output.METADATA, metadata);
  } catch (error) {
    core.setFailed(`Asset action failed: ${error.message}`);
  }
}

module.exports = run;
