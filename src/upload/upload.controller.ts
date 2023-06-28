/* eslint-disable no-undef */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
  StreamableFile,
  Param,
} from '@nestjs/common'
import { UploadService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'

import type { Request } from 'express'
import { join } from 'node:path'
import { createReadStream } from 'node:fs'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const fullUrl = req.protocol
      .concat('://')
      .concat(req.headers.host)
      .concat('/upload/')

    return this.uploadService.upload({ file, fullUrl })
  }

  @Get('/:path')
  getFile(@Param('path') path: string) {
    const file = createReadStream(join(process.cwd(), 'tmp', path))
    return new StreamableFile(file)
  }
}
