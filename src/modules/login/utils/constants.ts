export const AVATAR_COMPANY = ''
export const AVATAR_USER = ''
export const LANGUAGE = ''
export const USER_TOKEN = 'user'
export type ROLE = 'User' | 'Admin' | 'Superior' | 'HR'
export const GENERAL_ACTIVITIES = ['DEV_OFFICE', 'DEV_TRAINING']

export type StatusType = 'Backlog' | 'Ready' | 'InProgress' | 'InReview' | 'Done' | 'Default'
export type StateType = 'Open' | 'Closed'
export type EstimateType = 'DEFAULT'
export type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL'
export type PriorityType = 'P0' | 'P1' | 'P2'

export const RENDER_COLOR_CHIP: {
  STATUS: Record<string, 'default' | 'primary' | 'info' | 'warning' | 'secondary' | 'success'>
  STATE: Record<string, 'default' | 'primary' | 'info' | 'warning' | 'secondary' | 'success'>
  ESTIMATE: Record<EstimateType, string>
  SIZE: Record<SizeType, string>
  PRIORITY: Record<PriorityType, string>
} = {
  STATUS: {
    Backlog: 'primary',
    Ready: 'info',
    InProgress: 'warning',
    InReview: 'secondary',
    Done: 'success',
    Default: 'default'
  },
  STATE: {
    Open: 'success',
    Closed: 'secondary'
  },
  ESTIMATE: {
    DEFAULT: 'default'
  },
  SIZE: {
    XS: '#1f883d',
    S: '#8250df',
    M: '#bf3989',
    L: '#eb670f',
    XL: '#cf222e'
  },
  PRIORITY: {
    P0: '#cf222e',
    P1: '#eb670f',
    P2: '#ffec9e'
  }
}
