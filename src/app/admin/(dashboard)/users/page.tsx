"use client";

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, Breadcrumb, Avatar, Tooltip, App } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import AdminTableFilterBar from '@/components/admin/AdminTableFilterBar';
import { useAdminLoading } from '@/lib/AdminLoadingContext';

const initialUsers = [
  { id: 1, name: 'VTAX Admin', email: 'admin@VTAX.com.vn', role: 'SuperAdmin', lastActive: '10 phút tru?c', avatar: null },
  { id: 2, name: 'Editor 01', email: 'editor@VTAX.com.vn', role: 'Editor', lastActive: '2 gi? tru?c', avatar: null },
];

function AdminUsersPageContent() {
  const { message: msg, modal } = App.useApp();
  const { setLoading: setGlobalLoading } = useAdminLoading();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const roleFilter = searchParams.get('role') || '';

  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form] = Form.useForm();
  const [passForm] = Form.useForm();

  // Derived filtered data
  const filteredData = useMemo(() => {
    return users.filter(item => {
      const matchesQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.role.toLowerCase().includes(query.toLowerCase());
      const matchesRole = !roleFilter || item.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [users, query, roleFilter]);

  const updateUrl = (params: Record<string, string | number | undefined>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    let resetPage = false;

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'page') {
        newSearchParams.set('page', String(value));
      } else {
        if (value !== undefined && value !== '') newSearchParams.set(key, String(value));
        else newSearchParams.delete(key);
        resetPage = true; // Reset to page 1 on search/filter change
      }
    });
    if (resetPage) newSearchParams.set('page', '1');

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const showModal = (record?: any) => {
    if (record) {
      setSelectedUser(record);
      form.setFieldsValue(record);
    } else {
      setSelectedUser(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setGlobalLoading(true);
      try {
        if (selectedUser && !isPassModalOpen) {
          setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...values } : u)));
          msg.success('C?p nh?t tài kho?n thành công');
        } else {
          const newUser = {
            ...values,
            id: Math.max(...users.map((u) => u.id), 0) + 1,
            lastActive: 'V?a xong',
            avatar: null,
          };
          setUsers([...users, newUser]);
          msg.success('Thêm tài kho?n m?i thành công');
        }
        setIsModalOpen(false);
      } finally {
        setGlobalLoading(false);
      }
    });
  };

  const handleOpenPassModal = (record: any) => {
    setSelectedUser(record);
    passForm.resetFields();
    setIsPassModalOpen(true);
  };

  const handleChangePassword = () => {
    passForm.validateFields().then(async () => {
      setGlobalLoading(true);
      try {
        msg.success(`Ðã d?i m?t kh?u cho tài kho?n ${selectedUser.email}`);
        setIsPassModalOpen(false);
      } finally {
        setGlobalLoading(false);
      }
    });
  };

  const columns = [
    {
      title: 'Tài kho?n',
      key: 'user',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: record.role === 'SuperAdmin' ? '#115E59' : '#d9531f' }} />
          <div>
            <div className="font-semibold text-[#0c2236]">{record.name}</div>
            <div className="text-xs text-[#94a3b8]">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Phân quy?n',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'SuperAdmin' ? 'green' : 'gold'} className="font-semibold text-[11px]">
          {role}
        </Tag>
      ),
    },
    {
      title: 'Ho?t d?ng l?n cu?i',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Ð?i m?t kh?u">
            <Button icon={<LockOutlined />} onClick={() => handleOpenPassModal(record)} />
          </Tooltip>
          <Tooltip title="Ch?nh s?a">
            <Button type="primary" ghost icon={<EditOutlined />} onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
                danger 
                icon={<DeleteOutlined />} 
                disabled={record.role === 'SuperAdmin'}
                onClick={() => {
                   modal.confirm({
                      title: 'Xác nh?n xóa tài kho?n?',
                      content: `B?n có ch?c mu?n xóa tài kho?n ${record.name}?`,
                      okText: 'Xóa ngay',
                      cancelText: 'H?y',
                      okType: 'danger',
                      onOk: async () => {
                         setGlobalLoading(true);
                         try {
                            setUsers(users.filter(u => u.id !== record.id));
                            msg.success('Ðã xóa tài kho?n');
                         } finally {
                            setGlobalLoading(false);
                         }
                      }
                   });
                }} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex flex-col gap-1.5">
          <Breadcrumb items={[{ title: 'Admin', href: '/admin' }, { title: 'Qu?n lý Ngu?i dùng' }]} className="text-[11px] text-[#94a3b8]" />
          <h1 className="font-display text-2xl font-semibold text-[#0c2236] tracking-tight">Tài kho?n Qu?n tr? viên</h1>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-[0_1px_2px_rgba(17, 94, 89,0.04),0_8px_24px_rgba(17, 94, 89,0.05)] border border-[#eef1f5]">
        <div className="flex items-center gap-3 mb-8 p-4 rounded-xl text-[#c0461a]" style={{ background: '#f9ece4', border: '1px solid #f3d9cc' }}>
          <SafetyCertificateOutlined />
          <span className="font-medium text-sm">C?nh báo: Ch? SuperAdmin m?i có quy?n t?o m?i ho?c phân quy?n cho các tài kho?n khác.</span>
        </div>

        <AdminTableFilterBar
          className="border border-[#eef1f5] rounded-xl mb-4"
          filters={[
            {
              key: 'role',
              placeholder: 'Phân quy?n',
              value: roleFilter || undefined,
              options: [
                { label: 'SuperAdmin', value: 'SuperAdmin' },
                { label: 'Editor', value: 'Editor' },
              ],
            },
          ]}
          onChange={(patch) => updateUrl(patch)}
          search={{
            placeholder: 'Tìm ki?m user...',
            defaultValue: query,
          }}
          primaryAction={{
            label: 'C?p tài kho?n m?i',
            onClick: () => showModal(),
            icon: <PlusOutlined />
          }}
        />
        <Table  size="small" sticky
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: 10,
            onChange: (p) => updateUrl({ page: p })
          }}
          className="admin-table border border-[#eef1f5] rounded-xl overflow-hidden"
        />
      </div>

      <Modal
        title={selectedUser ? "C?p nh?t tài kho?n" : "C?p m?i tài kho?n truy c?p"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText={selectedUser ? "C?p nh?t" : "T?o tài kho?n"}
        cancelText="H?y"
      >
         <Form form={form} layout="vertical" className="mt-6">
            <Form.Item label="H? và tên" name="name" rules={[{ required: true, message: 'Vui lòng nh?p h? tên' }]}>
               <Input placeholder="VD: Nguy?n Van A" />
            </Form.Item>
            <Form.Item label="Email dang nh?p" name="email" rules={[{ required: true, type: 'email', message: 'Vui lòng nh?p email h?p l?' }]}>
               <Input placeholder="email@VTAX.com.vn" />
            </Form.Item>
            {!selectedUser && (
              <Form.Item label="M?t kh?u t?m th?i" name="password" rules={[{ required: true, message: 'Vui lòng nh?p m?t kh?u' }]}>
                 <Input.Password prefix={<LockOutlined className="text-gray-300" />} />
              </Form.Item>
            )}
            <Form.Item label="Quy?n h?n" name="role" initialValue="Editor">
               <Select>
                  <Select.Option value="SuperAdmin">SuperAdmin (Toàn quy?n)</Select.Option>
                  <Select.Option value="Editor">Editor (Ch? s?a n?i dung)</Select.Option>
               </Select>
            </Form.Item>
         </Form>
      </Modal>

      <Modal
        title={<span>Ð?i m?t kh?u cho <b>{selectedUser?.name}</b></span>}
        open={isPassModalOpen}
        onOk={handleChangePassword}
        onCancel={() => setIsPassModalOpen(false)}
        okText="C?p nh?t m?t kh?u"
        cancelText="B? qua"
      >
         <Form form={passForm} layout="vertical" className="mt-6">
            <Form.Item label="M?t kh?u m?i" name="newPassword" rules={[{ required: true, min: 6, message: 'M?t kh?u t?i thi?u 6 ký t?' }]}>
               <Input.Password prefix={<LockOutlined className="text-gray-300" />} />
            </Form.Item>
            <Form.Item label="Xác nh?n m?t kh?u" name="confirmPassword" dependencies={['newPassword']} rules={[
               { required: true, message: 'Vui lòng xác nh?n m?t kh?u' },
               ({ getFieldValue }) => ({
                  validator(_, value) {
                     if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                     }
                     return Promise.reject(new Error('M?t kh?u không kh?p!'));
                  },
               }),
            ]}>
               <Input.Password prefix={<LockOutlined className="text-gray-300" />} />
            </Form.Item>
         </Form>
      </Modal>
    </div>
  );
}


export default function AdminUsersPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-gray-500">Ðang t?i d? li?u...</div>}>
      <AdminUsersPageContent />
    </React.Suspense>
  );
}
