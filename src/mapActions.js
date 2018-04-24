import { send } from "./ws"

export const map = (actions = {}, remote = {}, parent = null) => {
  Object.keys(remote).forEach(name => {
    const action = remote[name]
    const key = parent ? `${parent}.${name}` : name

    if (typeof action === "function") {
      actions[name + "_done"] = action

      actions[name] = data => {
        const msg = [key, data]
        send(msg)
      }

      return
    }

    if (typeof action === "object") {
      actions[name] = map(actions[name], action, key)
      return
    }
  })

  return actions
}

export default map
