import { IBaseAppProps, IBaseApp } from '@interfaces/apps/base';

interface IAuthAppProps extends IBaseAppProps {}

interface IAuthApp<P = {}> extends IBaseApp<P> {}

interface IAuthAppState {
    selectedType?: 'individual' | 'professional';
    bubbles?: any[];
}
