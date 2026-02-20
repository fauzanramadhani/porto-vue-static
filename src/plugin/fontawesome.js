// src/plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import icon yang mau dipakai
import { faHome, faUser, faNewspaper as faNewspaperSolid, faIdBadge as faIdBadgeSolid } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper, faFileCode, faFilePdf, faIdBadge } from '@fortawesome/free-regular-svg-icons'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'

// Tambahkan ke library
library.add(
  faHome, faUser, faNewspaper, faNewspaperSolid, faFileCode, faFilePdf, faIdBadge,
  faIdBadgeSolid,
  faStackOverflow
)

export { FontAwesomeIcon }
