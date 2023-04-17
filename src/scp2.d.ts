declare module 'scp2' {
  import type { Client, ConnectConfig } from 'ssh2'

  interface Options extends ConnectConfig {
    file?: FileSpec
    path?: string
    watch?: boolean
    confirm?: boolean
    recursive?: boolean
    concurrency?: number
    tick?: (localPath: string, remotePath: string, error: Error | null) => void
    step?: (totalTransferred: number, chunk: number, total: number) => void
    privateKey?: string | Buffer
    passphrase?: string
    agentForward?: boolean
    agent?: string
    agentCommand?: string
    agentForwardIdentities?: boolean
    dstPort?: number
    srcPort?: number
    sshConfig?: any
    strictVendor?: boolean
    algorithms?: Algorithms
  }

  interface FileSpec {
    source: string
    destination: string
  }

  interface Algorithms {
    kex?: string[]
    cipher?: string[]
    serverHostKey?: string[]
    hmac?: string[]
  }

  function scp(
    src: string,
    dest: string,
    opts: Options,
    cb: (err?: Error) => void
  ): void

  function scp(
    file: string,
    opts: Options,
    cb: (err?: Error) => void
  ): void

  class ClientWrapper {
    client: Client
    scp: typeof scp // 显式声明 scp 方法
    constructor(config: ConnectConfig)
    close(): void
  }

  export default function createClient(opt: ConnectConfig): Promise<ClientWrapper>
}
