import { useState, useEffect } from 'react';
import { Button, Modal, Select } from 'antd';
import { cloneDeep } from 'lodash';
import { useSchemaData } from '../../../../hook/useSchemaData';
import Banner from './component/Banner';
import List from './component/List';
import Footer from './component/Footer';
import styles from './style.module.scss';

const { Option } = Select;
const map = { Banner, List, Footer };

const AreaItem = (props) => {
    const { index } = props;
    const { pageChild, changePageChild, removePageChild } = useSchemaData(index);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempPageChild, setTempPageChild] = useState(cloneDeep(pageChild));

    useEffect(() => {
        setTempPageChild(cloneDeep(pageChild));
    }, [pageChild]);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleModalOk = () => {
        changePageChild(tempPageChild);
        setIsModalVisible(false);
    };
    const handleModalCancel = () => {
        setTempPageChild(cloneDeep(pageChild));
        setIsModalVisible(false);
    };
    const handleSelectorChange = (value) => {
        setTempPageChild({
            name: value,
            attributes: {},
            children: []
        });
    };
    const changeTempPageChildAttributes = (kvObj) => {
        const newTempPageChild = { ...tempPageChild };
        for (let key in kvObj) {
            newTempPageChild.attributes[key] = kvObj[key];
        };
        setTempPageChild(newTempPageChild);
    };
    const changeTempPageChildChildren = (children) => {
        const newTempPageChild = { ...tempPageChild };
        newTempPageChild.children = children;
        setTempPageChild(newTempPageChild);
    };

    const getComponent = () => {
        const { name } = tempPageChild;
        const Component = map[name];
        return Component ? (
            <Component {...tempPageChild} changeAttributes={changeTempPageChildAttributes} changeChildren={changeTempPageChildChildren} />
        ) : null;
    };

    return (
        <li className={styles.item}>
            <span
                className={styles.content} 
                onClick={showModal}
            >
                { pageChild.name ? pageChild.name + ' 组件' : '当前区块内容为空' }
            </span>
            <span className={styles.delete}>
                <Button
                    size="small"
                    danger 
                    onClick={removePageChild}
                >删除</Button>
            </span>
            <Modal 
                title="选择组件" 
                visible={isModalVisible} 
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                bodyStyle={{ maxHeight: 450, overflowY: 'auto' }}  
            >
                <Select style={{width: '100%'}} value={tempPageChild.name} onChange={handleSelectorChange}>
                    <Option value='Banner'>Banner 组件</Option>
                    <Option value='List'>List 组件</Option>
                    <Option value='Footer'>Footer 组件</Option>
                </Select>
                { getComponent() }
            </Modal>
        </li>
    );
}

export default AreaItem;
