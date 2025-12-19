// src/plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import icon yang mau dipakai
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper, faFileCode, faFilePdf } from '@fortawesome/free-regular-svg-icons'

// Tambahkan ke library
library.add(faHome, faUser, faNewspaper, faFileCode, faFilePdf)

export { FontAwesomeIcon }
