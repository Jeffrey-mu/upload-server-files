'use strict'
import { scp } from 'scp2'
import ora from 'ora'
import chalk from 'chalk'
import log4js from 'log4js'
interface Options {
  host: string
  username: string
  password: string
  path: string
}
const logger = log4js.getLogger()
logger.level = 'debug'
export default function dep(localPath: string, options: Options) {
  const start = +new Date()
  const spinner = ora(chalk.green('正在发布到服务器...'))
  spinner.start()
  if (!localPath) {
    logger.info('本地路径不可为空！')
    return
  }
  scp(
    localPath,
    options,
    (err?: Error) => {
      spinner.stop()
      if (!err) {
        logger.warn(`${+new Date() - start}ms`)
        logger.info('项目发布完毕')
      }
      else {
        logger.error('发布失败！')
      }
    },
  )
}
