import { Link, useLocation, useNavigate, useParams } from '@remix-run/react'
import { Flex } from 'antd'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'
import { useUserContext } from '@/core/context'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useNavigate()
  const pathname = useLocation().pathname
  const params: Record<string, string> = useParams()
  const { checkRole } = useUserContext()

  const goTo = (url: string) => {
    router(url)
  }

  const adminItems: NavigationItem[] = [
    {
      key: '/admin/dashboard',
      label: 'Admin Dashboard',
      position: 'topbar',
      onClick: () => goTo('/admin/dashboard'),
    },
    {
      key: '/admin/content',
      label: 'Content Management',
      position: 'topbar',
      onClick: () => goTo('/admin/content'),
    },
    {
      key: '/admin/comments',
      label: 'Comment Management',
      position: 'topbar',
      onClick: () => goTo('/admin/comments'),
    },
  ]

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home Page',
      position: 'topbar',
      onClick: () => goTo('/home'),
    },
    {
      key: '/blog',
      label: 'Blog Page',
      position: 'topbar',
      onClick: () => goTo('/blog'),
    },
    {
      key: '/contact',
      label: 'Contact',
      position: 'topbar',
      onClick: () => goTo('/contact'),
    },
    {
      key: '/projects',
      label: 'Projects',
      position: 'topbar',
      onClick: () => goTo('/projects'),
    },
    {
      key: '/experience',
      label: 'Experience',
      position: 'topbar',
      onClick: () => goTo('/experience'),
    },
    ...(checkRole('ADMIN') ? adminItems : []),
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      icon: item.icon,
      position: item.position,
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
