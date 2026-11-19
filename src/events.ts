/** Pre-selects a service in the contact form (listened to in Contact.tsx). */
export const SERVICE_EVENT = 'tmt:service'

export const selectService = (title: string) =>
  window.dispatchEvent(new CustomEvent<string>(SERVICE_EVENT, { detail: title }))
