import http from 'k6/http';

export let options = {
  // insecureSkipTLSVerify: true,
  // noConnectionReuse: false,
  vus: 10,
  duration: '10s',
};

export default () => {
  http.get('https://httpbin.org/get');
};
