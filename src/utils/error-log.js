import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

export function setupErrorLog(app) {
  if (!checkNeed()) return
  app.config.errorHandler = (err, instance, info) => {
    Promise.resolve().then(() => {
      store.dispatch('errorLog/addErrorLog', {
        err,
        vm: instance,
        info,
        url: window.location.href
      })
      console.error(err, info)
    })
  }
}
