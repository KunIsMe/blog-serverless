import { Input, Button } from 'antd';
import commonStyles from './style.module.scss';

const List = (props) => {
    const { children = [], changeChildren } = props;

    const addItemToChildren = () => {
        const newChildren = [ ...children ];
        newChildren.push({
            name: 'Item',
            attributes: {
                title: '',
                description: '',
                imageUrl: '',
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
                            <span className={commonStyles.label}>描述</span>
                            <Input
                                value={item.attributes?.description}
                                className={commonStyles.content}
                                placeholder='请输入描述'
                                onChange={(e) => {changeChildrenItem(index, 'description', e.target.value)}}
                            />
                        </div>
                        <div className={commonStyles['area-row']}>
                            <span className={commonStyles.label}>图片</span>
                            <Input
                                value={item.attributes?.imageUrl}
                                className={commonStyles.content}
                                placeholder='请输入图片 URL 地址'
                                onChange={(e) => {changeChildrenItem(index, 'imageUrl', e.target.value)}}
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

export default List;
