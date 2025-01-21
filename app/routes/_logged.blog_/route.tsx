import {
  Typography,
  Card,
  Input,
  Row,
  Col,
  Button,
  List,
  Space,
  Modal,
  Form,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { Search } = Input
import { Prisma } from '@prisma/client'
type PostWithRelations = Prisma.SocialNetworkItemGetPayload<{
  include: {
    comments: {
      include: {
        user: true
      }
    }
  }
}>
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BlogPage() {
  const navigate = useNavigate()
  const { user, isLoggedIn } = useUserContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const [selectedPost, setSelectedPost] = useState<string>('')
  const [form] = Form.useForm()

  const { data: posts, isLoading } = Api.socialNetworkItem.findMany.useQuery<
    PostWithRelations[]
  >({
    include: {
      comments: {
        include: {
          user: true,
        },
      },
    },
  })

  const { mutateAsync: createComment } =
    Api.socialNetworkComment.create.useMutation()

  const filteredPosts =
    posts?.filter((post: PostWithRelations) =>
      post.comments?.some(comment =>
        comment.content?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    ) || []

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleCommentSubmit = async (values: { content: string }) => {
    if (!user?.id || !selectedPost) return

    try {
      await createComment({
        data: {
          content: values.content,
          userId: user.id,
          itemId: selectedPost,
        },
      })
      message.success('Comment added successfully')
      setCommentModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Failed to add comment')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Row gutter={[24, 24]} align="middle" justify="space-between">
          <Col>
            <Title level={2}>
              <i className="las la-blog" style={{ marginRight: 8 }}></i>
              Blog Posts
            </Title>
            <Paragraph>
              Explore our latest blog posts and join the conversation
            </Paragraph>
          </Col>
          <Col>
            <Search
              placeholder="Search posts..."
              allowClear
              enterButton
              size="large"
              onSearch={handleSearch}
              style={{ width: 300 }}
              prefix={<i className="las la-search"></i>}
            />
          </Col>
        </Row>

        <List
          grid={{
            gutter: 24,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={filteredPosts}
          loading={isLoading}
          renderItem={(post: PostWithRelations) => (
            <List.Item>
              <Card
                hoverable
                actions={[
                  <Space key="comments">
                    <i className="las la-comments"></i>
                    {post.comments?.length || 0} Comments
                  </Space>,
                  isLoggedIn && (
                    <Button
                      key="add-comment"
                      type="link"
                      onClick={() => {
                        setSelectedPost(post.id)
                        setCommentModalVisible(true)
                      }}
                    >
                      <i className="las la-plus"></i> Add Comment
                    </Button>
                  ),
                ].filter(Boolean)}
              >
                <Card.Meta
                  title={
                    <a onClick={() => navigate(`/blog/${post.id}`)}>
                      Post #{post.id}
                    </a>
                  }
                  description={
                    <>
                      <Text type="secondary">
                        <i className="las la-clock"></i>{' '}
                        {dayjs(post.createdAt).format('MMMM D, YYYY')}
                      </Text>
                      <List
                        size="small"
                        dataSource={post.comments?.slice(0, 2)}
                        renderItem={comment => (
                          <List.Item>
                            <Text strong>
                              {comment.user?.name || 'Anonymous'}:{' '}
                            </Text>
                            {comment.content || ''}
                          </List.Item>
                        )}
                      />
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />

        <Modal
          title="Add Comment"
          open={commentModalVisible}
          onCancel={() => setCommentModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCommentSubmit}>
            <Form.Item
              name="content"
              rules={[{ required: true, message: 'Please enter your comment' }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Write your comment here..."
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <i className="las la-paper-plane"></i> Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
