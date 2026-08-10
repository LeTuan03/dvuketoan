"use client";

import React from 'react';
import { ConfigProvider, App } from 'antd';
import viVN from 'antd/locale/vi_VN';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: '#115E59',
          colorInfo: '#115E59',
          colorLink: '#115E59',
          borderRadius: 12,
          fontFamily: "var(--font-be-vietnam), 'Be Vietnam Pro', system-ui, sans-serif",
          colorTextHeading: '#0c2236',
          colorText: '#33414f',
        },
        components: {
          Input: {
            borderRadius: 12,
            activeBorderColor: '#115E59',
            hoverBorderColor: '#115E59',
          },
          Button: {
            borderRadius: 12,
            fontWeight: 600,
            primaryShadow: '0 6px 18px rgba(13, 148, 136,0.22)',
          },
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}
