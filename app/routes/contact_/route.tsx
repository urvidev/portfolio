import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem'
import { Button, Flex, Form, Input, message, Typography } from 'antd'
import { useState } from 'react'

const { Title, Text } = Typography

export default function ContactPage() {
  const [form] = Form.useForm()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      // Here you would typically call an API endpoint to handle the contact form submission
      // For now we'll just simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSuccess(true)
      form.resetFields()
      message.success('Message sent successfully!')
    } catch (error) {
      message.error('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{
          width: '340px',
          paddingBottom: '50px',
          paddingTop: '50px',
        }}
        gap="middle"
      >
        <AppHeader description="Get in touch" />

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input type="email" placeholder="Your email" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea rows={4} placeholder="Your message" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  )
}
