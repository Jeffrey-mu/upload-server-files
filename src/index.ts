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
    log('grey', '本地路径不可为空！')
    return
  }
  scp(
    localPath,
    options,
    (err?: Error) => {
      spinner.stop()
      if (!err) {
        log('yellow', `${+new Date() - start}ms`)
        log('green', '项目发布完毕')
      }
      else {
        log('red', '发布失败！')
      }
    },
  )
}

function log(color: Color, text: string) {
  const spinner = ora(chalk[color](text))
  spinner.start()
  spinner.stop()
}

type Color =
  'visible'
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgGray'
  | 'bgGrey'
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright'
