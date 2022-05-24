import styles from './style.module.scss';

const Banner = ({ schema }) => {
    const { attributes = {} } = schema;
    const { title, description, showSmallPic, smallPicUrl, backgroundUrl, backgroundHeight } = attributes;
    // https://serverless-static-1307152777.cos.ap-beijing.myqcloud.com/images/avatar.jpeg
    // https://serverless-static-1307152777.cos.ap-beijing.myqcloud.com/images/bg.jpeg
    const bannerStyleObj = backgroundUrl ? { backgroundImage: `url('${backgroundUrl}')` } : {};
    backgroundHeight && (bannerStyleObj.height = parseInt(backgroundHeight, 10));

    return (
        <div className='wrapper'>
            <div className={styles.banner}  style={bannerStyleObj}>
                <div className={styles.person}>
                    {
                        (showSmallPic && smallPicUrl) ? (
                            <img className={styles.avatar} src={smallPicUrl} alt="Zeke" />
                        ) : null
                    }
                    <div className={styles.content}>
                        <div className={styles.title}>{ title }</div>
                        <div className={styles.description}>{ description }</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
