import { Store } from '@tanstack/solid-store'
import pkg from '../../package.json'

export const NAV_HEIGHT = 65

export const APP = {
  GITHUB_URL: pkg.repository.url,
  HOME_PAGE: pkg.homepage,
  SHORT_NAME: pkg.name,
  LONG_NAME: pkg.name
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' '),
}

export const categoryMap: Record<string, string> = {
  calculs: 'Calculs',
  generalites: 'Généralités',
  ressources: 'Ressources',
  cours: 'Cours Académiques',
  research: 'Recherches',
}

export const categoriesKeys = Object.keys(categoryMap) as [string, ...string[]]

export const store = new Store({
  sideNavOpen: false,
})
