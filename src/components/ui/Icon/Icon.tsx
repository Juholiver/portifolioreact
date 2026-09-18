/* eslint-disable react-refresh/only-export-components */
import type { JSX } from 'react'

type IconName =
  | 'winterforge'
  | 'gift'
  | 'paw'
  | 'burger'
  | 'code'
  | 'weather'
  | 'globe'
  | 'kanban'
  | 'chef'
  | 'palette'
  | 'dumbbell'
  | 'database'

const paths: Record<IconName, JSX.Element> = {
  winterforge: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 11L18 6L24 11V17L18 22L12 17V11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 22V28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 9L7 7M27 7L29 9M18 3V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
  gift: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="7" y="13" width="22" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 18H29 M18 13V29" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 13C11 9.5 13.5 6 16.5 8.5C18 10 18 13 18 13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M23 13C25 9.5 22.5 6 19.5 8.5C18 10 18 13 18 13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  paw: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="18" cy="22" rx="8" ry="6.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10.5" cy="13" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="22.5" cy="10.2" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="26.2" cy="14.8" r="1.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  burger: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 14C9 10 12 7.5 18 7.5C24 7.5 27 10 27 14H9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="8" y="18" width="20" height="3.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 21.5H27 M8 25.5C8 27 9.5 28.5 18 28.5C26.5 28.5 28 27 28 25.5H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  code: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13 10L7 18L13 26" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 10L29 18L23 26" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.5 6L15.5 30" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
    </svg>
  ),
  weather: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="14.5" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 10.5V8.5 M18 20.5V18.5 M12.5 14.5H10.5 M25.5 14.5H23.5 M14.2 10.7L12.8 9.3 M23.2 19.7L21.8 18.3 M14.2 18.3L12.8 19.7 M23.2 9.3L21.8 10.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10 22.5C10 22.5 9 25.2 12.2 26.2C13.2 27.8 17.8 27.8 18.8 26.2C22 25.2 21 22.5 21 22.5H10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  globe: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 8C15 12 15 24 18 28 M18 8C21 12 21 24 18 28 M8 18H28" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 12.5C12 13.5 14 14 18 14C22 14 24 13.5 25.5 12.5 M10.5 23.5C12 22.5 14 22 18 22C22 22 24 22.5 25.5 23.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
    </svg>
  ),
  kanban: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="8" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 14H14V24H10V14Z M16 12H20V24H16V12Z M22 16H26V24H22V16Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  chef: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 15C11 11.5 13.2 8.5 18 8.5C22.8 8.5 25 11.5 25 15V17H11V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13 17V24C13 25.5 14.2 27 18 27C21.8 27 23 25.5 23 24V17" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 27V29 M11 19.5H13 M23 19.5H25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  palette: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="18" cy="18.5" rx="11" ry="9.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="14" cy="15" r="2" fill="currentColor" opacity="0.95" />
      <circle cx="19.5" cy="13" r="1.6" fill="currentColor" opacity="0.85" />
      <circle cx="23.5" cy="16.5" r="1.4" fill="currentColor" opacity="0.75" />
      <circle cx="22" cy="21" r="1.2" fill="currentColor" opacity="0.65" />
      <path d="M18.5 27.5C16 27.5 14.5 25.8 15.2 23.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  dumbbell: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 14V22 M7 15V21 M11 13V23 M25 13V23 M27 15V21 M29 14V22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 18H25" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  database: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="18" cy="10" rx="9" ry="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 10V16C9 18.5 12.5 20.5 18 20.5C23.5 20.5 27 18.5 27 16V10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 16V22C9 24.5 12.5 26.5 18 26.5C23.5 26.5 27 24.5 27 22V16" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 22V26C9 28.5 12.5 29.5 18 29.5C23.5 29.5 27 28.5 27 26V22" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
    </svg>
  ),
}

export function Icon({ name, className }: { name: IconName; className?: string }): JSX.Element {
  return <span className={className} style={{ display: 'inline-flex', color: 'currentColor' }}>{paths[name]}</span>
}

export function getIconName(id: string): IconName {
  const map: Record<string, IconName> = {
    winterforge: 'winterforge',
    sfp: 'gift',
    provet: 'paw',
    hamburgueria: 'burger',
    analisador: 'code',
    previsao: 'weather',
    translator: 'globe',
    kanban: 'kanban',
    cardapio: 'chef',
    fundo: 'palette',
    'academia-ia': 'dumbbell',
    'api-auth': 'database',
    'api-exercicios': 'database',
    'api-auth-academia': 'database',
  }
  return map[id] ?? 'code'
}
