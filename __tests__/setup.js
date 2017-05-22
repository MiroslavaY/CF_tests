jest.mock('react-native-google-signin', () => {});

jest.mock('NetInfo', () => {
  const isConnected = {};
  isConnected.connection = true;
  isConnected.fetch = jest.fn(() => new Promise((resolve) => {
    resolve(isConnected.connection);
  }));

  return {isConnected}
});

jest.mock('Alert', () => ({alert: jest.fn()}));

jest.mock('NativeEventEmitter', () => new Function());

jest.mock('react-native-simple-store', () => {

  const store = {};

  return AsyncStorage = {
    save: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        store[item] = value;
        resolve(value);
      });
    }),
    get: jest.fn(item => {
      return new Promise((resolve, reject) => {
        resolve(store[item]);
      });
    }),
    delete: jest.fn((item) => {
      return new Promise((resolve, reject) => {
        resolve(delete store[item]);
      });
    }),
  }
});

jest.mock('NativeModules', () => {
  const store = [],
    screens = [],
    screensGA = [],
    tokenStore = [{key: 'AccessToken', value: 'TokenValue'}];
  return {
    GAManager: {
      trackScreenView: jest.fn(name => screensGA.push(name)),
    },
    PiwikTrackerManager: {
      trackScreen: jest.fn(name => screens.push(name)),
      trackEvent: jest.fn((category, action, name, value) => (
        store.push({category, action, name, value})
      )),
    },
    TokenStorageManager: {
      getAppToken: jest.fn((key, callback) => {
        const token = tokenStore.find(elem => elem.key === key);
        callback(token);
      }),
      saveAppToken: jest.fn((key, value) => tokenStore.push({key, value})),
    },
    store,
    screens,
    screensGA,
    tokenStore
  };
});
