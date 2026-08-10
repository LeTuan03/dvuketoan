"use client";

import React, { useState, useMemo } from 'react';
import { Table, Button, Space, Form, Input, App, Modal, Switch, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminFetch } from '@/lib/api';
import { useAdminLoading } from '@/lib/AdminLoadingContext';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminTableFilterBar from '@/components/admin/AdminTableFilterBar';

export default function AdminLookupPage() {
  const { modal, message } = App.useApp();
  const { setLoading: setGlobalLoading } = useAdminLoading();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/data/lookup');
      if (!res.ok) throw new Error('Lỗi khi gọi API tải dữ liệu tra cứu');
      const items = await res.json();
      setData(items || []);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu tra cứu:', error);
      message.error('Không thể tải dữ liệu tra cứu');
    } finally {
      setLoading(false);
    }
  }, [message]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = useMemo(() => {
    if (!query) return data;
    const lowerQ = query.toLowerCase();
    return data.filter(item => 
      item.code.toLowerCase().includes(lowerQ) || 
      item.name.toLowerCase().includes(lowerQ)
    );
  }, [data, query]);

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
        const res = await adminFetch('/api/data/lookup', {
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
          throw new Error('Lỗi khi gọi API lưu dữ liệu');
        }
      } catch (error) {
        console.error('Lỗi khi lưu dữ liệu:', error);
        message.error('Lỗi khi lưu dữ liệu');
      } finally {
        setGlobalLoading(false);
      }
    });
  };

  const handleDelete = (id: string) => {
    modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa ngành nghề này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        setGlobalLoading(true);
        try {
          const res = await adminFetch(`/api/data/lookup?id=${id}`, { method: 'DELETE' });
          if (res.ok) {
            await fetchData();
            message.success('Đã xóa thành công');
          } else {
            throw new Error('Lỗi khi gọi API xóa dữ liệu');
          }
        } catch (error) {
          console.error('Lỗi khi xóa dữ liệu:', error);
          message.error('Lỗi khi xóa dữ liệu');
        } finally {
          setGlobalLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: 'Mã ngành',
      dataIndex: 'code',
      key: 'code',
      width: '120px',
      render: (text: string) => <strong className="text-primary">{text}</strong>,
    },
    {
      title: 'Tên ngành nghề',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kinh doanh có điều kiện',
      dataIndex: 'isConditional',
      key: 'isConditional',
      width: '200px',
      render: (isCond: boolean) => 
        isCond ? <Tag color="warning">Có điều kiện</Tag> : <Tag color="success">Không điều kiện</Tag>
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
        title="Tra cứu ngành nghề"
        breadcrumbItems={[
          { title: 'Admin', href: '/admin' },
          { title: 'Tra cứu ngành nghề' },
        ]}
      />

      <div className="bg-white overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 rounded-2xl">
        <AdminTableFilterBar
          filters={[]}
          onChange={(patch) => setQuery(patch.q || '')}
          search={{ 
            defaultValue: query
          }}
          primaryAction={{
            label: 'Thêm ngành nghề',
            onClick: () => showModal(),
            icon: <PlusOutlined />
          }}
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, className: "p-6 border-t border-gray-50" }}
          className="admin-table"
        />
      </div>

      <Modal
        title={editingId ? 'Sửa thông tin ngành nghề' : 'Thêm ngành nghề mới'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu lại"
        cancelText="Hủy"
        width={700}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Form.Item name="code" label="Mã ngành" rules={[{ required: true }]}>
                <Input size="large" className="rounded-xl" placeholder="VD: 6201" />
              </Form.Item>
            </div>
            <div className="col-span-2">
              <Form.Item name="name" label="Tên ngành nghề" rules={[{ required: true }]}>
                <Input size="large" className="rounded-xl" placeholder="VD: Lập trình máy vi tính" />
              </Form.Item>
            </div>
          </div>
          
          <Form.Item name="description" label="Chi tiết/Điều kiện">
            <Input.TextArea rows={4} className="rounded-xl" placeholder="Mô tả chi tiết hoặc điều kiện nếu có" />
          </Form.Item>

          <Form.Item name="isConditional" label="Kinh doanh có điều kiện" valuePropName="checked" initialValue={false}>
            <Switch checkedChildren="Có" unCheckedChildren="Không" />
          </Form.Item>
          
          <Form.Item name="status" label="Trạng thái hiển thị" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
