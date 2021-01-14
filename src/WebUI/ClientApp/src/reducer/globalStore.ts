import React from 'react';
import { createStore } from 'redux';
import {reducer} from './Todo/TodoReducer';

export const store = createStore(reducer);