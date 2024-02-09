import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface classConstractore{
    new(...args:any[]): {} // this mean it is a class constructor function
    // that check  if the passed argument is an instance of the class itself.
}

export function  Serialize(dto: classConstractore) {
    return UseInterceptors(new SerializeInterceptors(dto));
}

export class SerializeInterceptors implements NestInterceptor{
    constructor(private dto:classConstractore){}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // // Run something before  a  request is handled.
        // // by the request handler
        // console.log("I am running before the handler",context);
        return handler.handle().pipe(
            map((data:any) => {
                // //Run something before the response is sent out
                // console.log( "I am running after the handler" , data );
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues:true
                    });
            }));
    }
}