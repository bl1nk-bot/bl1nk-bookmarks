// Simple config stub for build compatibility
export async function getConfig() {
  return {
    auth: {
      providers: ['credentials'],
      provider: 'credentials'
    },
    homepage: {
      useCloneBranding: false
    }
  }
}