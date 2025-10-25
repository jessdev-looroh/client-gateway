// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Reflector } from '@nestjs/core';

// /**
//  * Anonymous Guard for allowing anonymous users to access certain routes
//  * Validates anonymous tokens and allows access to purchase flow
//  */
// @Injectable()
// export class AnonymousGuard extends AuthGuard('anonymous') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   /**
//    * Determines if the route allows anonymous access
//    * @param context - Execution context
//    * @returns Boolean indicating if anonymous access is allowed
//    */
//   canActivate(context: ExecutionContext) {
//     const allowAnonymous = this.reflector.getAllAndOverride<boolean>('allowAnonymous', [
//       context.getHandler(),
//       context.getClass(),
//     ]);
    
//     if (allowAnonymous) {
//       return true;
//     }
    
//     return super.canActivate(context);
//   }
// }
