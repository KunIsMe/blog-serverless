import { Button } from 'antd';
import axios from 'axios';
import AreaList from './component/AreaList';
import styles from './style.module.scss';
import { parseJsonByString } from '../../../common/utils';
import { useSchemaData } from '../../hook/useSchemaData';

export const HomeManagement = () => {
    const { schema, changeSchema } = useSchemaData();

    const handleSaveBtnClick = () => {
      axios.post('/api/schema/save', {
        schema: JSON.stringify(schema)
      }).then(() => {});
    };
    const handleResetBtnClick = () => {
      axios.get('/api/schema/getLastestOne').then((response) => {
          const data = response?.data?.data;
          data && changeSchema(parseJsonByString(data.schema, {}));
      });
    };

    return (
      <div>
          <AreaList />
          <div className={styles.buttons}>
            <Button type="primary" onClick={handleSaveBtnClick}>保存区块配置</Button>
            <Button type="primary" onClick={handleResetBtnClick} className={styles.reset}>重置区块配置</Button>
          </div>
      </div>
    );
}
