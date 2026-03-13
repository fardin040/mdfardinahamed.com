import { spawnSync } from 'node:child_process'

const hasTinaCloudCredentials = Boolean(
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN
)

function runStep(command, args, env = process.env) {
  return spawnSync(command, args, {
    stdio: 'inherit',
    env,
  })
}

let tinaEnabledForBuild = false

if (hasTinaCloudCredentials) {
  const tinaBuild = runStep('npx', ['tinacms', 'build'])

  if (tinaBuild.status === 0) {
    tinaEnabledForBuild = true
  } else {
    console.warn('\nTina build failed. Falling back to a website-only Next.js build.')
    console.warn('The site will still deploy, but the Tina admin app may remain unavailable until Tina Cloud finishes indexing the current schema.\n')
  }
}

const nextBuild = runStep('npx', ['next', 'build'], {
  ...process.env,
  NEXT_PUBLIC_TINA_ENABLED: tinaEnabledForBuild ? 'true' : 'false',
})

if (nextBuild.status !== 0) {
  process.exit(nextBuild.status ?? 1)
}
