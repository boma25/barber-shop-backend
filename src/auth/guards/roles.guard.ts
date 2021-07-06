import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string[]>('roles', context.getHandler())
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user
    const matchRoles =(role:string[],userRole:string[])=>role === userRole
    return matchRoles(role,user.Role)
  }
}
