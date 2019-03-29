import { Observable } from 'rxjs';

export interface IServices
{
    get(): Promise<any> | Observable<any>;

    add(obj): Promise<any> | Observable<any>;

    update(index: number, obj): Promise<any> | Observable<any>;

    delete(index: number, obj): Promise<any> | Observable<any>;
}
