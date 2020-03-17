import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

const storage = new Storage({
  storageBackend: AsyncStorage
})

export default storage
