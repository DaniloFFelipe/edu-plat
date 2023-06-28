import { Injectable } from '@nestjs/common'
import { CreateModuleInput } from './dto/create-module.input'
import { CreateModule } from './usecases/create-module'

@Injectable()
export class ModulesService {
  constructor(private createModuleUS: CreateModule) {}

  create(createModuleInput: CreateModuleInput) {
    return this.createModuleUS.execute(createModuleInput)
  }
}
