import React from 'react';
import { Button, Form, Input } from 'antd';

import './Auth.scss';

const Auth = () => {

    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className="auth-wrapper">
            <Form labelCol={{ span: 7 }}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]} >
                    <Input onChange={e => setName(e.target.value)} placeholder="Name" value={name} />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={[{ required: true }]} >
                    <Input onChange={e => setPassword(e.target.value)}
                        type="password" placeholder="Password" value={password} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 7 }}>
                    <Button type="primary" htmlType="button">Enter</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Auth;