'use client';

import { AppDispatch, AppStore, ReduxStates } from '@redux/store';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<ReduxStates>();
export const useAppStore = useStore.withTypes<AppStore>();
