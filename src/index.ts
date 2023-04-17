'use strict'
import { scp } from 'scp2'
import ora from 'ora'
import chalk from 'chalk'
interface Options {
  host: string
  username: string
  password: string
  path: string
}
export default function dep(localPath: string, options: Options) {
  const start = +new Date()
  const spinner = ora(chalk.green('正在发布到服务器...'))
  spinner.start()
  if (!localPath) {
    ora(chalk.green('本地路径不可为空！'))
    return
  }
  scp(
    localPath,
    options,
    (err?: Error) => {
      spinner.stop()
      if (!err) {
        ora(`${+new Date() - start}ms`)
        ora(chalk.green('项目发布完毕!'))
      }
      else {
        ora(chalk.red('发布失败！'))
      }
    },
  )
}
