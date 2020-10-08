import AOS from 'aos'

import 'aos/dist/aos.css'

export default ({ app }) => {
  // Disables AOS when the user is on a phone.
  app.AOS = new AOS.init({ disable: 'phone' })
}
