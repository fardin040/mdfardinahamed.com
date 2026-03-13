import { spawnSync } from 'node:child_process'

const hasTinaCloudCredentials = Boolean(
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN
)

const steps = hasTinaCloudCredentials
  ? [
      ['npx', ['tinacms', 'build']],
      ['npx', ['next', 'build']],
    ]
  : [['npx', ['next', 'build']]]

for (const [command, args] of steps) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: process.env,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
