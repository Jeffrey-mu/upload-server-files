'use strict'
import client from 'scp2'
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
  // @ts-expect-error
  if (!localPath) {
    console.log(chalk.green('本地路径不可为空！'))
    return
  }
  client.scp(
    localPath,
    options,
    (err: string) => {
      spinner.stop()
      if (!err) {
        console.log(`${+new Date() - start}ms`)
        console.log(chalk.green('项目发布完毕!'))
      }
      else {
        console.log(chalk.red('发布失败！'), err)
      }
    },
  )
}
