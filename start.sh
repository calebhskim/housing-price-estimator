node ./public/template.js $1 $2
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi
yarn run start
