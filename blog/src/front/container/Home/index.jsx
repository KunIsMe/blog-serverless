import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { parseJsonByString } from '../../../common/utils';
import Banner from './component/Banner';
import List from './component/List';
import Footer from './component/Footer';

const map = { Banner, List, Footer };
const render = (index, item) => {
    const Component = map[item.name];
    return Component ? <Component key={index} schema={item} /> : null;
};

export const Home = () => {
    const [pageSchema, setPageSchema] = useState({});
    const { attributes = {}, children = [] } = pageSchema;

    useEffect(() => {
        axios.get('/api/schema/getLastestOne').then((response) => {
            const data = response?.data?.data;
            data && setPageSchema(parseJsonByString(data.schema, {}));
        });
    }, []);

    return (
        <div>
            <Helmet>
                <title>{ attributes?.title || '' }</title>
            </Helmet>
            {
                children.map((item, index) => render(index, item))
            }
        </div>
    );
}
