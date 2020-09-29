module.exports = {
  name: 'new',
  alias: ['n'],
  description: '新建react-dva项目',
  run: async toolbox => {
    const {
      parameters,
      filesystem,
      system,
      prompt,
      patching,
      print: { info, success, spin }
    } = toolbox

    // info(parameters)
    const name = parameters.first

    const reactDvaRoot = filesystem.resolve(__dirname, '../apps/react-dva')
    const targetPath = filesystem.resolve(filesystem.cwd(), name)
    const packageJsonPath = filesystem.resolve(targetPath, `./package.json`)

    if (filesystem.exists(targetPath)) {
      const { replace } = await prompt.ask({
        type: 'select',
        name: 'replace',
        message: `${name} 文件夹已存在，是否替换`,
        choices: ['是', '否']
      })
      if (replace !== '是') {
        return info('创建中止！')
      }
      const spinDelete = spin(`删除文件夹 ${name} ...\n`)
      filesystem.remove(targetPath)
      info(`删除文件夹 ${name} 成功\n`)
      spinDelete.stop()
    }

    filesystem.copy(reactDvaRoot, targetPath, { overwrite: true })

    await patching.update(packageJsonPath, data => {
      data.name = name
      return data
    })

    const spinInstall = spin(`npm install ...`)

    const install = await system.run('npm i', {
      cwd: targetPath
    })

    info(install)
    spinInstall.stop()
    info(`npm install success!  \n`)

    success(`cd ${name} & npm start-test`)
  }
}
