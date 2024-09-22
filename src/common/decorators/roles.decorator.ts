import { SetMetadata } from '@nestjs/common';
import { Role } from '../../schemas';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);