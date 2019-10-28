import { buildURL } from './utils';


test('Builds URL', () => {
  const fixtures = [
    ['http://localhost/', 'http://localhost/'],
    ['http://localhost/?key=value', 'http://localhost/', { key: 'value' }],
    ['http://localhost/?key=value1,value2', 'http://localhost/', { key: ['value1', 'value2'] }],
    ['http://localhost/?key=value1%20value2%20value3', 'http://localhost/', { key: encodeURIComponent('value1 value2 value3') }],
    ['http://localhost/?key=+asdf/qwerty=', 'http://localhost/', { key: '+asdf/qwerty=' }],
  ];

  fixtures.forEach((fixture: any[]) => {
    const [expected, ...data] = fixture;
    const [url, params] = data;
    expect(buildURL(url, params)).toBe(expected);
  });
});
