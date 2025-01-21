import { Typography, Card, Row, Col, Statistic, List, Button } from 'antd'
const { Title, Text } = Typography
import { Prisma } from '@prisma/client'
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminDashboardPage() {
  const navigate = useNavigate()

  type CommentWithUser = Prisma.SocialNetworkCommentGetPayload<{
    include: { user: true }
  }>

  type SupportTicketType = Prisma.SupportTicketGetPayload<{
    select: {
      id: true
      subject: true
      userEmail: true
      status: true
      createdAt: true
    }
  }>

  const { data: metrics } = Api.analyticsLocalMetric.findMany.useQuery({})

  const { data: recentComments } = Api.socialNetworkComment.findMany.useQuery({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  }) as { data: CommentWithUser[] }

  const { data: recentTickets } = Api.supportTicket.findMany.useQuery({
    take: 5,
    orderBy: { createdAt: 'desc' },
  }) as { data: SupportTicketType[] }

  const quickLinks = [
    {
      title: 'Content Management',
      icon: 'las la-file-alt',
      path: '/admin/content',
    },
    {
      title: 'Comment Management',
      icon: 'las la-comments',
      path: '/admin/comments',
    },
    { title: 'Blog', icon: 'las la-blog', path: '/blog' },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-line" style={{ marginRight: 8 }}></i>
          Admin Dashboard
        </Title>
        <Text type="secondary">
          Monitor website performance and user engagement
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-thumbs-up"></i> Positive Metrics
                  </>
                }
                value={
                  metrics?.reduce((acc, m) => acc + m.countPositive, 0) || 0
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-thumbs-down"></i> Negative Metrics
                  </>
                }
                value={
                  metrics?.reduce((acc, m) => acc + m.countNegative, 0) || 0
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-comment"></i> Recent Comments
                  </>
                }
                value={recentComments?.length || 0}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title={
                  <>
                    <i className="las la-ticket-alt"></i> Open Tickets
                  </>
                }
                value={
                  recentTickets?.filter(t => t.status === 'OPEN').length || 0
                }
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 24 }}>
          <Title level={4}>
            <i className="las la-link"></i> Quick Links
          </Title>
          <Row gutter={[16, 16]}>
            {quickLinks?.map((link, index) => (
              <Col xs={24} sm={8} key={index}>
                <Button
                  type="primary"
                  icon={<i className={link.icon}></i>}
                  onClick={() => navigate(link.path)}
                  style={{ width: '100%', height: 'auto', padding: '12px' }}
                >
                  {link.title}
                </Button>
              </Col>
            ))}
          </Row>
        </Card>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-comments"></i> Recent Comments
                </>
              }
            >
              <List
                dataSource={recentComments}
                renderItem={(comment: CommentWithUser) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<i className="las la-user"></i>}
                      title={comment.user?.name || 'Anonymous'}
                      description={comment.content || 'No content'}
                    />
                    <Text type="secondary">
                      {dayjs(comment.createdAt).format('MMM D, YYYY')}
                    </Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-ticket-alt"></i> Recent Support Tickets
                </>
              }
            >
              <List
                dataSource={recentTickets}
                renderItem={(ticket: SupportTicketType) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <i
                          className={`las ${
                            ticket.status === 'OPEN'
                              ? 'la-exclamation-circle'
                              : 'la-check-circle'
                          }`}
                        ></i>
                      }
                      title={ticket.subject}
                      description={ticket.userEmail}
                    />
                    <Text type="secondary">
                      {dayjs(ticket.createdAt).format('MMM D, YYYY')}
                    </Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
