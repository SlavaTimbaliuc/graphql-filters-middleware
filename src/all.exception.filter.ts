import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost, GqlExecutionContext } from '@nestjs/graphql';
import { lvtLogger } from './logger';

/*
More about Exception Filters:
https://docs.nestjs.com/exception-filters
*/

@Catch()
export class GqlGlobalExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const gqlHost = GqlArgumentsHost.create(host);
    lvtLogger.error('Exception occurred:', { exception: exception, request_body: gqlHost.getContext().req.body });

    // With GqlExceptionFilter, returning the exception is the correct way to handle it
    return exception;
  }
}