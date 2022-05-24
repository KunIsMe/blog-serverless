import { Button, Input } from 'antd';
import axios from 'axios';
import { useSchemaData } from '../../hook/useSchemaData';
import styles from './style.module.scss';
import { parseJsonByString } from '../../../common/utils';

export const BasicSetting = () => {
    const { schema, changeSchema, changePageAttribute } = useSchemaData();
    const { attributes } = schema;
    const { title = '' } = attributes;

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
    const handleTitleChange = (e) => {
        changePageAttribute('title', e.target.value);
    };

    return (
      <div>
          <div className={styles.row}>
              <div className={styles.title}>页面标题：</div>
              <div className={styles.content}>
                  <Input 
                    value={title} 
                    placeholder='请输入用户界面窗口标题'
                    onChange={handleTitleChange} 
                />
              </div>
          </div>
          <div className={styles.buttons}>
            <Button type="primary" onClick={handleSaveBtnClick}>保存基础配置</Button>
            <Button type="primary" onClick={handleResetBtnClick} className={styles.reset}>重置基础配置</Button>
          </div>
      </div>
    );
}
