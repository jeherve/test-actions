const { setFailed, getInput, debug } = require( '@actions/core' );
const { context, getOctokit } = require( '@actions/github' );

( async function main() {
	debug( 'Our action is running' );

	const token = getInput( 'github_token' );
	if ( ! token ) {
		setFailed( 'Input `github_token` is required' );
		return;
	}

	// Get an instance of the Octokit client.
	const octokit = getOctokit( token );

	// Get info about the event.
	const { payload: { number, repository: { owner, name } } } = context;

	await octokit.rest.issues.addLabels( {
		owner: owner.login,
		repo: name,
		issue_number: number,
		labels: [ 'Issue triaged' ],
	} );
} )();