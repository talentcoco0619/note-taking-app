import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { RootState } from '../store';
import { AppDispatch } from '../store';
const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(loginUser(values));
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ maxWidth: '100%' }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              // { type: 'email', message: 'The input is not a valid E-mail!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              type="email"
              className="border border-gray-300 rounded-lg p-2 w-full text-sm"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="border border-gray-300 rounded-lg p-2 w-full text-sm"
            />
          </Form.Item>

          <Form.Item>
            <Button
              name='login'
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 text-sm"
            >
              Log In
            </Button>
          </Form.Item>

          <div className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
