import { buildURL, BuildURLParams, pathId } from './utils';

describe('buildUrl', () => {
  test.each<[BuildURLParams | undefined, string, string]>([
    [undefined, 'http://localhost/', 'http://localhost/'],
    [{ key: 'value' }, 'http://localhost/', 'http://localhost/?key=value'],
    [{ key1: 'value1', key2: 'value2' }, 'http://localhost/', 'http://localhost/?key1=value1&key2=value2'],
    [{ key: ['value1', 'value2'] }, 'http://localhost/', 'http://localhost/?key=value1&key=value2'],
    [{ key: 'value1 value2 value3' }, 'http://localhost/', 'http://localhost/?key=value1+value2+value3'],
    [{ key: 'value1+value2' }, 'http://localhost/', 'http://localhost/?key=value1%2Bvalue2'],
    [{ key: '+asdf/qwerty=' }, 'http://localhost/', 'http://localhost/?key=%2Basdf%2Fqwerty%3D'],
    [{ key: true }, 'http://localhost/', 'http://localhost/?key=true'],
    [{ key: undefined }, 'http://localhost/', 'http://localhost/'],
    [{ key1: undefined, key2: undefined }, 'http://localhost/', 'http://localhost/'],
    [{}, 'http://localhost/', 'http://localhost/'],
  ])('builds correct url for: %o', async (params, url, expected) => {
    expect(buildURL(url, params)).toBe(expected);
  });
});

describe('pathId', () => {
  test.each([
    ['cradl:agent:abc', 'cradl:agent:abc'],
    ['cradl:agent:abc:3', 'cradl:agent:abc:3'],
    ['cradl:agent:abc:@prod', 'cradl:agent:abc:@prod'],
    ['cradl:agent:abc:$latest', 'cradl:agent:abc:$latest'],
    ['cradl:organization:cradl/cradl:function:f', 'cradl:organization:cradl%2Fcradl:function:f'],
    ['cradl:plan:per seat', 'cradl:plan:per%20seat'],
  ])('%s is %s in a path', (resourceId, expected) => {
    expect(pathId(resourceId)).toBe(expected);
  });
});
