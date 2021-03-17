import React from 'react';
import { Button, Form, Input } from 'antd';
import { Context } from '../../context';
import { setIsJoined, setRooms, setRoomsByUser } from '../../redux/actions/users';
import axios from 'axios';

import './Auth.scss';

const Auth = () => {

    const dispatch = React.useContext(Context);
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const checkUser = async (params) => {
        const res = await axios.get('/users/check', { params });
        return res.data;
    }

    const getRooms = async (params) => {
        const res = await axios.get('/rooms/userid', { params });
        return res.data;
    }

    const connectUser = async (user) => {
        const data = await checkUser(user);
        if (data) {
            user = { ...data, online: true };
            dispatch(setIsJoined(user));

            const rooms = await getRooms({ id: user._id });
            dispatch(setRoomsByUser(rooms));
        }
    }

    const onEnter = () => {
        const user = {
            name,
            password
        }
        connectUser(user);
    }

    React.useEffect(() => {
        axios.get('/rooms', {})
            .then(res => dispatch(setRooms(res.data)));
    }, []);

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
                    <Button onClick={onEnter} type="primary" htmlType="button">Enter</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Auth;