import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20,
  stages: [
    { duration: '10s', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['avg<7000'],
  },
};

export default function () {
  http.get('https://automaticityacademy.ngrok.app/api/v1/products', {
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXV0b21hdGljaXR5YWNhZGVteS5uZ3Jvay5hcHAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3NDA2NzY5NzQsImV4cCI6MTc0MDY4MDU3NCwibmJmIjoxNzQwNjc2OTc0LCJqdGkiOiI1Sm1xWmZXTFdpbnJDanhsIiwic3ViIjoiMTMwNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.vVoAnVieJj3wmMvWX7frOoRmkdFPt-UW0GjkQ7MOwRU',
    },
  });
  sleep(1);
}
