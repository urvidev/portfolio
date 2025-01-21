import { Typography, Table, Space, Button, Modal, Input, message } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CommentManagementPage() {
  const { checkRole } = useUserContext()
  const navigate = useNavigate()
  const [replyModalVisible, setReplyModalVisible] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [selectedComment, setSelectedComment] = useState<any>(null)

  // Fetch all comments with user and item information
  const { data: comments, refetch } =
    Api.socialNetworkComment.findMany.useQuery({
      include: {
        user: true,
        item: true,
      },
    })

  // Mutations
  const { mutateAsync: deleteComment } =
    Api.socialNetworkComment.delete.useMutation()
  const { mutateAsync: createComment } =
    Api.socialNetworkComment.create.useMutation()

  if (!checkRole('ADMIN')) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Title level={4}>Access Denied</Title>
          <Text>You need administrator privileges to access this page.</Text>
        </div>
      </PageLayout>
    )
  }

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment({ where: { id: commentId } })
      message.success('Comment deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete comment')
    }
  }

  const handleReply = (comment: any) => {
    setSelectedComment(comment)
    setReplyModalVisible(true)
  }

  const submitReply = async () => {
    if (!replyContent.trim() || !selectedComment) return

    try {
      await createComment({
        data: {
          content: replyContent,
          userId: selectedComment.userId,
          itemId: selectedComment.itemId,
        },
      })
      message.success('Reply posted successfully')
      setReplyModalVisible(false)
      setReplyContent('')
      setSelectedComment(null)
      refetch()
    } catch (error) {
      message.error('Failed to post reply')
    }
  }

  const columns = [
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'userName',
      render: (text: string) => <Text>{text || 'Anonymous'}</Text>,
    },
    {
      title: 'Comment',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Text>{dayjs(date).format('YYYY-MM-DD HH:mm')}</Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleReply(record)}
            icon={<i className="las la-reply" />}
          >
            Reply
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record.id)}
            icon={<i className="las la-trash" />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>
            <i className="las la-comments" style={{ marginRight: '8px' }} />
            Comment Management
          </Title>
          <Text>Monitor and manage all comments across the platform</Text>
        </div>

        <Table
          dataSource={comments}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title="Reply to Comment"
          open={replyModalVisible}
          onOk={submitReply}
          onCancel={() => {
            setReplyModalVisible(false)
            setReplyContent('')
            setSelectedComment(null)
          }}
        >
          <TextArea
            rows={4}
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
            placeholder="Type your reply here..."
          />
        </Modal>
      </div>
    </PageLayout>
  )
}
