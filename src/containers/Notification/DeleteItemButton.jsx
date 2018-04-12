import React, { Component } from 'react';
import { Popconfirm, Icon } from 'antd';

class DeleteItemButton extends Component {
    render() {
        return (
            <Popconfirm
                placement="bottomRight"
                title="Delete this item?"
                okText="Yes"
                cancelText="No"
            >
                <a><Icon type="close-circle" /></a>
            </Popconfirm>
        )
    }
}

export default DeleteItemButton;