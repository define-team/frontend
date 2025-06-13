import { Flex, Typography} from "antd"
import Title from "antd/es/typography/Title"

const { Text } = Typography

const Forbidden = () => {
    return (
        <Flex style={{ flexFlow: 'column', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Title style={{ color: 'red', }}>Доступ запрещен</Title>
            <Text>Необходима авторизация</Text>
        </Flex>
    )
}

export default Forbidden