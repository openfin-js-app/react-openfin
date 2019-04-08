import Enzyme from'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new Adapter()});

import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';

Dexie.dependencies.indexedDB = indexedDB;
Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');