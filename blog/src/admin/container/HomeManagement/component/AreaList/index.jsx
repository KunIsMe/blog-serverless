import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { getAddPageChildrenAction } from '../../../../store/action';
import AreaItem from '../AreaItem';
import styles from './style.module.scss';

const AreaList = () => {
    const dispatch = useDispatch();
    const children = useSelector((state) => state.common.schema?.children || []);

    const addPageChildren = () => {
        dispatch(getAddPageChildrenAction());
    }

    return (
        <div>
            <ul className={styles.list}>
                {
                    children.map((item, index) => (
                        <AreaItem key={index} index={index} />
                    ))
                }
            </ul>
            <Button type="primary" ghost onClick={addPageChildren}>新增页面区块</Button>
        </div>
    );
}

export default AreaList;
