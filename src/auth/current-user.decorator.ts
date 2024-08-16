/* eslint-disable prettier/prettier */

import { createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

const getCurrentUserByContext = (context: ExecutionContextHost) =>{
	return context.switchToHttp().getRequest().user
}

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContextHost) => getCurrentUserByContext(context))