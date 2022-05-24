import { Input, Button } from 'antd';
import commonStyles from './style.module.scss';

const Footer = (props) => {
    const { attributes = {}, changeAttributes, children = [], changeChildren } = props;
    const { copyright, record } = attributes;

    const addItemToChildren = () => {
        const newChildren = [ ...children ];
        newChildren.push({
            name: 'Item',
            attributes: {
                title: '',
                link: ''
            },
            children: []
        });
        changeChildren(newChildren);
    };
    const deleteItemFromChildren = (index) => {
        const newChildren = [ ...children ];
        newChildren.splice(index, 1);
        changeChildren(newChildren);
    };
    const changeChildrenItem = (index, key, value) => {
        const originItem = children[index];
        const item = { ...originItem };
        item.attributes[key] = value;
        const newChildren = [ ...children ];
        newChildren.splice(index, 1, item);
        changeChildren(newChildren);
    };

    return (
        <div className={commonStyles.wrapper}>
            <div className={commonStyles['attribute-row']}>
                <span className={commonStyles.label}>版权信息</span>
                <Input
                    value={copyright}
                    className={commonStyles.content}
                    placeholder='请输入版权信息'
                    onChange={(e) => {changeAttributes({ copyright: e.target.value })}}
                />
            </div>
            <div className={commonStyles['attribute-row']}>
                <span className={commonStyles.label}>备案信息</span>
                <Input
                    value={record}
                    className={commonStyles.content}
                    placeholder='请输入备案信息'
                    onChange={(e) => {changeAttributes({ record: e.target.value })}}
                />
            </div>
            <Button 
                type='primary' 
                className={commonStyles.button}
                onClick={addItemToChildren}
            >
                新增列表项
            </Button>
            {
                children.map((item, index) => (
                    <div className={commonStyles.area} key={index}>
                        <div className={commonStyles.delete} onClick={() => deleteItemFromChildren(index)}>X</div>
                        <div className={commonStyles['area-row']}>
                            <span className={commonStyles.label}>标题</span>
                            <Input
                                value={item.attributes?.title}
                                className={commonStyles.content}
                                placeholder='请输入标题'
                                onChange={(e) => {changeChildrenItem(index, 'title', e.target.value)}}
                            />
                        </div>
                        <div className={commonStyles['area-row']}>
                            <span className={commonStyles.label}>链接</span>
                            <Input
                                value={item.attributes?.link}
                                className={commonStyles.content}
                                placeholder='请输入跳转链接'
                                onChange={(e) => {changeChildrenItem(index, 'link', e.target.value)}}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Footer;
