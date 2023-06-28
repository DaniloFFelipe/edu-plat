import { Injectable } from '@nestjs/common'

import { CreateUploadDto } from './dto/create-upload.dto'
import { rename } from 'node:fs/promises'
import { extname, join } from 'node:path'

@Injectable()
export class UploadService {
  async upload({ file, fullUrl }: CreateUploadDto) {
    const ext = extname(file.originalname)
    const filePath = join(__dirname, '..', '..', 'tmp', file.filename)
    const filePathFinal = join(
      __dirname,
      '..',
      '..',
      'tmp',
      `${file.filename}${ext}`,
    )
    await rename(filePath, filePathFinal)
    const fileUrl = fullUrl.concat(`${file.filename}${ext}`)

    return { fileUrl }
  }
}
