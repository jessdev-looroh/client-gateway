import { SetMetadata } from '@nestjs/common';

/**
 * Decorator to specify required roles for a route
 * @param roles - Array of roles required to access the route
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
