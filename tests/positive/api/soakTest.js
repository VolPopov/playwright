import http from 'k6/http';
import { check, sleep, group } from 'k6';

export let options = {
  vus: 10,
  stages: [
    { duration: '10s', target: 50 },
    { duration: '10m', target: 50 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['avg<7000'],
  },
};

export default function () {
  group('API stress test', function () {
    group('Get products', function () {
      let res = http.get(
        'https://automaticityacademy.ngrok.app/api/v1/products',
        {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXV0b21hdGljaXR5YWNhZGVteS5uZ3Jvay5hcHAvYXBpL3YxL2F1dGgvcmVnaXN0ZXIiLCJpYXQiOjE3NDA2ODQ4MTEsImV4cCI6MTc0MDY4ODQxMSwibmJmIjoxNzQwNjg0ODExLCJqdGkiOiIyQ2pwaTNDUTRZZG1DV05KIiwic3ViIjoiMTMwOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.KdQ8OwDu5agUowLBO0RIzjJ4UaWMWvAb-As1bDxjJGY',
          },
        }
      );

      let response;

      try {
        response = res.json();
      } catch (e) {
        console.error('Error in parsing JSON', e);
        response = {};
      }

      check(res, {
        'status code is 200': r => r.status === 200,
        'Status is success': () => response.status === 'Success',
      });
    });
    group('Get user info', function () {
      let res = http.post(
        'https://automaticityacademy.ngrok.app/api/v1/auth/profile',
        {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXV0b21hdGljaXR5YWNhZGVteS5uZ3Jvay5hcHAvYXBpL3YxL2F1dGgvcmVnaXN0ZXIiLCJpYXQiOjE3NDA2ODQ4MTEsImV4cCI6MTc0MDY4ODQxMSwibmJmIjoxNzQwNjg0ODExLCJqdGkiOiIyQ2pwaTNDUTRZZG1DV05KIiwic3ViIjoiMTMwOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.KdQ8OwDu5agUowLBO0RIzjJ4UaWMWvAb-As1bDxjJGY',
          },
        }
      );
      check(res, {
        'status code is 200': r => r.status === 200,
      });
    });
  });

  sleep(1);
}
