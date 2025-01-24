import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice'; // Updated import
import { RootState } from '../store'; // Import RootState for useSelector

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success } = useSelector((state: RootState) => state.auth); // Updated to use auth state

  const onFinish = (values: { username: string; email: string; password: string }) => {
    dispatch(registerUser(values));
  };

  // Use useEffect to handle side effects after the component is rendered
  useEffect(() => {
    if (success) {
      navigate('/login'); // Redirect to login page
    }
  }, [success, navigate]); // Only re-run when success or error changes

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <Form
          name="register_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ maxWidth: '100%' }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              className="border border-gray-300 rounded-lg p-2 w-full text-sm"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'The input is not a valid E-mail!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
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
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 text-sm"
            >
              Register
            </Button>
          </Form.Item>

          <div className="text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
