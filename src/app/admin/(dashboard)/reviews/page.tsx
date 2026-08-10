"use client";

import React, { useState } from 'react';
import { Table, Button, Space, Form, Input, App, Modal, Switch, Rate, Avatar } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { adminFetch } from '@/lib/api';
import { useAdminLoading } from '@/lib/AdminLoadingContext';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminTableFilterBar from '@/components/admin/AdminTableFilterBar';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminReviewsPage() {
  const { modal, message } = App.useApp();
  const { setLoading: setGlobalLoading } = useAdminLoading();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/data/reviews');
      if (!res.ok) throw new Error();
      const items = await res.json();
      setData(items || []);
    } catch (error) {
      message.error('Không thể tải dữ liệu đánh giá');
    } finally {
      setLoading(false);
    }
  }, [message]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showModal = (record?: any) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      const action = editingId ? 'update' : 'create';
      setGlobalLoading(true);
      try {
        const res = await adminFetch('/api/data/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action,
            data: { ...values },
            id: editingId
          }),
        });

        if (res.ok) {
          await fetchData();
          message.success(editingId ? 'Cập nhật thành công' : 'Thêm mới thành công');
          setIsModalOpen(false);
        } else {
          throw new Error();
        }
      } catch (error) {
        message.error('Lỗi khi lưu dữ liệu');
      } finally {
        setGlobalLoading(false);
      }
    });
  };

  const handleDelete = (id: string) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa đánh giá này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        setGlobalLoading(true);
        try {
          const res = await adminFetch(`/api/data/reviews?id=${id}`, { method: 'DELETE' });
          if (res.ok) {
            await fetchData();
            message.success('Đã xóa thành công');
          } else {
            throw new Error();
          }
        } catch (error) {
          message.error('Lỗi khi xóa dữ liệu');
        } finally {
          setGlobalLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'author',
      key: 'author',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.avatar} icon={!record.avatar && <UserOutlined />} />
          <div>
            <div className="font-semibold text-gray-800">{text}</div>
            <div className="text-xs text-gray-500">{record.company}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: '150px',
      render: (rating: number) => <Rate disabled defaultValue={rating} className="text-sm" />
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => (
        <div className="max-w-xs truncate text-gray-600" title={text}>{text}</div>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      render: (status: boolean) => 
        status ? <span className="text-green-600 font-medium">Hiển thị</span> : <span className="text-gray-400">Đã ẩn</span>
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '120px',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Đánh giá khách hàng"
        breadcrumbItems={[
          { title: 'Admin', href: '/admin' },
          { title: 'Đánh giá khách hàng' },
        ]}
      />

      <div className="bg-white overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 rounded-2xl">
        <AdminTableFilterBar
          filters={[]}
          primaryAction={{
            label: 'Thêm đánh giá',
            onClick: () => showModal(),
            icon: <PlusOutlined />
          }}
        />
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, className: "p-6 border-t border-gray-50" }}
          className="admin-table"
        />
      </div>

      <Modal
        title={editingId ? 'Sửa đánh giá' : 'Thêm đánh giá mới'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu lại"
        cancelText="Hủy"
        width={700}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <div className="flex gap-6 mb-6">
            <div className="w-32">
              <Form.Item name="avatar" label="Avatar">
                <ImageUpload label="Tải ảnh" aspectRatio="1/1" />
              </Form.Item>
            </div>
            <div className="flex-1 space-y-4">
              <Form.Item name="author" label="Tên khách hàng" rules={[{ required: true }]}>
                <Input size="large" className="rounded-xl" placeholder="VD: Nguyễn Văn A" />
              </Form.Item>
              <Form.Item name="company" label="Chức vụ / Công ty">
                <Input size="large" className="rounded-xl" placeholder="VD: Giám đốc XYZ" />
              </Form.Item>
            </div>
          </div>
          
          <Form.Item name="rating" label="Số sao đánh giá" initialValue={5}>
            <Rate />
          </Form.Item>

          <Form.Item name="content" label="Nội dung đánh giá" rules={[{ required: true }]}>
            <Input.TextArea rows={4} className="rounded-xl" placeholder="Nội dung lời nhận xét..." />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái hiển thị" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
