const { setFailed, getInput, debug } = require('@actions/core');
const { context, getOctokit } = require('@actions/github');

(async function main() {
	const token = getInput('github_token');
	if (!token) {
		setFailed('Input `github_token` is required');
		return;
	}

	// Get info about the event.
	const { payload, eventName } = context;

	// eslint-disable-next-line new-cap
	const octokit = new getOctokit( token );

	debug(`Received event = '${eventName}', action = '${payload.action}'`);

	// Trigger something when a Pull Request is opened.
	if (eventName === 'pull_request_target' && payload.action === 'opened') {
		debug('Pull Request opened');

		const { number, repository } = payload;
		const { owner, name } = repository;

		debug(`Add a label to PR #${number}`);
		await octokit.rest.issues.addLabels({
			owner: owner.login,
			repo: name,
			issue_number: number,
			labels: ['In Progress'],
		});
	}

	debug('Done.');
})();
