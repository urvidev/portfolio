import {
  Typography,
  Tabs,
  Button,
  Form,
  Input,
  Modal,
  Table,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ContentManagementPage() {
  const { user, checkRole } = useUserContext()
  const [activeTab, setActiveTab] = useState('1')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [form] = Form.useForm()

  // Social Network Items
  const { data: items, refetch: refetchItems } =
    Api.socialNetworkItem.findMany.useQuery({})
  const { mutateAsync: createItem } = Api.socialNetworkItem.create.useMutation()
  const { mutateAsync: updateItem } = Api.socialNetworkItem.update.useMutation()
  const { mutateAsync: deleteItem } = Api.socialNetworkItem.delete.useMutation()

  // Comments
  const { data: comments, refetch: refetchComments } =
    Api.socialNetworkComment.findMany.useQuery({})
  const { mutateAsync: createComment } =
    Api.socialNetworkComment.create.useMutation()
  const { mutateAsync: updateComment } =
    Api.socialNetworkComment.update.useMutation()
  const { mutateAsync: deleteComment } =
    Api.socialNetworkComment.delete.useMutation()

  // Likes
  const { data: likes, refetch: refetchLikes } =
    Api.socialNetworkLike.findMany.useQuery({})

  if (!checkRole('ADMIN')) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Title level={4}>Access Denied</Title>
          <Text>You must be an admin to access this page.</Text>
        </div>
      </PageLayout>
    )
  }

  const handleAdd = () => {
    setEditingItem(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setEditingItem(record)
    form.setFieldsValue(record)
    setIsModalVisible(true)
  }

  const handleDelete = async (record: any) => {
    try {
      switch (activeTab) {
        case '1':
          await deleteItem({ where: { id: record.id } })
          await refetchItems()
          break
        case '2':
          await deleteComment({ where: { id: record.id } })
          await refetchComments()
          break
      }
      message.success('Item deleted successfully')
    } catch (error) {
      message.error('Failed to delete item')
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      switch (activeTab) {
        case '1':
          if (editingItem) {
            await updateItem({ where: { id: editingItem.id }, data: values })
            await refetchItems()
          } else {
            await createItem({ data: values })
            await refetchItems()
          }
          break
        case '2':
          if (editingItem) {
            await updateComment({ where: { id: editingItem.id }, data: values })
            await refetchComments()
          } else {
            await createComment({ data: { ...values, userId: user?.id } })
            await refetchComments()
          }
          break
      }
      setIsModalVisible(false)
      form.resetFields()
      message.success('Item saved successfully')
    } catch (error) {
      message.error('Failed to save item')
    }
  }

  const columns = {
    items: [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      {
        title: 'Likes Count',
        key: 'likes',
        render: (record: any) => record.likes?.length || 0,
      },
      {
        title: 'Comments Count',
        key: 'comments',
        render: (record: any) => record.comments?.length || 0,
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: any) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              <i className="las la-edit" />
            </Button>
            <Button type="link" danger onClick={() => handleDelete(record)}>
              <i className="las la-trash" />
            </Button>
          </>
        ),
      },
    ],
    comments: [
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        ellipsis: true,
      },
      { title: 'User ID', dataIndex: 'userId', key: 'userId' },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: any) => (
          <>
            <Button type="link" onClick={() => handleEdit(record)}>
              <i className="las la-edit" />
            </Button>
            <Button type="link" danger onClick={() => handleDelete(record)}>
              <i className="las la-trash" />
            </Button>
          </>
        ),
      },
    ],
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        <Title level={2}>
          <i className="las la-tasks" /> Content Management
        </Title>
        <Text>Manage your social network content and interactions.</Text>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginTop: '2rem' }}
          tabBarExtraContent={
            <Button type="primary" onClick={handleAdd}>
              <i className="las la-plus" /> Add New
            </Button>
          }
        >
          <Tabs.TabPane tab="Social Items" key="1">
            <Table columns={columns.items} dataSource={items} rowKey="id" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Comments" key="2">
            <Table
              columns={columns.comments}
              dataSource={comments}
              rowKey="id"
            />
          </Tabs.TabPane>
        </Tabs>

        <Modal
          title={`${editingItem ? 'Edit' : 'Add'} ${
            activeTab === '1' ? 'Social Item' : 'Comment'
          }`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            {activeTab === '2' && (
              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
