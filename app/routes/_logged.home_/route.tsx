import { Typography, Card, Row, Col, Divider, Space } from 'antd'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useUserContext()

  // Fetch user's social profile and items
  const { data: profile } = Api.socialNetworkProfile.findFirst.useQuery({
    where: { userId: user?.id },
    include: { user: true },
  })

  // Fetch latest blog posts (using social network items as blog posts)
  const { data: blogPosts } = Api.socialNetworkItem.findMany.useQuery({
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: {
      targetUser: true,
      likes: true,
      comments: true,
    },
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        {/* Hero Section */}
        <Row gutter={[24, 24]} align="middle" justify="center">
          <Col xs={24} md={12}>
            <Card bordered={false}>
              <Space direction="vertical" size="large">
                <Title level={1}>
                  <i className="las la-user-circle"></i>{' '}
                  {profile?.user?.name || 'Portfolio'}
                </Title>
                <Paragraph>
                  Welcome to my portfolio! I'm passionate about creating amazing
                  web experiences and solving complex problems through elegant
                  solutions.
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card bordered={false}>
              <img
                src={
                  profile?.user?.pictureUrl ||
                  'https://i.imgur.com/ZdJSK3Y.jpeg'
                }
                alt="Profile"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* Portfolio Sections */}
        <Title level={2}>
          <i className="las la-briefcase"></i> Portfolio Sections
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => navigate('/blog')}
              cover={
                <i
                  className="las la-blog"
                  style={{
                    fontSize: '48px',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                ></i>
              }
            >
              <Card.Meta
                title="Blog Posts"
                description="Read my latest thoughts and insights"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <i
                  className="las la-project-diagram"
                  style={{
                    fontSize: '48px',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                ></i>
              }
            >
              <Card.Meta
                title="Projects"
                description="View my recent work and contributions"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <i
                  className="las la-user-graduate"
                  style={{
                    fontSize: '48px',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                ></i>
              }
            >
              <Card.Meta
                title="Experience"
                description="My professional journey and skills"
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* Latest Blog Posts */}
        <Title level={2}>
          <i className="las la-newspaper"></i> Latest Blog Posts
        </Title>
        <Row gutter={[24, 24]}>
          {blogPosts?.map(post => (
            <Col xs={24} sm={12} md={8} key={post.id}>
              <Card hoverable onClick={() => navigate(`/blog/${post.id}`)}>
                <Space direction="vertical">
                  <Text strong>{post.targetUser?.name}</Text>
                  <Text type="secondary">
                    <i className="las la-calendar"></i>{' '}
                    {dayjs(post.createdAt).format('MMM D, YYYY')}
                  </Text>
                  <Space>
                    <Text>
                      <i className="las la-heart"></i> {post.likes.length}
                    </Text>
                    <Text>
                      <i className="las la-comment"></i> {post.comments.length}
                    </Text>
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
