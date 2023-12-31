import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signToken(sub: string) {
    return this.jwtService.signAsync({ sub })
  }
}
