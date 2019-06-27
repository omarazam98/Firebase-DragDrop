docker run \
  -it\
  -p 5000:5000\
  -e REACT_APP_API_KEY=AIzaSyB9Na8lDi5Zr7p1Vg5Ov1jOzFwzkIfr04U\
  -e REACT_APP_AUTH_DOMAIN=mattias-s-winwindev.firebaseapp.com\
  -e REACT_APP_DATABASE_URL=https://mattias-s-winwindev.firebaseio.com\
  -e REACT_APP_PROJECT_ID=mattias-s-winwindev\
  -e REACT_APP_STORAGE_BUCKET=mattias-s-winwindev.appspot.com\
  -e REACT_APP_MESSAGING_SENDER_ID=906324729915\
  -e REACT_APP_APP_ID=1:906324729915:web:44f9b61a231c1a84\
  -e NODE_ENV=development\
  random_name\
  npm run serve
