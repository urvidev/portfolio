import { Typography, Table, Space, Button, Modal, Input, message, Select, Dropdown } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { TextArea, Search } = Input
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
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const [searchText, setSearchText] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortField, setSortField] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('descend')

  // Fetch all comments with user and item information
  const { data: comments, refetch } =
    Api.socialNetworkComment.findMany.useQuery({
      include: {
        user: true,
        item: true,
      },
      orderBy: {
        [sortField]: sortOrder === 'ascend' ? 'asc' : 'desc'
      }
    })

  // Mutations
  const { mutateAsync: deleteComment } = Api.socialNetworkComment.delete.useMutation()
  const { mutateAsync: createComment } = Api.socialNetworkComment.create.useMutation()
  const { mutateAsync: updateComment } = Api.socialNetworkComment.update.useMutation()

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

  const handleBulkAction = async (action: string) => {
    try {
      switch (action) {
        case 'delete':
          await Promise.all(selectedComments.map(id => deleteComment({ where: { id } })))
          message.success('Comments deleted successfully')
          break
        case 'approve':
          await Promise.all(selectedComments.map(id => 
            updateComment({ where: { id }, data: { status: 'APPROVED' } })
          ))
          message.success('Comments approved successfully')
          break
        case 'reject':
          await Promise.all(selectedComments.map(id => 
            updateComment({ where: { id }, data: { status: 'REJECTED' } })
          ))
          message.success('Comments rejected successfully')
          break
      }
      setSelectedComments([])
      refetch()
    } catch (error) {
      message.error('Failed to perform bulk action')
    }
  }

  const filteredComments = comments?.filter(comment => {
    const matchesSearch = comment.content?.toLowerCase().includes(searchText.toLowerCase()) ||
      comment.user?.name?.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = filterStatus === 'all' || comment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      title: 'Select',
      dataIndex: 'select',
      key: 'select',
      render: (_: any, record: any) => (
        <input
          type="checkbox"
          checked={selectedComments.includes(record.id)}
          onChange={e => {
            if (e.target.checked) {
              setSelectedComments([...selectedComments, record.id])
            } else {
              setSelectedComments(selectedComments.filter(id => id !== record.id))
            }
          }}
        />
      ),
    },
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
          
          <div style={{ marginTop: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Search
              placeholder="Search comments..."
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={value => setFilterStatus(value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'PENDING', label: 'Pending' },
                { value: 'APPROVED', label: 'Approved' },
                { value: 'REJECTED', label: 'Rejected' },
              ]}
            />
            {selectedComments.length > 0 && (
              <Dropdown
                menu={{
                  items: [
                    { key: 'approve', label: 'Approve Selected' },
                    { key: 'reject', label: 'Reject Selected' },
                    { key: 'delete', label: 'Delete Selected' },
                  ],
                  onClick: ({ key }) => handleBulkAction(key),
                }}
              >
                <Button type="primary">
                  Bulk Actions ({selectedComments.length})
                </Button>
              </Dropdown>
            )}
          </div>
        </div>

        <Table
          dataSource={filteredComments}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          onChange={(pagination, filters, sorter: any) => {
            setSortField(sorter.field || 'createdAt')
            setSortOrder(sorter.order || 'descend')
          }}
          rowSelection={{
            selectedRowKeys: selectedComments,
            onChange: (selectedRowKeys) => setSelectedComments(selectedRowKeys as string[]),
          }}
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
