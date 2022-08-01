import { Audio } from 'react-loader-spinner'

const Loaders = () => {
    return (
            <Audio
                style={{
                    marginTop: '4400px'
                }}
                height="80"
                width="80"
                radius="9"
                color='blck'
                ariaLabel='three-dots-loading'
            />
    )
}

export default Loaders;