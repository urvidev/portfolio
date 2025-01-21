import { Typography, Card, Row, Col } from 'antd'
const { Title, Paragraph } = Typography
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ProjectsPage() {
  const { data: projects, isLoading } = Api.portfolioProject.findMany.useQuery()

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-project-diagram" style={{ marginRight: 8 }}></i>
          Projects
        </Title>
        <Paragraph>Explore my portfolio of projects</Paragraph>

        <Row gutter={[24, 24]}>
          {projects?.map((project) => (
            <Col xs={24} sm={12} md={8} key={project.id}>
              <Card
                hoverable
                cover={
                  project.imageUrl && (
                    <img
                      alt={project.title}
                      src={project.imageUrl}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  )
                }
                actions={[
                  project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      key="visit"
                    >
                      <i className="las la-external-link-alt"></i> Visit Project
                    </a>
                  ),
                ].filter(Boolean)}
              >
                <Card.Meta
                  title={project.title}
                  description={project.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
