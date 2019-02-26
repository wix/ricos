/* eslint-disable */

const babelHelpers = {};

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    babelHelpers.typeof = _typeof = function(obj) {
      return typeof obj;
    };
  } else {
    babelHelpers.typeof = _typeof = function(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }

  return _typeof(obj);
}

babelHelpers.typeof = _typeof;
let REACT_ELEMENT_TYPE;

function _createRawReactElement(type, props, key, children) {
  if (!REACT_ELEMENT_TYPE) {
    REACT_ELEMENT_TYPE =
      (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) || 0xeac7;
  }

  const defaultProps = type && type.defaultProps;
  const childrenLength = arguments.length - 3;

  if (!props && childrenLength !== 0) {
    props = {
      children: void 0,
    };
  }

  if (props && defaultProps) {
    for (const propName in defaultProps) {
      if (props[propName] === void 0) {
        props[propName] = defaultProps[propName];
      }
    }
  } else if (!props) {
    props = defaultProps || {};
  }

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = new Array(childrenLength);

    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 3];
    }

    props.children = childArray;
  }

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key: key === undefined ? null : '' + key,
    ref: null,
    props,
    _owner: null,
  };
}

babelHelpers.jsx = _createRawReactElement;

function _asyncIterator(iterable) {
  let method;

  if (typeof Symbol === 'function') {
    if (Symbol.asyncIterator) {
      method = iterable[Symbol.asyncIterator];
      if (method != null) {
        return method.call(iterable);
      }
    }

    if (Symbol.iterator) {
      method = iterable[Symbol.iterator];
      if (method != null) {
        return method.call(iterable);
      }
    }
  }

  throw new TypeError('Object is not async iterable');
}

babelHelpers.asyncIterator = _asyncIterator;

function _AwaitValue(value) {
  this.wrapped = value;
}

babelHelpers.AwaitValue = _AwaitValue;

function AsyncGenerator(gen) {
  let front, back;

  function send(key, arg) {
    return new Promise((resolve, reject) => {
      let request = {
        key,
        arg,
        resolve,
        reject,
        next: null,
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      const result = gen[key](arg);
      const value = result.value;
      const wrappedAwait = value instanceof babelHelpers.AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(
        arg => {
          if (wrappedAwait) {
            resume('next', arg);
            return;
          }

          settle(result.done ? 'return' : 'normal', arg);
        },
        err => {
          resume('throw', err);
        }
      );
    } catch (err) {
      settle('throw', err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case 'return':
        front.resolve({
          value,
          done: true,
        });
        break;

      case 'throw':
        front.reject(value);
        break;

      default:
        front.resolve({
          value,
          done: false,
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== 'function') {
    this.return = undefined;
  }
}

if (typeof Symbol === 'function' && Symbol.asyncIterator) {
  AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
    return this;
  };
}

AsyncGenerator.prototype.next = function(arg) {
  return this._invoke('next', arg);
};

AsyncGenerator.prototype.throw = function(arg) {
  return this._invoke('throw', arg);
};

AsyncGenerator.prototype.return = function(arg) {
  return this._invoke('return', arg);
};

babelHelpers.AsyncGenerator = AsyncGenerator;

function _wrapAsyncGenerator(fn) {
  return function() {
    return new babelHelpers.AsyncGenerator(fn.apply(this, arguments));
  };
}

babelHelpers.wrapAsyncGenerator = _wrapAsyncGenerator;

function _awaitAsyncGenerator(value) {
  return new babelHelpers.AwaitValue(value);
}

babelHelpers.awaitAsyncGenerator = _awaitAsyncGenerator;

function _asyncGeneratorDelegate(inner, awaitWrap) {
  let iter = {},
    waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(resolve => {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value),
    };
  }

  if (typeof Symbol === 'function' && Symbol.iterator) {
    iter[Symbol.iterator] = function() {
      return this;
    };
  }

  iter.next = function(value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump('next', value);
  };

  if (typeof inner.throw === 'function') {
    iter.throw = function(value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump('throw', value);
    };
  }

  if (typeof inner.return === 'function') {
    iter.return = function(value) {
      return pump('return', value);
    };
  }

  return iter;
}

babelHelpers.asyncGeneratorDelegate = _asyncGeneratorDelegate;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    let self = this,
      args = arguments;
    return new Promise((resolve, reject) => {
      let gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }

      _next(undefined);
    });
  };
}

babelHelpers.asyncToGenerator = _asyncToGenerator;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

babelHelpers.classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) {
      descriptor.writable = true;
    }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) {
    _defineProperties(Constructor.prototype, protoProps);
  }
  if (staticProps) {
    _defineProperties(Constructor, staticProps);
  }
  return Constructor;
}

babelHelpers.createClass = _createClass;

function _defineEnumerableProperties(obj, descs) {
  for (const key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ('value' in desc) {
      desc.writable = true;
    }
    Object.defineProperty(obj, key, desc);
  }

  if (Object.getOwnPropertySymbols) {
    const objectSymbols = Object.getOwnPropertySymbols(descs);

    for (let i = 0; i < objectSymbols.length; i++) {
      const sym = objectSymbols[i];
      var desc = descs[sym];
      desc.configurable = desc.enumerable = true;
      if ('value' in desc) {
        desc.writable = true;
      }
      Object.defineProperty(obj, sym, desc);
    }
  }

  return obj;
}

babelHelpers.defineEnumerableProperties = _defineEnumerableProperties;

function _defaults(obj, defaults) {
  const keys = Object.getOwnPropertyNames(defaults);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
}

babelHelpers.defaults = _defaults;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

babelHelpers.defineProperty = _defineProperty;

function _extends() {
  babelHelpers.extends = _extends =
    Object.assign ||
    function(target) {
      for (let i = 1; i < arguments.length; i++) {
        const source = arguments[i];

        for (const key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

babelHelpers.extends = _extends;

function _objectSpread(target) {
  for (let i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    let ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(sym => {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }

    ownKeys.forEach(key => {
      babelHelpers.defineProperty(target, key, source[key]);
    });
  }

  return target;
}

babelHelpers.objectSpread = _objectSpread;

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) {
    babelHelpers.setPrototypeOf(subClass, superClass);
  }
}

babelHelpers.inherits = _inherits;

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

babelHelpers.inheritsLoose = _inheritsLoose;

function _getPrototypeOf(o) {
  babelHelpers.getPrototypeOf = _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

babelHelpers.getPrototypeOf = _getPrototypeOf;

function _setPrototypeOf(o, p) {
  babelHelpers.setPrototypeOf = _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

babelHelpers.setPrototypeOf = _setPrototypeOf;

function isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) {
    return false;
  }
  if (Reflect.construct.sham) {
    return false;
  }
  if (typeof Proxy === 'function') {
    return true;
  }

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], () => {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    babelHelpers.construct = _construct = Reflect.construct;
  } else {
    babelHelpers.construct = _construct = function _construct(Parent, args, Class) {
      const a = [null];
      a.push.apply(a, args);
      const Constructor = Function.bind.apply(Parent, a);
      const instance = new Constructor();
      if (Class) {
        babelHelpers.setPrototypeOf(instance, Class.prototype);
      }
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

babelHelpers.construct = _construct;

function _wrapNativeSuper(Class) {
  const _cache = typeof Map === 'function' ? new Map() : undefined;

  babelHelpers.wrapNativeSuper = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null) {
      return null;
    }

    if (typeof Class !== 'function') {
      throw new TypeError('Super expression must either be null or a function');
    }

    if (typeof _cache !== 'undefined') {
      if (_cache.has(Class)) {
        return _cache.get(Class);
      }

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return babelHelpers.construct(
        Class,
        arguments,
        babelHelpers.getPrototypeOf(this).constructor
      );
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    return babelHelpers.setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

babelHelpers.wrapNativeSuper = _wrapNativeSuper;

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

babelHelpers.instanceof = _instanceof;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : {
        default: obj,
      };
}

babelHelpers.interopRequireDefault = _interopRequireDefault;

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    const newObj = {};

    if (obj != null) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

babelHelpers.interopRequireWildcard = _interopRequireWildcard;

function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError('Cannot instantiate an arrow function');
  }
}

babelHelpers.newArrowCheck = _newArrowCheck;

function _objectDestructuringEmpty(obj) {
  if (obj == null) {
    throw new TypeError('Cannot destructure undefined');
  }
}

babelHelpers.objectDestructuringEmpty = _objectDestructuringEmpty;

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) {
    return {};
  }
  const target = {};
  const sourceKeys = Object.keys(source);
  let key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) {
      continue;
    }
    target[key] = source[key];
  }

  return target;
}

babelHelpers.objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) {
    return {};
  }
  const target = babelHelpers.objectWithoutPropertiesLoose(source, excluded);
  let key, i;

  if (Object.getOwnPropertySymbols) {
    const sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) {
        continue;
      }
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) {
        continue;
      }
      target[key] = source[key];
    }
  }

  return target;
}

babelHelpers.objectWithoutProperties = _objectWithoutProperties;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

babelHelpers.assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  }

  return babelHelpers.assertThisInitialized(self);
}

babelHelpers.possibleConstructorReturn = _possibleConstructorReturn;

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = babelHelpers.getPrototypeOf(object);
    if (object === null) {
      break;
    }
  }

  return object;
}

babelHelpers.superPropBase = _superPropBase;

function _get(target, property, receiver) {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    babelHelpers.get = _get = Reflect.get;
  } else {
    babelHelpers.get = _get = function _get(target, property, receiver) {
      const base = babelHelpers.superPropBase(target, property);
      if (!base) {
        return;
      }
      const desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

babelHelpers.get = _get;

function set(target, property, value, receiver) {
  if (typeof Reflect !== 'undefined' && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set(target, property, value, receiver) {
      const base = babelHelpers.superPropBase(target, property);
      let desc;

      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc.writable) {
          return false;
        }
      }

      desc = Object.getOwnPropertyDescriptor(receiver, property);

      if (desc) {
        if (!desc.writable) {
          return false;
        }

        desc.value = value;
        Object.defineProperty(receiver, property, desc);
      } else {
        babelHelpers.defineProperty(receiver, property, value);
      }

      return true;
    };
  }

  return set(target, property, value, receiver);
}

function _set(target, property, value, receiver, isStrict) {
  const s = set(target, property, value, receiver || target);

  if (!s && isStrict) {
    throw new Error('failed to set property');
  }

  return value;
}

babelHelpers.set = _set;

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(
    Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw),
      },
    })
  );
}

babelHelpers.taggedTemplateLiteral = _taggedTemplateLiteral;

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

babelHelpers.taggedTemplateLiteralLoose = _taggedTemplateLiteralLoose;

function _temporalRef(val, name) {
  if (val === babelHelpers.temporalUndefined) {
    throw new ReferenceError(name + ' is not defined - temporal dead zone');
  } else {
    return val;
  }
}

babelHelpers.temporalRef = _temporalRef;

function _readOnlyError(name) {
  throw new Error('"' + name + '" is read-only');
}

babelHelpers.readOnlyError = _readOnlyError;

function _classNameTDZError(name) {
  throw new Error('Class "' + name + '" cannot be referenced in computed property keys.');
}

babelHelpers.classNameTDZError = _classNameTDZError;
babelHelpers.temporalUndefined = {};

function _slicedToArray(arr, i) {
  return (
    babelHelpers.arrayWithHoles(arr) ||
    babelHelpers.iterableToArrayLimit(arr, i) ||
    babelHelpers.nonIterableRest()
  );
}

babelHelpers.slicedToArray = _slicedToArray;

function _slicedToArrayLoose(arr, i) {
  return (
    babelHelpers.arrayWithHoles(arr) ||
    babelHelpers.iterableToArrayLimitLoose(arr, i) ||
    babelHelpers.nonIterableRest()
  );
}

babelHelpers.slicedToArrayLoose = _slicedToArrayLoose;

function _toArray(arr) {
  return (
    babelHelpers.arrayWithHoles(arr) ||
    babelHelpers.iterableToArray(arr) ||
    babelHelpers.nonIterableRest()
  );
}

babelHelpers.toArray = _toArray;

function _toConsumableArray(arr) {
  return (
    babelHelpers.arrayWithoutHoles(arr) ||
    babelHelpers.iterableToArray(arr) ||
    babelHelpers.nonIterableSpread()
  );
}

babelHelpers.toConsumableArray = _toConsumableArray;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

babelHelpers.arrayWithoutHoles = _arrayWithoutHoles;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) {
    return arr;
  }
}

babelHelpers.arrayWithHoles = _arrayWithHoles;

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  ) {
    return Array.from(iter);
  }
}

babelHelpers.iterableToArray = _iterableToArray;

function _iterableToArrayLimit(arr, i) {
  const _arr = [];
  let _n = true;
  let _d = false;
  let _e;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) {
        break;
      }
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i.return != null) {
        _i.return();
      }
    } finally {
      if (_d) {
        throw _e;
      }
    }
  }

  return _arr;
}

babelHelpers.iterableToArrayLimit = _iterableToArrayLimit;

function _iterableToArrayLimitLoose(arr, i) {
  const _arr = [];

  for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done; ) {
    _arr.push(_step.value);

    if (i && _arr.length === i) {
      break;
    }
  }

  return _arr;
}

babelHelpers.iterableToArrayLimitLoose = _iterableToArrayLimitLoose;

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

babelHelpers.nonIterableSpread = _nonIterableSpread;

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

babelHelpers.nonIterableRest = _nonIterableRest;

function _skipFirstGeneratorNext(fn) {
  return function() {
    const it = fn.apply(this, arguments);
    it.next();
    return it;
  };
}

babelHelpers.skipFirstGeneratorNext = _skipFirstGeneratorNext;

function _toPropertyKey(key) {
  if (typeof key === 'symbol') {
    return key;
  } else {
    return String(key);
  }
}

babelHelpers.toPropertyKey = _toPropertyKey;

function _initializerWarningHelper(descriptor, context) {
  throw new Error(
    'Decorating class property failed. Please ensure that ' +
      'proposal-class-properties is enabled and set to use loose mode. ' +
      'To use proposal-class-properties in spec mode with decorators, wait for ' +
      'the next major version of decorators in stage 2.'
  );
}

babelHelpers.initializerWarningHelper = _initializerWarningHelper;

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) {
    return;
  }
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
  });
}

babelHelpers.initializerDefineProperty = _initializerDefineProperty;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  let desc = {};
  Object['ke' + 'ys'](descriptor).forEach(key => {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators
    .slice()
    .reverse()
    .reduce((desc, decorator) => {
      return decorator(target, property, desc) || desc;
    }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

babelHelpers.applyDecoratedDescriptor = _applyDecoratedDescriptor;
let id = 0;

function _classPrivateFieldKey(name) {
  return '__private_' + id++ + '_' + name;
}

babelHelpers.classPrivateFieldLooseKey = _classPrivateFieldKey;

function _classPrivateFieldBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError('attempted to use private field on non-instance');
  }

  return receiver;
}

babelHelpers.classPrivateFieldLooseBase = _classPrivateFieldBase;

function _classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError('attempted to get private field on non-instance');
  }

  return privateMap.get(receiver).value;
}

babelHelpers.classPrivateFieldGet = _classPrivateFieldGet;

function _classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError('attempted to set private field on non-instance');
  }

  const descriptor = privateMap.get(receiver);

  if (!descriptor.writable) {
    throw new TypeError('attempted to set read only private field');
  }

  descriptor.value = value;
  return value;
}

babelHelpers.classPrivateFieldSet = _classPrivateFieldSet;
babelHelpers;
