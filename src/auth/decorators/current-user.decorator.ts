// import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// /**
//  * Decorator to extract the current user from the request
//  * @param data - Optional property to extract from user object
//  * @param ctx - Execution context
//  * @returns User object or specific property
//  */
// export const CurrentUser = createParamDecorator(
//   (data: string | undefined, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const user = request.user;

//     if (!user) {
//       return null;
//     }

//     return data ? user[data] : user;
//   },
// );
