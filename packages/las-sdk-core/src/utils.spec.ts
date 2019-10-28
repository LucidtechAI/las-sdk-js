import { buildURL } from './utils';


test('Builds URL', () => {
  const fixtures = [
    ['http://localhost/', 'http://localhost/'],
    ['http://localhost/?key=value', 'http://localhost/', { key: 'value' }],
    ['http://localhost/?key1=value1&key2=value2', 'http://localhost/', { key1: 'value1', key2: 'value2' }],
    ['http://localhost/?key=value1%2Cvalue2', 'http://localhost/', { key: ['value1', 'value2'] }],
    ['http://localhost/?key=value1+value2+value3', 'http://localhost/', { key: 'value1 value2 value3' }],
    ['http://localhost/?key=value1%2Bvalue2', 'http://localhost/', { key: 'value1+value2' }],
    ['http://localhost/?key=%2Basdf%2Fqwerty%3D', 'http://localhost/', { key: '+asdf/qwerty=' }],
  ];

  fixtures.forEach((fixture: any[]) => {
    const [expected, ...data] = fixture;
    const [url, params] = data;
    expect(buildURL(url, params)).toBe(expected);
  });
});
