node ./public/template.js $1
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi
yarn run start
