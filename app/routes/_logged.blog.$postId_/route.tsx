import {
  Typography,
  Card,
  Button,
  Input,
  Space,
  Popconfirm,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BlogPostDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { user, isLoggedIn } = useUserContext()
  const [commentContent, setCommentContent] = useState('')

  // Fetch blog post with comments
  const { data: post, refetch } = Api.socialNetworkItem.findFirst.useQuery({
    where: { id: postId },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
    },
  })

  // Mutations for comments
  const { mutateAsync: createComment } =
    Api.socialNetworkComment.create.useMutation()
  const { mutateAsync: updateComment } =
    Api.socialNetworkComment.update.useMutation()
  const { mutateAsync: deleteComment } =
    Api.socialNetworkComment.delete.useMutation()

  // Comment handlers
  const handleAddComment = async () => {
    if (!commentContent.trim()) {
      message.error('Comment cannot be empty')
      return
    }

    try {
      await createComment({
        data: {
          content: commentContent,
          userId: user!.id,
          itemId: postId!,
        },
      })
      setCommentContent('')
      refetch()
      message.success('Comment added successfully')
    } catch (error) {
      message.error('Failed to add comment')
    }
  }

  const handleEditComment = async (commentId: string, newContent: string) => {
    try {
      await updateComment({
        where: { id: commentId },
        data: { content: newContent },
      })
      refetch()
      message.success('Comment updated successfully')
    } catch (error) {
      message.error('Failed to update comment')
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ where: { id: commentId } })
      refetch()
      message.success('Comment deleted successfully')
    } catch (error) {
      message.error('Failed to delete comment')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Card>
          <Title level={2}>
            <i className="las la-newspaper"></i> Blog Post
          </Title>
          <Paragraph>Read and engage with this blog post</Paragraph>

          {/* Blog Post Content */}
          <div style={{ marginBottom: 40 }}>
            <Title level={3}>{post?.targetUser?.name || 'Untitled Post'}</Title>
            <Text type="secondary">
              Posted on {dayjs(post?.createdAt).format('MMMM D, YYYY')}
            </Text>
            <Paragraph style={{ marginTop: 20 }}>
              {post?.targetComment?.content || 'No content available'}
            </Paragraph>
          </div>

          {/* Comments Section */}
          <div>
            <Title level={4}>
              <i className="las la-comments"></i> Comments
            </Title>

            {/* Add Comment */}
            {isLoggedIn ? (
              <div style={{ marginBottom: 20 }}>
                <TextArea
                  rows={4}
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  placeholder="Write your comment..."
                  style={{ marginBottom: 10 }}
                />
                <Button type="primary" onClick={handleAddComment}>
                  <i className="las la-plus"></i> Add Comment
                </Button>
              </div>
            ) : (
              <Paragraph type="secondary">
                Please log in to add comments.
              </Paragraph>
            )}

            {/* Comments List */}
            <Space direction="vertical" style={{ width: '100%' }}>
              {post?.comments?.map(comment => (
                <Card key={comment.id} size="small">
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <Text strong>{comment.user.name}</Text>
                      <Text type="secondary" style={{ marginLeft: 8 }}>
                        {dayjs(comment.createdAt).format('MMM D, YYYY HH:mm')}
                      </Text>
                    </div>
                    {user?.id === comment.userId && (
                      <Space>
                        <Button
                          size="small"
                          onClick={() => {
                            const newContent = prompt(
                              'Edit your comment:',
                              comment.content || '',
                            )
                            if (newContent)
                              handleEditComment(comment.id, newContent)
                          }}
                        >
                          <i className="las la-edit"></i>
                        </Button>
                        <Popconfirm
                          title="Delete this comment?"
                          onConfirm={() => handleDeleteComment(comment.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button size="small" danger>
                            <i className="las la-trash"></i>
                          </Button>
                        </Popconfirm>
                      </Space>
                    )}
                  </div>
                  <Paragraph style={{ marginTop: 8 }}>
                    {comment.content}
                  </Paragraph>
                </Card>
              ))}
            </Space>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
