import { Component } from 'react';
import { IBaseAppProps, IBaseApp } from '@interfaces/apps/base';

interface IAppPageProps extends IBaseAppProps {}

interface IAppPage<P = {}> extends IBaseApp<P> {}
