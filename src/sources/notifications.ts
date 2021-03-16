export default function haveNotifications(): Promise<boolean> {
  if (!navigator.permissions) return Promise.resolve(false)
  if (typeof Notification === 'undefined') return Promise.resolve(false)
  return navigator.permissions.query({ name: 'notifications' }).then((permissionStatus) => {
    return 'denied' === Notification.permission && 'prompt' === permissionStatus.state
  })
}
