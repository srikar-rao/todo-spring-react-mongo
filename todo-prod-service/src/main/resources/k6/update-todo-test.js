import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export let options = {
  vus: 2, // Two virtual users
  iterations: 2, // Each user runs once
};

const payload = JSON.stringify({
  id: 3,
  title: "test",
  description: "test2",
  status: "PENDING",
  version: 0,
  createdAt: null,
  createdBy: "system",
  updatedAt: "2025-05-01T17:48:45.814900Z",
  updatedBy: "system",
  localeCreatedAt: null,
  localeUpdatedAt: null,
  tasks: [],
  completed: false
});

const headers = {
  'Content-Type': 'application/json',
  'Cookie': 'JSESSIONID=4657909C78C5925A057386C161C44C96',
};

export default function () {
  const res = http.put('http://localhost:8080/todo-service/todo/update', payload, { headers });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body is not empty': (r) => r.body && r.body.length > 0,
  });

  sleep(1); // simulate user think-time
}
