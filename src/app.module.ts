import { Module } from '@nestjs/common'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'node:path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UploadModule } from './upload/upload.module'
import { UsersModule } from './modules/users/users.module'
import { CourseModule } from './modules/course/course.module'
import { LessonsModule } from './modules/lessons/lessons.module'

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UploadModule,
    UsersModule,
    CourseModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
