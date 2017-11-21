import get from 'lodash/get';

const fetchComponent = (components, code) => {
  for (let comp in components) {
    const types = get(components[comp], 'types', []);
    if (types.includes(code)) {
      return components[comp]["long_name"];
    }
  }

  return `${code} not found`;
};

export default fetchComponent;
