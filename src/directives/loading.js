import style from '@/styles/_loading.module.scss'

const loaders = []

export default {
  update(el, { modifiers, value }) {
    let loaderInfo = loaders.find(loader => loader.el === el)
    const { full } = modifiers

    if (!loaderInfo) {
      const loaderContainer = document.createElement('div')
      const loader = document.createElement('div')

      loaderContainer.classList.add(style.loaderContainer)

      if (full) {
        loaderContainer.classList.add(style.full)
      }

      loader.classList.add(style.loader)

      loaderContainer.appendChild(loader)

      loaderInfo = {
        el,
        loaderContainer,
      }
      loaders.push(loaderInfo)
    }

    if (value) {
      el.appendChild(loaderInfo.loaderContainer)
    } else if (el.contains(loaderInfo.loaderContainer)) {
      el.removeChild(loaderInfo.loaderContainer)
    }
  },
  unbind(el) {
    let loaderInfo = loaders.find(loader => loader.el === el)

    if (loaderInfo) {
      el.removeChild(loaderInfo.loaderContainer)
      loaders.splice(loaderInfo, 1)
    }
  },
}
