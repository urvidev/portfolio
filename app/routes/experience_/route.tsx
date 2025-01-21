import { Typography, Timeline, Card } from 'antd'
const { Title, Text, Paragraph } = Typography
import { PageLayout } from '@/designSystem'
import { Api } from '@/core/trpc'

export default function ExperiencePage() {
  const { data: experiences, isLoading } = Api.experience.findMany.useQuery({
    orderBy: { startDate: 'desc' }
  })

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-8">
        <Title level={1} className="mb-8">
          <i className="las la-briefcase"></i> Professional Experience
        </Title>

        {isLoading ? (
          <Card loading />
        ) : (
          <Timeline>
            {experiences?.map((experience) => (
              <Timeline.Item key={experience.id}>
                <Card className="mb-4">
                  <Title level={3}>{experience.title}</Title>
                  <Title level={4} type="secondary">
                    {experience.company}
                  </Title>
                  <Text type="secondary" className="block mb-4">
                    {experience.startDate} - {experience.endDate || 'Present'}
                  </Text>
                  <Paragraph>{experience.description}</Paragraph>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </div>
    </PageLayout>
  )
}
