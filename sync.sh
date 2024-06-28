cd hasura
hasura metadata apply --admin-secret hasurasecret --skip-update-check
hasura migrate apply --admin-secret hasurasecret --skip-update-check