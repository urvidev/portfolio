import { Typography, Card, Row, Col, Divider, Space } from 'antd'
const { Title, Text, Paragraph } = Typography
import dayjs from 'dayjs'
import { useNavigate } from '@remix-run/react'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()
  const defaultProfile = {
    user: {
      name: 'Portfolio',
      pictureUrl: 'https://i.imgur.com/ZdJSK3Y.jpeg'
    }
  }

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
                  {defaultProfile.user.name}
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
                  defaultProfile.user.pictureUrl
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

      </div>
    </PageLayout>
  )
}
