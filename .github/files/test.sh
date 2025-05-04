#!/bin/bash

set -eo pipefail

BASE="$PWD"

EXIT=0
DIR="$(dirname "$FILE")"
cd "$DIR"
echo "::group::$FILE - composer install"
pwd
echo "::endgroup::"
echo "::group::$FILE - composer update"
"$BASE/tools/composer-update-monorepo.sh" --root-reqs .
echo "::endgroup::"
echo "---" # Bracket message containing newlines for better visibility in GH's logs.
echo "::error file=$FILE::$FILE is not up to date!%0AYou can probably fix this by running \`tools/composer-update-monorepo.sh --root-reqs \"${DIR}\"\`."
echo "---"
EXIT=1
cd "$BASE"

exit $EXIT
