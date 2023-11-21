import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}

  intercept(context: any, next: CallHandler): Observable<any> {
    const requestStartTime = Date.now();
    return next.handle().pipe(
      map((data) => {
        const requestEndTime = Date.now();

        const requestDuration = requestEndTime - requestStartTime;

        lastValueFrom(
          this.httpService.post('http://localhost:8765/logging', {
            duration: requestDuration,
            requestData: context?.body || {},
            responseData: data,
            httpStatus: context.statusCode,
          }),
        ).catch(() => {
          console.log('error');
        });

        return data;
      }),
    );
  }
}
