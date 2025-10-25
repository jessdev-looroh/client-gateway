// import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtGuard } from './jwt.guard';
// import { AnonymousGuard } from './anonymous.guard';

// /**
//  * Flexible Guard that allows both authenticated and anonymous users
//  * Perfect for purchase flow where users can be either registered or anonymous
//  */
// @Injectable()
// export class FlexibleGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private jwtGuard: JwtGuard,
//     private anonymousGuard: AnonymousGuard,
//   ) {}

//   /**
//    * Determines if the route allows flexible access (authenticated or anonymous)
//    * @param context - Execution context
//    * @returns Boolean indicating if access is allowed
//    */
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const allowAnonymous = this.reflector.getAllAndOverride<boolean>('allowAnonymous', [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     // If route is public, allow access
//     if (isPublic) {
//       return true;
//     }

//     // If route allows anonymous, try both guards
//     if (allowAnonymous) {
//       try {
//         // Try JWT authentication first
//         const jwtResult = await this.jwtGuard.canActivate(context);
//         if (jwtResult) {
//           return true;
//         }
//       } catch (error) {
//         // JWT failed, try anonymous
//       }

//       try {
//         // Try anonymous authentication
//         const anonymousResult = await this.anonymousGuard.canActivate(context);
//         if (anonymousResult) {
//           return true;
//         }
//       } catch (error) {
//         // Both failed
//         return false;
//       }
//     }

//     // Default to JWT authentication
//     return this.jwtGuard.canActivate(context);
//   }
// }
